export type Status =
  | "PENDING"
  | "RESERVED"
  | "VERIFIED"
  | "COMPLETED"
  | "REJECTED"
  | "TIMED_OUT"
  | "EXPIRED"
  | "CANCELLED_BY_CUSTOMER"
  | "CANCELLED_BY_STORE";
export type Shop = {
  id: string;
  name: string;
  area: string;
  address: string;
  distance: string;
  hours: string;
  open: boolean;
  capacity: number;
  updated: number;
};
export type Request = {
  id: string;
  storeId: string;
  amount: number;
  status: Status;
  created: number;
  deadline: number;
  approved?: number;
  verified?: number;
  ended?: number;
  code: string;
  token: string;
  reason?: string;
  arrived?: boolean;
  dispute?: { at: number; reason: string };
  events: { at: number; text: string }[];
};
export type State = {
  version: 1;
  started: boolean;
  stores: Shop[];
  requests: Request[];
};
export const labels: Record<Status, string> = {
  PENDING: "İşletmeden onay bekleniyor",
  RESERVED: "Talebin onaylandı",
  VERIFIED: "Kod doğrulandı, teslim bekleniyor",
  COMPLETED: "Demo tamamlandı",
  REJECTED: "Talep reddedildi",
  TIMED_OUT: "Yanıt süresi doldu",
  EXPIRED: "Rezervasyon süresi doldu",
  CANCELLED_BY_CUSTOMER: "Talebi iptal ettin",
  CANCELLED_BY_STORE: "İşletme rezervasyonu iptal etti",
};
export const money = (amount: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount / 100);
export const active = (r: Request) =>
  ["PENDING", "RESERVED", "VERIFIED"].includes(r.status);
export const reserved = (s: State, id: string) =>
  s.requests
    .filter(
      (r) => r.storeId === id && ["RESERVED", "VERIFIED"].includes(r.status),
    )
    .reduce((v, r) => v + r.amount, 0);
export const available = (s: State, id: string) =>
  s.stores.find((x) => x.id === id)!.capacity - reserved(s, id);
export function initial(now = Date.now()): State {
  return {
    version: 1,
    started: false,
    requests: [],
    stores: [
      {
        id: "a",
        name: "Demo Market A",
        area: "Kızılay",
        address: "Kızılay, Ankara · Kurgusal adres",
        distance: "350 m",
        hours: "09.00–22.00",
        open: true,
        capacity: 300000,
        updated: now,
      },
      {
        id: "b",
        name: "Demo Market B",
        area: "Bahçelievler",
        address: "Bahçelievler, Ankara · Kurgusal adres",
        distance: "1,2 km",
        hours: "08.00–21.00",
        open: true,
        capacity: 150000,
        updated: now,
      },
      {
        id: "c",
        name: "Demo Market C",
        area: "Kavaklıdere",
        address: "Kavaklıdere, Ankara · Kurgusal adres",
        distance: "1,8 km",
        hours: "10.00–20.00",
        open: false,
        capacity: 200000,
        updated: now,
      },
    ],
  };
}
function event(r: Request, status: Status, now: number, text: string) {
  r.status = status;
  r.events.push({ at: now, text });
  if (!active(r)) r.ended = now;
}
export function sweep(input: State, now = Date.now()): State {
  const s = structuredClone(input);
  for (const r of s.requests)
    if (active(r) && now >= r.deadline)
      event(
        r,
        r.status === "PENDING" ? "TIMED_OUT" : "EXPIRED",
        now,
        "Süre doldu; varsa ayrılan kapasite serbest bırakıldı.",
      );
  return s;
}
export type Action =
  | { type: "start" }
  | { type: "create"; storeId: string; amount: number }
  | {
      type:
        "accept" | "reject" | "cancel" | "storeCancel" | "expire" | "complete";
      id: string;
      reason?: string;
    }
  | { type: "verify"; storeId: string; code: string }
  | { type: "arrive"; id: string }
  | { type: "dispute"; id: string; reason: string }
  | { type: "configure"; storeId: string; capacity: number; open: boolean };
export function transition(
  input: State,
  action: Action,
  now = Date.now(),
): State {
  const s = sweep(input, now);
  const fail = (m: string): never => {
    throw new Error(m);
  };
  if (action.type === "start") {
    s.started = true;
    return s;
  }
  if (action.type === "configure") {
    const shop =
      s.stores.find((x) => x.id === action.storeId) ||
      fail("Mağaza bulunamadı.");
    if (
      !Number.isSafeInteger(action.capacity) ||
      action.capacity < 0 ||
      action.capacity > 100000000
    )
      fail("Kapasite 0–1.000.000 TL arasında olmalı.");
    if (action.capacity < reserved(s, shop.id))
      fail("Kapasite, ayrılan tutarın altına inemez.");
    Object.assign(shop, {
      capacity: action.capacity,
      open: action.open,
      updated: now,
    });
    return s;
  }
  if (action.type === "create") {
    if (!s.started) fail("Önce demoyu başlat.");
    if (s.requests.some(active))
      fail("Aynı anda yalnızca bir aktif talep oluşturabilirsin.");
    if (
      !Number.isSafeInteger(action.amount) ||
      action.amount < 10000 ||
      action.amount > 200000 ||
      action.amount % 10000
    )
      fail("100–2.000 TL arasında, 100 TL’nin katı bir tutar seç.");
    const shop =
      s.stores.find((x) => x.id === action.storeId) ||
      fail("Mağaza bulunamadı.");
    if (!shop.open) fail("Bu mağaza şu an talep kabul etmiyor.");
    const id = crypto.randomUUID();
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = crypto.getRandomValues(new Uint8Array(8));
    s.requests.unshift({
      id,
      storeId: shop.id,
      amount: action.amount,
      status: "PENDING",
      created: now,
      deadline: now + 120000,
      code: Array.from(bytes, (b) => chars[b % 32]).join(""),
      token: crypto.randomUUID(),
      events: [{ at: now, text: "Demo talebi oluşturuldu." }],
    });
    return s;
  }
  if (action.type === "verify") {
    const code = action.code.trim().toUpperCase().replace(/\s|-/g, "");
    const r =
      s.requests.find(
        (x) =>
          x.code === code ||
          x.token.toUpperCase() === action.code.trim().toUpperCase(),
      ) || fail("Kod geçersiz. Müşterinin güncel kodunu kontrol et.");
    if (r.storeId !== action.storeId) fail("Bu kod başka mağazaya ait.");
    if (r.status !== "RESERVED")
      fail("Kod kullanılmış, iptal edilmiş veya süresi dolmuş.");
    if (!r.arrived) fail("Müşteri mağazaya varıp kodunu göstermeli.");
    r.verified = now;
    event(
      r,
      "VERIFIED",
      now,
      "İşletme kodu doğruladı. Teslim henüz tamamlanmadı.",
    );
    return s;
  }
  if (action.type === "dispute") {
    const r =
      s.requests.find((x) => x.id === action.id) || fail("Talep bulunamadı.");
    if (r.status !== "COMPLETED")
      fail("Yalnızca teslim beyanından sonra sorun bildirilebilir.");
    if (r.dispute) fail("Bu işlem için sorun zaten bildirildi.");
    const reason = action.reason.trim();
    if (reason.length < 5 || reason.length > 300)
      fail("Sorunu 5–300 karakterle açıkla.");
    r.dispute = { at: now, reason };
    r.events.push({
      at: now,
      text: `Müşteri teslim beyanına itiraz etti: ${reason}`,
    });
    return s;
  }
  const r =
    s.requests.find((x) => x.id === action.id) || fail("Talep bulunamadı.");
  const shop = s.stores.find((x) => x.id === r.storeId)!;
  if (!active(r)) fail("Bu işlem kapanmış; yeniden değiştirilemez.");
  if (action.type === "arrive") {
    if (r.status !== "RESERVED" || r.arrived)
      fail("Mağazaya varış bu aşamada işaretlenemez.");
    r.arrived = true;
    r.events.push({
      at: now,
      text: "Müşteri mağazada olduğunu belirtti; kod gösterilebilir.",
    });
    return s;
  }
  if (action.type === "accept") {
    if (r.status !== "PENDING") fail("Yalnızca bekleyen talep onaylanabilir.");
    if (!shop.open) fail("Hizmet kapalı. Önce hizmeti aç.");
    if (available(s, shop.id) < r.amount)
      fail("Yeterli demo kapasitesi yok. Tutar ayrılamadı.");
    r.approved = now;
    r.deadline = now + 600000;
    event(
      r,
      "RESERVED",
      now,
      "Mağaza kabul etti. 10 dakikalık rezervasyon başladı.",
    );
  }
  if (action.type === "reject") {
    if (r.status !== "PENDING") fail("Yalnızca bekleyen talep reddedilebilir.");
    r.reason = action.reason?.trim() || fail("Ret gerekçesi seç.");
    event(r, "REJECTED", now, r.reason);
  }
  if (action.type === "cancel")
    event(r, "CANCELLED_BY_CUSTOMER", now, "Müşteri talebi iptal etti.");
  if (action.type === "storeCancel") {
    if (r.status === "PENDING")
      fail("Bekleyen talep için ret seçeneğini kullan.");
    r.reason = action.reason?.trim() || fail("İptal gerekçesi gerekli.");
    event(r, "CANCELLED_BY_STORE", now, r.reason);
  }
  if (action.type === "expire") {
    r.deadline = now;
    event(
      r,
      r.status === "PENDING" ? "TIMED_OUT" : "EXPIRED",
      now,
      "Sunum kontrolü: süre dolduruldu.",
    );
  }
  if (action.type === "complete") {
    if (r.status !== "VERIFIED") fail("Teslimden önce müşteri kodunu doğrula.");
    if (shop.capacity < r.amount) fail("Kapasite yetersiz.");
    shop.capacity -= r.amount;
    shop.updated = now;
    event(
      r,
      "COMPLETED",
      now,
      "Demo teslimi tamamlandı. Kapasite bir kez azaltıldı.",
    );
  }
  return s;
}
