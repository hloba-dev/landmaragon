import { useState } from "react";
import { useCountdown } from "../hooks/useCountdown.js";

const TELEGRAM_BOT_URL = "https://t.me/HlobaFlowSchoolBot";
const WEBHOOK_URL = import.meta.env.VITE_REGISTER_WEBHOOK_URL || "";

const START_DATE = (() => {
  const d = new Date();
  d.setMonth(4, 25);
  d.setHours(19, 0, 0, 0);
  if (d.getTime() < Date.now()) d.setFullYear(d.getFullYear() + 1);
  return d;
})();

const COUNTRY_CODES = [
  { code: "+380", name: "🇺🇦 UA" },
  { code: "+48", name: "🇵🇱 PL" },
  { code: "+49", name: "🇩🇪 DE" },
  { code: "+1", name: "🇺🇸 US" },
  { code: "+44", name: "🇬🇧 UK" },
  { code: "+34", name: "🇪🇸 ES" },
  { code: "+39", name: "🇮🇹 IT" },
  { code: "+33", name: "🇫🇷 FR" },
  { code: "+420", name: "🇨🇿 CZ" },
  { code: "+371", name: "🇱🇻 LV" },
  { code: "+370", name: "🇱🇹 LT" },
  { code: "+372", name: "🇪🇪 EE" },
];

// Збираємо UTM/click-id з URL — щоб у CRM було видно з якого крео прийшов лід
function getTrackingParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
    "ttclid",
  ];
  const result = {};
  for (const k of keys) {
    const v = params.get(k);
    if (v) result[k] = v;
  }
  return result;
}

// Відправка події конверсії в GA4, Meta Pixel та dataLayer (для GTM).
// Має викликатися ДО редиректу в Telegram, щоб пікселі встигли долетіти.
function fireLeadEvents(payload) {
  try {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: "AI-intensive registration",
        currency: "USD",
        value: 0,
      });
    }
  } catch (_) {}

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "form",
        event_label: "register_form",
        utm_source: payload.tracking?.utm_source || "(none)",
        utm_campaign: payload.tracking?.utm_campaign || "(none)",
      });
    }
  } catch (_) {}

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_submit",
      form_id: "register_form",
      utm_source: payload.tracking?.utm_source || null,
      utm_medium: payload.tracking?.utm_medium || null,
      utm_campaign: payload.tracking?.utm_campaign || null,
    });
  } catch (_) {}
}

export default function RegisterForm() {
  const [contact, setContact] = useState({
    name: "",
    code: "+380",
    phone: "",
    email: "",
    agree: false,
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [errorMsg, setErrorMsg] = useState("");

  const updateContact = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setContact((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!contact.name.trim()) return "Вкажіть, будь ласка, ім’я.";
    if (!contact.phone.trim()) return "Вкажіть номер телефону.";
    if (!contact.email.trim()) return "Вкажіть електронну пошту.";
    if (!/^\S+@\S+\.\S+$/.test(contact.email.trim()))
      return "Невірний формат email.";
    if (!contact.agree) return "Потрібно прийняти політику та умови.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus("error");
      setErrorMsg(err);
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      submitted_at: new Date().toISOString(),
      page_url: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      contact: {
        name: contact.name.trim(),
        phone: `${contact.code}${contact.phone.trim().replace(/\D/g, "")}`,
        email: contact.email.trim().toLowerCase(),
        agreed: contact.agree,
      },
      tracking: getTrackingParams(),
    };

    try {
      if (WEBHOOK_URL) {
        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
      } else {
        console.info("[RegisterForm] no webhook configured, payload:", payload);
      }

      // Спочатку шлемо події конверсії, потім даємо ~250 мс на доставку — і редирект.
      fireLeadEvents(payload);
      setTimeout(() => {
        window.location.href = TELEGRAM_BOT_URL;
      }, 250);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Не вдалося надіслати заявку. Перевірте інтернет і спробуйте ще раз.",
      );
      console.error("[RegisterForm] submit failed:", err);
    }
  };

  const submitting = status === "submitting";
  const time = useCountdown(START_DATE);

  return (
    <section className="section register-section" id="register">
      <div className="container register-section__container">
        <div className="register-section__intro">
          <h2 className="register-section__title">
            Спробуй професію <br />
            <span className="register-section__title-accent">
              AI-автоматизатора
            </span>{" "}
            <br />
            безкоштовно!
          </h2>
          <p className="register-section__subtitle">
            Реєструйся на інтенсив!
          </p>

          <div className="register-section__visual" aria-hidden="true">
            <div className="register-section__visual-glow" />
            <img
              src="/images/hero-ai.png"
              alt=""
              className="register-section__visual-img"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="register-section__form-col">
          <div
            className="register-section__countdown"
            id="register-timer"
          >
            <span className="register-section__countdown-label">
              До старту залишилось:
            </span>
            <div
              className="register-section__countdown-time"
              aria-live="polite"
            >
              <span>{time.days}</span>
              <span className="register-section__countdown-sep">:</span>
              <span>{time.hours}</span>
              <span className="register-section__countdown-sep">:</span>
              <span>{time.minutes}</span>
              <span className="register-section__countdown-sep">:</span>
              <span>{time.seconds}</span>
            </div>
          </div>

          <div className="form-wrap">
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="form-title">Зареєструватися на інтенсив</h3>
              <ul className="form-highlights" aria-label="Умови інтенсиву">
                <li className="form-highlight form-highlight--accent">
                  <span className="form-highlight__dot" aria-hidden="true" />
                  Безкоштовно
                </li>
                <li className="form-highlight">3 дні практики</li>
                <li className="form-highlight">Старт — 25 травня</li>
              </ul>

              <div className="form-field">
                <label className="form-label" htmlFor="f-name">
                  Імʼя *
                </label>
                <input
                  id="f-name"
                  className="form-input"
                  type="text"
                  required
                  value={contact.name}
                  onChange={updateContact("name")}
                  placeholder="Як до тебе звертатися"
                  autoComplete="given-name"
                  disabled={submitting}
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="f-phone">
                  Номер телефону *
                </label>
                <div className="form-phone">
                  <select
                    className="form-input"
                    value={contact.code}
                    onChange={updateContact("code")}
                    aria-label="Код країни"
                    disabled={submitting}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="f-phone"
                    className="form-input"
                    type="tel"
                    inputMode="tel"
                    required
                    value={contact.phone}
                    onChange={updateContact("phone")}
                    placeholder="00 000 00 00"
                    autoComplete="tel"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="f-email">
                  Електронна пошта *
                </label>
                <input
                  id="f-email"
                  className="form-input"
                  type="email"
                  required
                  value={contact.email}
                  onChange={updateContact("email")}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={submitting}
                />
              </div>

              <label className="form-checkbox">
                <input
                  type="checkbox"
                  required
                  checked={contact.agree}
                  onChange={updateContact("agree")}
                  disabled={submitting}
                />
                <span>
                  Приймаю{" "}
                  <a href="/privacy.html" target="_blank" rel="noopener">
                    Політику конфіденційності
                  </a>{" "}
                  та{" "}
                  <a href="/terms.html" target="_blank" rel="noopener">
                    Умови користування послугами
                  </a>
                </span>
              </label>

              {status === "error" && errorMsg && (
                <p className="form-error" role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="btn btn--full btn--lg"
                disabled={submitting}
              >
                {submitting ? "Надсилаємо…" : "Зареєструватися"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
