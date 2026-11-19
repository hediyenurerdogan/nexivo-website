import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  ReceiptText,
  UserRound,
  ArrowLeft,
  ArrowUpRight,
  Store,
  MapPin,
  List,
  Map,
  Check,
  Clock3,
  X,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  WifiOff,
  Download,
  ShieldCheck,
} from "lucide-react";
import QRCode from "qrcode";
import {
  initial,
  sweep,
  transition,
  active,
  reserved,
  available,
  labels,
  money,
  type State,
  type Request,
  type Action,
} from "./model";
import "./style.css";
const KEY = "nexivo-mentor-demo-v1";
const time = (n?: number) =>
  n
    ? new Date(n).toLocaleString("tr-TR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
function read(): State {
  const raw = localStorage.getItem(KEY);
  if (!raw) return initial();
  const s = JSON.parse(raw);
  if (
    s.version !== 1 ||
    !Array.isArray(s.stores) ||
    s.stores.length !== 3 ||
    !Array.isArray(s.requests) ||
    s.stores.some(
      (x: any) => !Number.isSafeInteger(x.capacity) || x.capacity < 0,
    )
  )
    throw new Error(
      "Kayıt okunamadı. Profil ekranından yalnızca bu demoyu sıfırlayabilirsin.",
    );
  return sweep(s);
}
function App() {
  const [startup] = useState(() => {
    try {
      return { data: read(), error: "" };
    } catch (e) {
      return { data: initial(), error: (e as Error).message };
    }
  });
  const [data, setData] = useState<State>(startup.data);
  const [error, setError] = useState(startup.error);
  const [notice, setNotice] = useState("");
  const [role, setRole] = useState<"customer" | "store">("customer");
  const [page, setPage] = useState("home");
  const [selection, setSelection] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [amount, setAmount] = useState("500");
  const [map, setMap] = useState(false);
  const [shopId, setShopId] = useState("a");
  const [capacity, setCapacity] = useState("3000");
  const [code, setCode] = useState("");
  const [reason, setReason] = useState("Yeterli nakit yok");
  const [controls, setControls] = useState(false);
  const [reset, setReset] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [qr, setQr] = useState("");
  const [online, setOnline] = useState(navigator.onLine);
  const [install, setInstall] = useState<any>(null);
  const [cached, setCached] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [routeFor, setRouteFor] = useState(false);
  const [financeReturn, setFinanceReturn] = useState("home");
  const lastScreen = useRef({ page, selection });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, selection, role, data.started]);
  const current = data.requests.find(active);
  const shown = data.requests.find((r) => r.id === selectedRequest) || current;
  const shop = data.stores.find((s) => s.id === shopId)!;
  const valid =
    Number.isInteger(Number(amount)) &&
    Number(amount) >= 100 &&
    Number(amount) <= 2000 &&
    Number(amount) % 100 === 0;
  useEffect(() => {
    if (valid)
      setError((previous) =>
        previous === "Önce geçerli bir tutar seç." ? "" : previous,
      );
  }, [valid]);
  useEffect(() => {
    if (
      lastScreen.current.page !== page ||
      lastScreen.current.selection !== selection
    ) {
      setError("");
      lastScreen.current = { page, selection };
    }
  }, [page, selection]);
  function save(next: State) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      setData(next);
      return true;
    } catch {
      setError(
        "Tarayıcı kaydı yapılamadı. İşlem uygulanmadı; özel gezinmeyi kapatıp tekrar dene.",
      );
      return false;
    }
  }
  function act(a: Action) {
    setNow(Date.now());
    setError("");
    setNotice("");
    try {
      const latest = read();
      const next = transition(latest, a);
      if (save(next)) {
        if (a.type === "create") {
          setSelectedRequest(next.requests[0].id);
          setSelection(null);
          setPage("requests");
        }
        if (a.type === "verify") setCode("");
        return true;
      }
    } catch (e) {
      setError((e as Error).message);
      try {
        save(sweep(read()));
      } catch {}
    }
    return false;
  }
  function switchRole(next: "customer" | "store") {
    setRole(next);
    if (page === "finance") setPage("home");
    setError("");
    setNotice("");
    setSelection(null);
    if (next === "store" && current) setShopId(current.storeId);
    window.scrollTo(0, 0);
  }
  function openFinance() {
    setFinanceReturn(page);
    setControls(false);
    setPage("finance");
  }
  useEffect(() => {
    const tick = () => {
      setNow(Date.now());
      setData((prev) => {
        const next = sweep(prev);
        if (JSON.stringify(next) !== JSON.stringify(prev)) {
          try {
            localStorage.setItem(KEY, JSON.stringify(next));
          } catch {
            setError("Süre güncellendi fakat tarayıcı kaydı yapılamadı.");
          }
          return next;
        }
        return prev;
      });
    };
    const id = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    const storage = (e: StorageEvent) => {
      if (e.key === KEY) {
        try {
          setData(read());
        } catch {
          setError("Diğer sekmedeki kayıt okunamadı.");
        }
      }
    };
    window.addEventListener("storage", storage);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("storage", storage);
    };
  }, []);
  useEffect(() => {
    setCapacity(String(shop.capacity / 100));
    setCode("");
  }, [shopId, shop.capacity]);
  useEffect(() => {
    let valid = true;
    setQr("");
    if (shown && ["RESERVED", "VERIFIED"].includes(shown.status))
      QRCode.toDataURL(shown.token, {
        width: 220,
        margin: 2,
        errorCorrectionLevel: "M",
      })
        .then((url) => {
          if (valid) setQr(url);
        })
        .catch(() =>
          setError("QR çizilemedi. Kısa işlem kodunu kullanabilirsin."),
        );
    return () => {
      valid = false;
    };
  }, [shown?.id, shown?.status]);
  useEffect(() => {
    const net = () => setOnline(navigator.onLine);
    const prompt = (e: Event) => {
      e.preventDefault();
      setInstall(e);
    };
    window.addEventListener("online", net);
    window.addEventListener("offline", net);
    window.addEventListener("beforeinstallprompt", prompt);
    if ("serviceWorker" in navigator)
      navigator.serviceWorker
        .register("/mobil-demo/sw.js", { scope: "/mobil-demo/" })
        .then(() => navigator.serviceWorker.ready)
        .then(() => setCached(true))
        .catch(() => setCached(false));
    return () => {
      window.removeEventListener("online", net);
      window.removeEventListener("offline", net);
      window.removeEventListener("beforeinstallprompt", prompt);
    };
  }, []);
  const remaining = (r: Request) => {
    const sec = Math.max(0, Math.ceil((r.deadline - now) / 1000));
    return `${Math.floor(sec / 60)
      .toString()
      .padStart(2, "0")}:${(sec % 60).toString().padStart(2, "0")}`;
  };
  const requestView = (r: Request) => {
    const s = data.stores.find((s) => s.id === r.storeId)!;
    return (
      <div className="request-view">
        {r.status !== "RESERVED" && (
          <div
            className={`status-icon ${r.status === "COMPLETED" ? "done" : ""}`}
          >
            {r.status === "COMPLETED" || r.status === "VERIFIED" ? (
              <Check />
            ) : active(r) ? (
              <Clock3 />
            ) : (
              <X />
            )}
          </div>
        )}
        <p className="eyebrow">
          {r.status === "PENDING"
            ? "SIRA İŞLETMEDE"
            : r.status === "COMPLETED"
              ? "DENEME BİTTİ"
              : "DEMO TALEBİN"}
        </p>
        <h1>
          {r.status === "RESERVED"
            ? `${money(r.amount)} senin için ayrıldı.`
            : labels[r.status]}
        </h1>
        {r.dispute && (
          <div className="dispute-status" role="status">
            İtiraz açık
          </div>
        )}
        <p className="muted">
          {r.status === "PENDING"
            ? "Mağaza onaylamadan yola çıkma."
            : r.status === "RESERVED"
              ? "Gitmeden önce ayrıldığını biliyorsun. Kodu yalnızca mağazada, görevli hazır olduğunda göster."
              : r.status === "VERIFIED"
                ? "Kod kontrol edildi. İşletme ekranındaki ayrı teslim onayı bekleniyor."
                : r.status === "COMPLETED"
                  ? "İşletme teslimi tamamladığını bildirdi. Nakdi almadıysan aşağıdan sorun bildir."
                  : r.reason || "İşlemin durumu aşağıdaki özette kayıtlı."}
        </p>
        {r.status === "RESERVED" && (
          <div className="arrival-card">
            <p className="eyebrow">ÖNCE MAĞAZAYA ULAŞ</p>
            <strong>
              {s.name} · {s.area}
            </strong>
            <p>{s.address}</p>
            <div className="timer">
              <Clock3 size={18} />
              <span>Rezervasyon için kalan</span>
              <strong>{remaining(r)}</strong>
            </div>
            <button
              className="secondary wide"
              onClick={() => setRouteFor(!routeFor)}
            >
              <MapPin size={18} />{" "}
              {routeFor ? "Örnek rotayı gizle" : "Örnek rotayı göster"}
            </button>
            {routeFor && (
              <div className="route-note">
                <div className="route-steps">
                  <span>Ankara merkez</span>
                  <i />
                  <span>{s.area}</span>
                  <i />
                  <strong>{s.name}</strong>
                </div>
                <p>
                  Şematik rota. Adres ve mesafe temsili olduğu için gerçek
                  navigasyon başlatılmaz.
                </p>
              </div>
            )}
            {!r.arrived && (
              <button
                className="primary wide"
                onClick={() => act({ type: "arrive", id: r.id })}
              >
                Mağazadayım, kodu göster <ArrowUpRight size={18} />
              </button>
            )}
            {r.arrived && qr && (
              <div className="code-block">
                <p className="small muted">
                  Kodu yalnızca görevli hazır olduğunda göster.
                </p>
                <img src={qr} alt="Rastgele işlem tanımlayıcısını içeren QR" />
                <label>Kısa işlem kodu</label>
                <strong className="delivery-code">
                  {r.code.slice(0, 4)} {r.code.slice(4)}
                </strong>
                <button
                  className="text-button"
                  onClick={() =>
                    navigator.clipboard
                      ?.writeText(r.code)
                      .then(() => setNotice("Kod kopyalandı."))
                      .catch(() =>
                        setError("Kopyalanamadı; kodu elle girebilirsin."),
                      )
                  }
                >
                  Kodu kopyala
                </button>
              </div>
            )}
            <p className="small muted">
              İşlem: NX-{r.id.slice(0, 8).toUpperCase()} · Onay:{" "}
              {time(r.approved)}
            </p>
          </div>
        )}
        {r.status !== "RESERVED" && (
          <div className="receipt">
            <div className="line">
              <strong>{s.name}</strong>
              <span className="pill">Demo noktası</span>
            </div>
            <p className="muted small">{s.address}</p>
            <div className="big-amount">{money(r.amount)}</div>
            {active(r) && (
              <div className="timer">
                <Clock3 size={18} />
                <span>
                  {r.status === "PENDING" ? "Yanıt için" : "Rezervasyon için"}{" "}
                  kalan
                </span>
                <strong>{remaining(r)}</strong>
              </div>
            )}
            {qr &&
              (r.arrived || r.status === "VERIFIED") &&
              ["RESERVED", "VERIFIED"].includes(r.status) && (
                <div className="code-block">
                  <img
                    src={qr}
                    alt="Rastgele demo işlem tanımlayıcısını içeren QR"
                  />
                  <label>Kısa işlem kodu</label>
                  <strong className="delivery-code">
                    {r.code.slice(0, 4)} {r.code.slice(4)}
                  </strong>
                  <button
                    className="text-button"
                    onClick={() =>
                      navigator.clipboard
                        ?.writeText(r.code)
                        .then(() => setNotice("Kod kopyalandı."))
                        .catch(() =>
                          setError("Kopyalanamadı; kodu elle girebilirsin."),
                        )
                    }
                  >
                    Kodu kopyala
                  </button>
                </div>
              )}
            <dl>
              <div>
                <dt>Hizmet bedeli</dt>
                <dd>Henüz belirlenmedi</dd>
              </div>
              <div>
                <dt>Talep tutarı</dt>
                <dd>{money(r.amount)}</dd>
              </div>
              <div>
                <dt>İşlem numarası</dt>
                <dd>NX-{r.id.slice(0, 8).toUpperCase()}</dd>
              </div>
              <div>
                <dt>Oluşturulma</dt>
                <dd>{time(r.created)}</dd>
              </div>
              {r.approved && (
                <div>
                  <dt>Onay</dt>
                  <dd>{time(r.approved)}</dd>
                </div>
              )}
              {r.verified && (
                <div>
                  <dt>Kod doğrulama</dt>
                  <dd>{time(r.verified)}</dd>
                </div>
              )}
              {r.ended && (
                <div>
                  <dt>Kapanış</dt>
                  <dd>{time(r.ended)}</dd>
                </div>
              )}
            </dl>
            <p className="small muted">
              İşlem özeti; banka dekontu veya fatura değildir.
            </p>
          </div>
        )}
        {r.status === "COMPLETED" && (
          <div className="dispute-card">
            <strong>{r.dispute ? "İtiraz açık" : "Nakdi alamadın mı?"}</strong>
            <p>
              {r.dispute
                ? `İtirazın ${time(r.dispute.at)} tarihinde kaydedildi. Gerekçe: ${r.dispute.reason}`
                : "İşletmenin teslim beyanına itirazını ayrı kaydederiz. Bu kayıt işlemi kendiliğinden geri çevirmez."}
            </p>
            {r.dispute && (
              <p className="small muted">
                Sonraki adım: Mentör sunumunda bu kaydı işletmenin teslim
                beyanıyla birlikte inceleyin. Bu prototipte otomatik çözüm veya
                destek takibi yoktur.
              </p>
            )}
            {!r.dispute && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (act({ type: "dispute", id: r.id, reason: disputeReason }))
                    setDisputeReason("");
                }}
              >
                <label className="field">
                  Sorunu kısaca anlat
                  <textarea
                    aria-label="Sorun açıklaması"
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    minLength={5}
                    maxLength={300}
                    required
                    placeholder="Örn. Görevli nakit teslim etmedi"
                  />
                </label>
                <button className="secondary wide danger" type="submit">
                  Nakdi alamadım / sorun bildir
                </button>
              </form>
            )}
          </div>
        )}
        {active(r) ? (
          <>
            <button
              className="primary wide"
              onClick={() => switchRole("store")}
            >
              İşletme demosuna geç <ArrowUpRight size={18} />
            </button>
            <button
              className="secondary wide"
              onClick={() => act({ type: "cancel", id: r.id })}
            >
              Talebimi iptal et
            </button>
          </>
        ) : (
          <button
            className="primary wide"
            onClick={() => {
              setSelectedRequest(null);
              setPage("home");
            }}
          >
            Yeni talep oluştur <ArrowUpRight size={18} />
          </button>
        )}
        <details className="event-log">
          <summary>İşlem adımları</summary>
          {r.events.map((e, i) => (
            <p key={i}>
              <span>{time(e.at)}</span>
              {e.text}
            </p>
          ))}
        </details>
      </div>
    );
  };
  return (
    <div className="app">
      <div className="demo-banner">Demo — gerçek para işlemi yapılmaz</div>
      <header>
        <img src="/mobil-demo/logo.png" alt="nexivo" />
        <span className="header-location">
          <MapPin size={14} /> Ankara
        </span>
        <button
          className="icon-button"
          aria-label="Sunum kontrolleri"
          onClick={() => setControls(!controls)}
        >
          <SlidersHorizontal size={21} />
        </button>
      </header>
      {!online && (
        <div className="offline">
          <WifiOff size={16} />
          Çevrimdışı sunum · İşlemler yalnızca bu cihazda.
        </div>
      )}
      {controls && (
        <section className="presenter">
          <div className="line">
            <strong>Mentör sunum kontrolleri</strong>
            <button
              className="icon-button"
              aria-label="Kontrolleri kapat"
              onClick={() => setControls(false)}
            >
              <X size={18} />
            </button>
          </div>
          <p>Bu düğmeler işletme yanıtını ve süreyi bu cihazda canlandırır.</p>
          <div className="role-switch" aria-label="Demo görünümü">
            <button
              aria-pressed={role === "customer"}
              onClick={() => {
                switchRole("customer");
                setControls(false);
              }}
            >
              <UserRound size={17} /> Müşteri
            </button>
            <button
              aria-pressed={role === "store"}
              onClick={() => {
                switchRole("store");
                setControls(false);
              }}
            >
              <Store size={17} /> İşletme demosu
            </button>
          </div>
          <div className="scenario-buttons">
            <button onClick={openFinance}>Finansal model taslağı</button>
            <button
              disabled={current?.status !== "PENDING"}
              onClick={() => current && act({ type: "accept", id: current.id })}
            >
              İşletme onaylasın
            </button>
            <button
              disabled={current?.status !== "PENDING"}
              onClick={() =>
                current &&
                act({
                  type: "reject",
                  id: current.id,
                  reason: "Şu anda hizmet veremiyoruz",
                })
              }
            >
              İşletme reddetsin
            </button>
            <button
              disabled={!current}
              onClick={() => current && act({ type: "expire", id: current.id })}
            >
              Süreyi doldur
            </button>
            <button onClick={() => setReset(true)}>
              <RotateCcw size={14} />
              Demoyu sıfırla
            </button>
          </div>
        </section>
      )}
      {error && (
        <div role="alert" className="alert">
          {error}
          <button aria-label="Uyarıyı kapat" onClick={() => setError("")}>
            <X size={16} />
          </button>
        </div>
      )}
      {notice && (
        <div role="status" className="notice">
          {notice}
        </div>
      )}
      <main>
        {!data.started && page !== "profile" && page !== "finance" ? (
          <section className="welcome">
            <p className="eyebrow">MAĞAZADAN NAKİT</p>
            <h1>
              Yakınındaki mağazadan <em>nakit al.</em>
            </h1>
            <p>
              Tutarını seç, mağazanın onayını bekle, ayrılan nakdi kodunla
              teslim al.
            </p>
            <div className="welcome-art">
              <Store size={54} strokeWidth={1.3} />
              <div>
                <span>Demo Market A</span>
                <strong>500 TL</strong>
                <small>
                  <Check size={13} /> Örnek rezervasyon
                </small>
              </div>
              <span className="art-arrow">↗</span>
            </div>
            <div className="info">
              <ShieldCheck size={20} />
              <p>Banka, kart veya kimlik bilgisi gerekmez.</p>
            </div>
            <button
              className="primary wide"
              onClick={() => act({ type: "start" })}
            >
              Demoyu başlat <ArrowUpRight size={20} />
            </button>
            <p className="small muted">Tek cihazda iki rol arasında geçiş</p>
          </section>
        ) : page === "finance" ? (
          <section className="finance-view">
            <button
              className="text-button"
              onClick={() => setPage(financeReturn)}
            >
              <ArrowLeft size={17} /> Geri dön
            </button>
            <p className="eyebrow">MENTÖR GÖRÜŞMESİ İÇİN</p>
            <h1>Finansal model taslağı</h1>
            <p className="muted">
              Bu ekran gelecekte değerlendirilecek bir olasılığı anlatır. Ödeme
              kaynağı, finansal ortak, mağaza aktarımı ve kazanç modeli henüz
              kararlaştırılmadı.
            </p>
            <ol className="instructions">
              <li>Müşteri 500 TL talep eder; mağaza rezervasyon ayırır.</li>
              <li>
                Gelecekteki finansal modelde ödeme kaynağı ve yetkili ortak
                belirlenir.
              </li>
              <li>
                Mağaza teslim beyanında bulunur; müşteri sorun bildirebilir.
              </li>
              <li>
                Mağazaya aktarım ancak kurulacak gerçek modelin koşullarına göre
                tasarlanabilir.
              </li>
            </ol>
            <div className="finance-card">
              <strong>500 TL'lik varsayımsal işlem</strong>
              <dl>
                <div>
                  <dt>Verilen nakit</dt>
                  <dd>500 TL</dd>
                </div>
                <div>
                  <dt>Hesaba aktarılacak tutar</dt>
                  <dd>500 TL varsayımı</dd>
                </div>
                <div>
                  <dt>İşlem kazancı</dt>
                  <dd>Henüz belirlenmedi</dd>
                </div>
                <div>
                  <dt>Aktarım durumu</dt>
                  <dd>Aktarım yapılmadı</dd>
                </div>
              </dl>
            </div>
            <p className="small muted">
              Bu tutarlar finansal taahhüt değildir. Bu uygulama ödeme, transfer
              veya gerçek nakit teslimi yapmaz.
            </p>
          </section>
        ) : role === "store" ? (
          <section>
            <p className="eyebrow">İŞLETME</p>
            <h1>Kontrol sende.</h1>
            <p className="muted">Talepleri ve ayrılan tutarı buradan yönet.</p>
            <label className="field">
              Mağazan
              <select
                value={shopId}
                onChange={(e) => setShopId(e.target.value)}
              >
                {data.stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} · {s.area}
                  </option>
                ))}
              </select>
            </label>
            <div className="store-console">
              <div className="line">
                <strong>Nakit talep hizmeti</strong>
                <button
                  className={`toggle ${shop.open ? "on" : ""}`}
                  aria-pressed={shop.open}
                  onClick={() =>
                    act({
                      type: "configure",
                      storeId: shop.id,
                      capacity: shop.capacity,
                      open: !shop.open,
                    })
                  }
                >
                  {shop.open ? "Açık" : "Kapalı"}
                  <span />
                </button>
              </div>
              <p className="small muted">
                Kapatmak yeni talepleri durdurur; rezervasyonları iptal etmez.
              </p>
              <div className="capacity-grid">
                <div>
                  <span>Demo kapasitesi</span>
                  <strong>{money(shop.capacity)}</strong>
                </div>
                <div>
                  <span>Ayrılan</span>
                  <strong>{money(reserved(data, shop.id))}</strong>
                </div>
                <div>
                  <span>Kullanılabilir</span>
                  <strong>{money(available(data, shop.id))}</strong>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    act({
                      type: "configure",
                      storeId: shop.id,
                      capacity: Number(capacity) * 100,
                      open: shop.open,
                    })
                  )
                    setNotice("Demo kapasitesi güncellendi.");
                }}
              >
                <label className="field">
                  Demo kapasitesi (TL)
                  <div className="inline-field">
                    <input
                      inputMode="numeric"
                      type="number"
                      min="0"
                      max="1000000"
                      step="100"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                    <button className="secondary" type="submit">
                      Kaydet
                    </button>
                  </div>
                </label>
              </form>
              <p className="small muted">
                Bu, taleplere ayırdığın kurgusal tutardır; kasa veya banka
                bakiyesi değildir.
              </p>
            </div>
            <h2>
              Bekleyen talepler{" "}
              <span className="count">
                {
                  data.requests.filter(
                    (r) => r.storeId === shop.id && r.status === "PENDING",
                  ).length
                }
              </span>
            </h2>
            {!data.requests.some(
              (r) => r.storeId === shop.id && r.status === "PENDING",
            ) && (
              <div className="empty">
                <ReceiptText />
                <strong>Bekleyen talep yok</strong>
                <p>Müşteri görünümünden bu mağazaya talep gönder.</p>
                <button
                  className="text-button"
                  onClick={() => switchRole("customer")}
                >
                  Müşteriye geç →
                </button>
              </div>
            )}
            {data.requests
              .filter((r) => r.storeId === shop.id && r.status === "PENDING")
              .map((r) => (
                <article className="store-request" key={r.id}>
                  <div className="line">
                    <span className="pill">{labels[r.status]}</span>
                    <strong>{remaining(r)}</strong>
                  </div>
                  <h2>{money(r.amount)}</h2>
                  <p className="small muted">
                    NX-{r.id.slice(0, 8).toUpperCase()} · {time(r.created)}
                  </p>
                  <p className="info-text">
                    Kabul ederek bu demo tutarını 10 dakika ayırabileceğini
                    onaylarsın.
                  </p>
                  <button
                    className="primary wide"
                    onClick={() => act({ type: "accept", id: r.id })}
                  >
                    10 dakika ayır ve kabul et
                  </button>
                  <label className="field">
                    Ret gerekçesi
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    >
                      <option>Yeterli nakit yok</option>
                      <option>Şu anda hizmet veremiyoruz</option>
                    </select>
                  </label>
                  <button
                    className="secondary wide"
                    onClick={() => act({ type: "reject", id: r.id, reason })}
                  >
                    Talebi reddet
                  </button>
                </article>
              ))}
            <h2>
              Aktif rezervasyonlar{" "}
              <span className="count">
                {
                  data.requests.filter(
                    (r) =>
                      r.storeId === shop.id &&
                      ["RESERVED", "VERIFIED"].includes(r.status),
                  ).length
                }
              </span>
            </h2>
            {!data.requests.some(
              (r) =>
                r.storeId === shop.id &&
                ["RESERVED", "VERIFIED"].includes(r.status),
            ) && <p className="muted small">Şu anda ayrılmış tutar yok.</p>}
            {data.requests
              .filter(
                (r) =>
                  r.storeId === shop.id &&
                  ["RESERVED", "VERIFIED"].includes(r.status),
              )
              .map((r) => (
                <article className="store-request" key={r.id}>
                  <div className="line">
                    <span className="pill">
                      {r.status === "VERIFIED"
                        ? "Kod doğrulandı"
                        : "Aktif rezervasyon"}
                    </span>
                    <strong>{remaining(r)}</strong>
                  </div>
                  <h2>{money(r.amount)} ayırdınız</h2>
                  <p className="small muted">
                    NX-{r.id.slice(0, 8).toUpperCase()} · Bitiş:{" "}
                    {time(r.deadline)}
                  </p>
                  {r.status === "VERIFIED" ? (
                    <button
                      className="primary wide"
                      onClick={() => act({ type: "complete", id: r.id })}
                    >
                      Teslimi tamamla <Check size={18} />
                    </button>
                  ) : (
                    <p>Kod doğrulamak için aşağıdaki alanı kullan.</p>
                  )}
                  <button
                    className="text-button danger"
                    onClick={() =>
                      act({
                        type: "storeCancel",
                        id: r.id,
                        reason: "Şu anda hizmet veremiyoruz",
                      })
                    }
                  >
                    Rezervasyonu karşılayamıyorum
                  </button>
                </article>
              ))}
            <section className="verify">
              <h2>Kod doğrula</h2>
              <p className="small muted">
                Kamera gerekmez. Müşterinin kısa kodunu elle gir veya kopyala.
                İstersen QR içindeki rastgele tanımlayıcıyı da
                yapıştırabilirsin.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (act({ type: "verify", storeId: shop.id, code }))
                    setNotice(
                      "Kod doğrulandı. Teslim ayrı bir adımla tamamlanır.",
                    );
                }}
              >
                <label className="field">
                  Müşterinin işlem kodu
                  <input
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Örn. ABCD 2345"
                    required
                  />
                </label>
                <button className="secondary wide" type="submit">
                  Kodu doğrula <Check size={18} />
                </button>
              </form>
            </section>
            <h2>Mağaza geçmişi</h2>
            {data.requests
              .filter((r) => r.storeId === shop.id && !active(r))
              .map((r) => (
                <div className="history-row" key={r.id}>
                  <div>
                    <strong>
                      {r.status === "COMPLETED"
                        ? "İşletme teslim beyanı"
                        : labels[r.status]}
                    </strong>
                    <small>{time(r.ended)}</small>
                    {r.status === "COMPLETED" && (
                      <small>
                        Verilen nakit: {money(r.amount)} · Hesaba aktarılacak
                        tutar: varsayımsal {money(r.amount)} · İşlem kazancı:
                        belirlenmedi · Aktarım durumu: yapılmadı
                      </small>
                    )}
                    {r.dispute && (
                      <small className="danger">
                        Müşteri itirazı: {r.dispute.reason}
                      </small>
                    )}
                  </div>
                  <b>{money(r.amount)}</b>
                </div>
              ))}
            {!data.requests.some(
              (r) => r.storeId === shop.id && !active(r),
            ) && (
              <p className="muted small">
                Henüz tamamlanan veya kapanan işlem yok.
              </p>
            )}
          </section>
        ) : page === "profile" ? (
          <section>
            <p className="eyebrow">PROFİL</p>
            <h1>Merhaba, Deniz.</h1>
            <p className="muted">Tamamen kurgusal demo kullanıcısı.</p>
            <div className="profile-card">
              <UserRound size={32} />
              <div>
                <strong>Deniz · Demo kullanıcı</strong>
                <p>Ankara · Örnek konum</p>
              </div>
            </div>
            <h2>Telefonunda uygulama gibi</h2>
            <p className="muted">
              {cached
                ? "Çevrimdışı sunum dosyaları hazır."
                : "İlk açılışta internet bağlantısı gerekir."}
            </p>
            {install && (
              <button
                className="primary wide"
                onClick={async () => {
                  await install.prompt();
                  setInstall(null);
                }}
              >
                <Download size={18} />
                Ana ekrana ekle
              </button>
            )}
            <ol className="instructions">
              <li>
                <strong>iPhone / Safari:</strong> Paylaş → Ana Ekrana Ekle.
              </li>
              <li>
                <strong>Android / Chrome:</strong> Menü → Ana ekrana ekle veya
                Uygulamayı yükle.
              </li>
              <li>
                İlk kez çevrimiçi aç. Sonraki sunumda aynı tarayıcıyı veya
                yüklediğin uygulamayı kullan.
              </li>
            </ol>
            <h2>Bu demo nasıl çalışır?</h2>
            <p className="muted">
              Müşteri ve işletme aynı cihazdaki kayıtları kullanır. Cihazlar
              arasında eşzamanlama yoktur. Tutarlar, mesafeler, adresler ve
              kullanıcı kurgusaldır. Tek sekmede sunum yap.
            </p>
            <p className="muted">
              Zaman bu cihazın saatine dayanır. Tarayıcı verilerini silmek
              geçmişi siler. Bu prototip gerçek hizmetin güvenlik veya finansal
              altyapısı değildir.
            </p>
            <button
              className="secondary wide"
              onClick={() => setControls(true)}
            >
              <SlidersHorizontal size={18} />
              Sunum kontrollerini aç
            </button>
            <button
              className="secondary wide danger"
              onClick={() => setReset(true)}
            >
              <RotateCcw size={18} />
              Demoyu sıfırla
            </button>
            <a className="text-button" href="https://www.nexivotr.com/">
              NEXIVO ana sitesi ↗
            </a>
          </section>
        ) : page === "requests" ? (
          <section>
            {shown ? (
              requestView(shown)
            ) : (
              <>
                <p className="eyebrow">İŞLEMLER</p>
                <h1>Adımların burada.</h1>
              </>
            )}
            <h2>İşlem geçmişi</h2>
            {data.requests.length === 0 ? (
              <div className="empty">
                <ReceiptText />
                <strong>Henüz bir talebin yok.</strong>
                <button className="text-button" onClick={() => setPage("home")}>
                  İlk denemeni başlat →
                </button>
              </div>
            ) : (
              data.requests.map((r) => (
                <button
                  className="history-row"
                  key={r.id}
                  onClick={() => {
                    setSelectedRequest(r.id);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div>
                    <strong>
                      {data.stores.find((s) => s.id === r.storeId)?.name}
                    </strong>
                    <small>{labels[r.status]}</small>
                    {r.dispute && (
                      <span className="dispute-chip">İtiraz açık</span>
                    )}
                    <small>{time(r.created)}</small>
                  </div>
                  <b>{money(r.amount)}</b>
                  <ChevronRight size={18} />
                </button>
              ))
            )}
          </section>
        ) : selection ? (
          <section>
            <button className="back" onClick={() => setSelection(null)}>
              <ArrowLeft size={18} />
              Mağazalara dön
            </button>
            {(() => {
              const s = data.stores.find((s) => s.id === selection)!;
              return (
                <>
                  <h1>{s.name}</h1>
                  <span className={`availability ${s.open ? "" : "closed"}`}>
                    {s.open ? "Talep kabul ediyor" : "Şu an hizmet vermiyor"}
                  </span>
                  <p className="muted">{s.address}</p>
                  <div className="metadata">
                    <span>
                      <MapPin size={15} />
                      {s.distance} · örnek mesafe
                    </span>
                    <span>
                      <Clock3 size={15} />
                      {s.hours}
                    </span>
                  </div>
                  <div className="receipt">
                    <h2>Talep özeti</h2>
                    <dl>
                      <div>
                        <dt>Hizmet bedeli</dt>
                        <dd>Henüz belirlenmedi</dd>
                      </div>
                      <div className="total">
                        <dt>Talep tutarı</dt>
                        <dd>{money(Number(amount) * 100)}</dd>
                      </div>
                    </dl>
                    <p className="small muted">
                      Gerçek fiyatlandırma henüz belirlenmedi. Bu tutarlar
                      yalnızca sunum içindir.
                    </p>
                  </div>
                  {!s.open && (
                    <div className="closed-explanation" role="status">
                      <strong>
                        Bu nokta şu anda nakit taleplerini kabul etmiyor.
                      </strong>
                      <button
                        className="secondary wide"
                        onClick={() => setSelection(null)}
                      >
                        Diğer noktaları gör
                      </button>
                    </div>
                  )}
                  <div className="info">
                    <Clock3 size={22} />
                    <p>
                      Mağaza onaylamadan yola çıkma. Uygunluk bilgisi
                      rezervasyon değildir. Bu işlem yalnızca demodur.
                    </p>
                  </div>
                  {s.open && (
                    <button
                      className="primary wide"
                      disabled={!valid || !!current}
                      onClick={() =>
                        act({
                          type: "create",
                          storeId: s.id,
                          amount: Number(amount) * 100,
                        })
                      }
                    >
                      Talep gönder <ArrowUpRight size={19} />
                    </button>
                  )}
                  {current && (
                    <button
                      className="text-button"
                      onClick={() => {
                        setSelectedRequest(current.id);
                        setPage("requests");
                        setSelection(null);
                      }}
                    >
                      Mevcut talebine git →
                    </button>
                  )}
                </>
              );
            })()}
          </section>
        ) : (
          <section className="customer-home">
            <h1>Ne kadar nakit?</h1>
            <p className="muted">
              Tutarı seç, gitmeden önce mağazanın onayını gör.
            </p>
            {current && (
              <button
                className="active-card"
                onClick={() => {
                  setSelectedRequest(current.id);
                  setPage("requests");
                }}
              >
                <Clock3 size={21} />
                <div>
                  <strong>{money(current.amount)} · Aktif talebin</strong>
                  <small>
                    {labels[current.status]} · {remaining(current)}
                  </small>
                </div>
                <ChevronRight size={18} />
              </button>
            )}
            <div className="amount-panel">
              <div className="amount-presets">
                {[200, 500, 1000].map((n) => (
                  <button
                    aria-pressed={amount === String(n)}
                    key={n}
                    onClick={() => setAmount(String(n))}
                  >
                    {money(n * 100)}
                  </button>
                ))}
              </div>
              <label className="amount-input">
                Demo tutarı{" "}
                <div>
                  <input
                    aria-label="Demo tutarı TL"
                    inputMode="numeric"
                    type="number"
                    step="100"
                    min="100"
                    max="2000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <span>TL</span>
                </div>
              </label>
              <p className="small muted">
                100–2.000 TL · 100 TL’nin katları · Yalnızca demo limitleri
              </p>
              {!valid && (
                <p role="alert" className="field-error">
                  100–2.000 TL arasında, 100’ün katı bir tutar gir.
                </p>
              )}
            </div>
            <div className="line section-line">
              <h2>Yakınındaki demo noktaları</h2>
              <div className="view-toggle">
                <button
                  aria-label="Liste görünümü"
                  aria-pressed={!map}
                  onClick={() => setMap(false)}
                >
                  <List size={18} />
                </button>
                <button
                  aria-label="Harita görünümü"
                  aria-pressed={map}
                  onClick={() => setMap(true)}
                >
                  <Map size={18} />
                </button>
              </div>
            </div>
            <p className="small muted">
              Son bildirim, kesin nakit veya rezervasyon garantisi değildir.
            </p>
            {map && (
              <div className="map-view">
                <div className="map-road road-one" />
                <div className="map-road road-two" />
                <div className="map-road road-three" />
                <span className="map-label">ANKARA · ŞEMATİK HARİTA</span>
                <span className="map-park">Örnek yeşil alan</span>
                {data.stores.map((s, i) => (
                  <button
                    className={`map-pin pin-${i}`}
                    key={s.id}
                    aria-label={`${s.name} detayını aç`}
                    onClick={() =>
                      valid
                        ? setSelection(s.id)
                        : setError("Önce geçerli bir tutar seç.")
                    }
                  >
                    <Store size={18} />
                    <span>{s.area}</span>
                  </button>
                ))}
                <small>Örnek yerleşim · Navigasyon için kullanma</small>
              </div>
            )}
            {!map && <div className="shops">
              {data.stores.map((s) => (
                <button
                  key={s.id}
                  className="shop-card"
                  disabled={!valid}
                  onClick={() => setSelection(s.id)}
                >
                  <div className="shop-avatar">
                    <Store size={24} />
                  </div>
                  <div className="shop-copy">
                    <span className="pill">Demo noktası</span>
                    <h3>{s.name}</h3>
                    <p>
                      {s.area} · {s.distance} (örnek)
                    </p>
                    <p>{s.hours} · Kurgusal hizmet saatleri</p>
                    <span className={`availability ${s.open ? "" : "closed"}`}>
                      {s.open ? "Talep kabul ediyor" : "Şu an hizmet vermiyor"}
                    </span>
                    <small>Son demo bildirimi: {time(s.updated)}</small>
                  </div>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>}
          </section>
        )}
      </main>
      <nav className="bottom-nav" aria-label="Alt navigasyon">
        {[
          ["home", "Ana Sayfa", Home],
          ["requests", "İşlemler", ReceiptText],
          ["profile", "Profil", UserRound],
        ].map(([id, label, Icon]) => {
          const NavIcon = Icon as typeof Home;
          return (
            <button
              key={String(id)}
              aria-current={
                page === id && role === "customer" ? "page" : undefined
              }
              onClick={() => {
                setRole("customer");
                setPage(String(id));
                setSelection(null);
                setError("");
                if (id === "requests") setSelectedRequest(current?.id || null);
                window.scrollTo(0, 0);
              }}
            >
              <NavIcon size={21} />
              <span>{String(label)}</span>
            </button>
          );
        })}
      </nav>
      {reset && (
        <div className="modal-backdrop">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            className="modal"
          >
            <h2 id="reset-title">Demo başa dönsün mü?</h2>
            <p>
              Yalnızca bu tarayıcıdaki sunum işlemleri silinir. Üç demo
              mağazasının kapasitesi başlangıca döner.
            </p>
            <button
              className="primary wide"
              onClick={() => {
                if (save(initial())) {
                  setReset(false);
                  setPage("home");
                  setRole("customer");
                  setSelection(null);
                  setSelectedRequest(null);
                  setControls(false);
                  setError("");
                  setNotice("");
                  setAmount("500");
                  setShopId("a");
                }
              }}
            >
              Evet, demo verilerini sıfırla
            </button>
            <button
              autoFocus
              className="secondary wide"
              onClick={() => setReset(false)}
            >
              Vazgeç
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
