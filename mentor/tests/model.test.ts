import { test } from "node:test";
import assert from "node:assert/strict";
import {
  initial,
  transition,
  sweep,
  reserved,
  available,
  type State,
} from "../model";
const start = 1_800_000_000_000;
function request(amount = 100000, storeId = "a") {
  return transition(
    transition(initial(start), { type: "start" }, start),
    { type: "create", storeId, amount },
    start,
  );
}
function accept(s: State, t = start + 1000) {
  return transition(s, { type: "accept", id: s.requests[0].id }, t);
}
function verify(s: State) {
  return transition(
    s,
    {
      type: "verify",
      storeId: s.requests[0].storeId,
      code: s.requests[0].code,
    },
    start + 2000,
  );
}
test("successful flow: approval starts 10 minutes, verification separate, debit once", () => {
  let s = request();
  assert.equal(reserved(s, "a"), 0);
  s = accept(s);
  assert.equal(s.requests[0].deadline, start + 601000);
  assert.equal(available(s, "a"), 200000);
  assert.equal(s.stores[0].capacity, 300000);
  assert.throws(
    () =>
      transition(s, { type: "complete", id: s.requests[0].id }, start + 1500),
    /doğrula/,
  );
  s = verify(s);
  assert.equal(s.requests[0].status, "VERIFIED");
  assert.equal(s.stores[0].capacity, 300000);
  s = transition(s, { type: "complete", id: s.requests[0].id }, start + 3000);
  assert.equal(s.requests[0].status, "COMPLETED");
  assert.equal(s.stores[0].capacity, 200000);
  assert.equal(reserved(s, "a"), 0);
  assert.equal(available(s, "a"), 200000);
  assert.throws(
    () =>
      transition(s, { type: "complete", id: s.requests[0].id }, start + 3001),
    /kapanmış/,
  );
  assert.throws(() => verify(s), /kullanılmış/);
});
test("rejection requires a reason and never reserves", () => {
  let s = request();
  assert.throws(
    () => transition(s, { type: "reject", id: s.requests[0].id }, start + 1),
    /gerekçesi/,
  );
  s = transition(
    s,
    { type: "reject", id: s.requests[0].id, reason: "Yeterli nakit yok" },
    start + 1,
  );
  assert.equal(s.requests[0].status, "REJECTED");
  assert.equal(available(s, "a"), 300000);
  assert.equal(s.requests[0].reason, "Yeterli nakit yok");
});
test("pending times out at exactly 2 minutes and cannot be accepted", () => {
  const s = request();
  assert.equal(sweep(s, start + 119999).requests[0].status, "PENDING");
  assert.equal(sweep(s, start + 120000).requests[0].status, "TIMED_OUT");
  assert.throws(() => accept(s, start + 120000), /kapanmış/);
});
test("cancel before or after approval/verification releases capacity", () => {
  for (const s of [request(), accept(request()), verify(accept(request()))]) {
    const next = transition(
      s,
      { type: "cancel", id: s.requests[0].id },
      start + 3000,
    );
    assert.equal(next.requests[0].status, "CANCELLED_BY_CUSTOMER");
    assert.equal(next.stores[0].capacity, 300000);
    assert.equal(available(next, "a"), 300000);
    assert.throws(() => verify(next), /kullanılmış/);
  }
});
test("expiry works on reserved and verified requests and prevents completion", () => {
  for (const s of [accept(request()), verify(accept(request()))]) {
    const next = sweep(s, start + 601000);
    assert.equal(next.requests[0].status, "EXPIRED");
    assert.equal(available(next, "a"), 300000);
    assert.throws(
      () =>
        transition(
          s,
          { type: "complete", id: s.requests[0].id },
          start + 601000,
        ),
      /kapanmış/,
    );
  }
});
test("store cancellation recorded separately", () => {
  const s = accept(request());
  const next = transition(
    s,
    {
      type: "storeCancel",
      id: s.requests[0].id,
      reason: "Şu anda hizmet veremiyoruz",
    },
    start + 3000,
  );
  assert.equal(next.requests[0].status, "CANCELLED_BY_STORE");
  assert.equal(available(next, "a"), 300000);
});
test("invalid and other-store codes fail; code cannot verify twice", () => {
  const s = accept(request());
  assert.throws(
    () =>
      transition(
        s,
        { type: "verify", storeId: "a", code: "NOTVALID" },
        start + 2000,
      ),
    /geçersiz/,
  );
  assert.throws(
    () =>
      transition(
        s,
        { type: "verify", storeId: "b", code: s.requests[0].code },
        start + 2000,
      ),
    /başka/,
  );
  const v = verify(s);
  assert.throws(() => verify(v), /kullanılmış/);
  assert.equal(
    transition(
      s,
      { type: "verify", storeId: "a", code: s.requests[0].token },
      start + 2000,
    ).requests[0].status,
    "VERIFIED",
  );
});
test("insufficient capacity blocks acceptance with no side effect", () => {
  let s = request(200000);
  s = transition(
    s,
    { type: "configure", storeId: "a", capacity: 100000, open: true },
    start,
  );
  assert.throws(() => accept(s), /Yeterli/);
  assert.equal(s.requests[0].status, "PENDING");
  assert.equal(reserved(s, "a"), 0);
});
test("capacity cannot become negative or lower than reservations; closing preserves reservation", () => {
  let s = accept(request());
  for (const c of [-1, 99999, NaN, 1.5])
    assert.throws(() =>
      transition(
        s,
        { type: "configure", storeId: "a", capacity: c, open: true },
        start + 2000,
      ),
    );
  s = transition(
    s,
    { type: "configure", storeId: "a", capacity: 300000, open: false },
    start + 2000,
  );
  assert.equal(s.requests[0].status, "RESERVED");
  assert.equal(reserved(s, "a"), 100000);
  assert.equal(verify(s).requests[0].status, "VERIFIED");
});
test("single active request, amount validation and closed shop", () => {
  assert.throws(
    () =>
      transition(
        request(),
        { type: "create", storeId: "b", amount: 100000 },
        start,
      ),
    /tek|bir aktif/,
  );
  for (const amount of [0, 10001, 25000, 200001, Infinity])
    assert.throws(() =>
      transition(
        { ...initial(start), started: true },
        { type: "create", storeId: "a", amount },
        start,
      ),
    );
  assert.throws(() => request(100000, "c"), /kabul etmiyor/);
});
test("JSON restore retains deadline, code, verification and capacity", () => {
  const s = verify(accept(request()));
  assert.deepEqual(JSON.parse(JSON.stringify(s)), s);
  assert.equal(
    sweep(JSON.parse(JSON.stringify(s)), start + 601000).requests[0].status,
    "EXPIRED",
  );
});
test("scenario expiry follows same transition rules and reset restores all", () => {
  let s = accept(request());
  s = transition(s, { type: "expire", id: s.requests[0].id }, start + 5000);
  assert.equal(s.requests[0].status, "EXPIRED");
  assert.equal(available(s, "a"), 300000);
  assert.equal(initial(start).requests.length, 0);
});
test("two acceptance attempts cannot reserve same request twice", () => {
  const s = accept(request());
  assert.throws(
    () => transition(s, { type: "accept", id: s.requests[0].id }, start + 2000),
    /bekleyen/,
  );
  assert.equal(reserved(s, "a"), 100000);
});
