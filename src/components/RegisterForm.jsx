import { useState } from "react";

const TELEGRAM_BOT_URL = "https://t.me/HlobaFlowSchoolBot";
const WEBHOOK_URL = import.meta.env.VITE_REGISTER_WEBHOOK_URL || "";

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

const SURVEY = [
  {
    id: "occupation",
    num: "3",
    question: "Чим ви зараз займаєтесь?",
    type: "single",
    required: true,
    options: [
      "Маю свій бізнес / підприємець",
      "Працюю в найманій роботі (офіс/віддалено)",
      "Фрилансер / самозайнятий",
      "Студент / шукаю себе",
      "Зараз без роботи",
    ],
  },
  {
    id: "ai_experience",
    num: "4",
    question: "Який у вас досвід з AI-інструментами (ChatGPT, Claude, n8n, Make тощо)?",
    type: "single",
    required: true,
    options: [
      "Ніколи не користувався",
      "Іноді використовую ChatGPT для простих задач",
      "Активно використовую кілька AI-інструментів",
      "Вже будую автоматизації / працюю з API",
    ],
  },
  {
    id: "goals",
    num: "5",
    question: "Яка ваша головна мета від навчання?",
    hint: "Можна обрати кілька",
    type: "multi",
    required: true,
    options: [
      "Освоїти нову професію та змінити роботу",
      "Запустити власні послуги з AI-автоматизації",
      "Автоматизувати свій бізнес / процеси",
      "Підвищити ефективність на поточній роботі",
      "Просто цікаво, хочу розібратись",
    ],
  },
  {
    id: "time_per_week",
    num: "6",
    question: "Скільки часу готові приділяти навчанню на тиждень?",
    type: "single",
    required: true,
    options: [
      "До 3 годин",
      "3–7 годин",
      "7–15 годин",
      "Більше 15 годин — готовий зануритись",
    ],
  },
  {
    id: "budget",
    num: "7",
    question: "Який бюджет на навчання та розвиток розглядаєте найближчим часом?",
    type: "single",
    required: true,
    options: [
      "Поки тільки безкоштовні матеріали",
      "До 100 $",
      "100–500 $",
      "500–1500 $",
      "Понад 1500 $ — готовий інвестувати в результат",
    ],
  },
];

const initialSurveyState = () => {
  const state = {};
  for (const q of SURVEY) state[q.id] = q.type === "multi" ? [] : "";
  return state;
};

export default function RegisterForm() {
  const [contact, setContact] = useState({
    name: "",
    code: "+380",
    phone: "",
    email: "",
    agree: false,
  });
  const [survey, setSurvey] = useState(initialSurveyState);
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [errorMsg, setErrorMsg] = useState("");

  const updateContact = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setContact((prev) => ({ ...prev, [key]: value }));
  };

  const setSingle = (id, value) =>
    setSurvey((prev) => ({ ...prev, [id]: value }));

  const toggleMulti = (id, value) =>
    setSurvey((prev) => {
      const current = prev[id] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [id]: next };
    });

  const validate = () => {
    if (!contact.name.trim()) return "Вкажіть, будь ласка, ім’я.";
    if (!contact.phone.trim()) return "Вкажіть номер телефону.";
    if (!contact.email.trim()) return "Вкажіть електронну пошту.";
    if (!contact.agree) return "Потрібно прийняти політику та умови.";
    for (const q of SURVEY) {
      if (!q.required) continue;
      const v = survey[q.id];
      const empty = q.type === "multi" ? !v?.length : !v;
      if (empty) return `Дайте відповідь на питання № ${q.num}.`;
    }
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
      source: typeof window !== "undefined" ? window.location.href : "",
      contact: {
        name: contact.name.trim(),
        phone: `${contact.code}${contact.phone.trim()}`,
        email: contact.email.trim(),
        agreed: contact.agree,
      },
      survey,
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
        // Локальна розробка без вебхука — просто логуємо.
        console.info("[RegisterForm] no webhook configured, payload:", payload);
      }

      // Успішна відправка → одразу веземо в Telegram-бот.
      window.location.href = TELEGRAM_BOT_URL;
    } catch (e) {
      setStatus("error");
      setErrorMsg(
        "Не вдалося надіслати заявку. Перевірте інтернет і спробуйте ще раз.",
      );
      console.error("[RegisterForm] submit failed:", e);
    }
  };

  const submitting = status === "submitting";

  return (
    <section className="section" id="register">
      <div className="container">
        <div className="form-wrap">
          <form onSubmit={handleSubmit} noValidate>
            <h3 className="form-title">Зареєструватися на інтенсив</h3>
            <p className="form-sub">
              Безоплатно. 3 дні практики. Старт — 10 травня.
            </p>

            <div className="form-field">
              <label className="form-label" htmlFor="f-name">
                1. Імʼя *
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
                2. Номер телефону *
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

            <div className="form-divider" aria-hidden="true" />

            {SURVEY.map((q) => (
              <fieldset key={q.id} className="form-question" disabled={submitting}>
                <legend className="form-question__legend">
                  <span className="form-question__num">{q.num}.</span>
                  <span className="form-question__text">
                    {q.question}
                    {q.required && " *"}
                  </span>
                </legend>
                {q.hint && <p className="form-question__hint">{q.hint}</p>}

                <div className="form-options">
                  {q.options.map((opt) => {
                    const checked =
                      q.type === "multi"
                        ? survey[q.id].includes(opt)
                        : survey[q.id] === opt;
                    return (
                      <label
                        key={opt}
                        className={
                          "form-option" + (checked ? " is-checked" : "")
                        }
                      >
                        <input
                          type={q.type === "multi" ? "checkbox" : "radio"}
                          name={q.id}
                          value={opt}
                          checked={checked}
                          onChange={() =>
                            q.type === "multi"
                              ? toggleMulti(q.id, opt)
                              : setSingle(q.id, opt)
                          }
                        />
                        <span className="form-option__mark" aria-hidden="true" />
                        <span className="form-option__text">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <div className="form-divider" aria-hidden="true" />

            <label className="form-checkbox">
              <input
                type="checkbox"
                required
                checked={contact.agree}
                onChange={updateContact("agree")}
                disabled={submitting}
              />
              <span>
                Приймаю <a href="#privacy">Політику конфіденційності</a> та{" "}
                <a href="#terms">Умови користування послугами</a>
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
    </section>
  );
}
