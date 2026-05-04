import { noBreak } from "../utils/text.js";

const REGALIA = [
  noBreak("Понад 2 роки практичного досвіду з AI та no-code автоматизаціями"),
  noBreak("Засновник школи HlobaFlow — навчає підприємців і фахівців запускати AI-проєкти"),
  "Будує реальні автоматизації для українського й міжнародного бізнесу",
  "Пояснює складні речі простою мовою, з фокусом на результат, а не теорію",
];

const NICHES = [
  "E-commerce та Shopify",
  "Маркетингові агенції",
  "EdTech / онлайн-школи",
  "B2B-сервіси та SaaS",
  "Контент-проєкти та медіа",
];

const CASES = [
  {
    metric: "−15 год/тиж",
    title: "Обробка замовлень в e-commerce",
    desc: "AI-асистент сортує замовлення, формує накладні та оновлює CRM. Власник звільнив 15+ годин на тиждень для зростання бізнесу.",
  },
  {
    metric: "80% запитів",
    title: "AI-агент підтримки в Telegram",
    desc: "Бот для агенції відповідає на типові питання клієнтів цілодобово й передає менеджеру лише складні кейси.",
  },
  {
    metric: "×3 швидше",
    title: "Кваліфікація лідів для B2B",
    desc: "Воронка з n8n + GPT автоматично кваліфікує заявки за 6 параметрами та одразу планує дзвінок із менеджером.",
  },
];

export default function Teacher() {
  return (
    <section className="section">
      <div className="container">
        <div className="teacher">
          <figure className="teacher__photo">
            <div className="teacher__photo-ring" aria-hidden="true" />
            <img
              src="/images/speaker.jpg"
              alt="Нікіта Глоба — викладач і засновник HlobaFlow"
              className="teacher__photo-img"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="teacher__photo-cap">
              <span className="teacher__photo-cap-dot" aria-hidden="true" />
              Нікіта Глоба
            </figcaption>
          </figure>

          <div>
            <span className="teacher__role">Викладач та засновник</span>
            <h2 className="teacher__name">Нікіта Глоба</h2>
            <p className="text-2" style={{ fontSize: "18px" }}>
              Практик no-code та low-code AI-автоматизацій. Навчає тому, що сам
              щодня використовує в роботі.
            </p>

            <ul className="teacher__list">
              {REGALIA.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="teacher__niches">
              <span className="teacher__niches-label">
                Категорії клієнтів, з якими працював:
              </span>
              <ul className="teacher__niches-list">
                {NICHES.map((n) => (
                  <li className="teacher__niche" key={n}>
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="teacher__cases">
          <span className="section-eyebrow">З практики</span>
          <h3 className="teacher__cases-title">
            Реальні автоматизації, які приносять результат
          </h3>
          <div className="teacher__cases-grid">
            {CASES.map((c) => (
              <article className="teacher__case" key={c.title}>
                <div className="teacher__case-metric">{c.metric}</div>
                <h4 className="teacher__case-title">{c.title}</h4>
                <p className="teacher__case-desc">{c.desc}</p>
              </article>
            ))}
          </div>
          <p className="teacher__cases-note">
            * Сценарії з реальної практики автоматизацій. Конкретні цифри по
            кожному проєкту різняться залежно від обсягу та складності.
          </p>
        </div>
      </div>
    </section>
  );
}
