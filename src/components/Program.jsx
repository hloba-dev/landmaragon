import { noBreak } from "../utils/text.js";

const DAYS = [
  {
    num: "01",
    title: noBreak("День 1 — Хто такий AI-автоматизатор"),
    desc: noBreak(
      "Розберешся, що робить AI-автоматизатор і за що йому платять. Почнеш створювати власного AI-асистента в n8n крок за кроком.",
    ),
  },
  {
    num: "02",
    title: noBreak("День 2 — Перший робочий AI-асистент"),
    desc: noBreak(
      "Завершиш налаштування AI-асистента. Підключиш його до месенджера й протестуєш у реальних сценаріях бізнесу.",
    ),
  },
  {
    num: "03",
    title: "День 3 — Як заробляти на цьому",
    desc: "Отримаєш чіткий план, як розвивати навички та перетворити їх на стабільний дохід — фриланс, найм або власні проєкти.",
  },
];

export default function Program() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <span className="section-eyebrow">Програма</span>
          <h2 className="section-title section-title--center">
            Що ти отримаєш за 3 дні навчання
          </h2>
        </div>

        <div className="program__grid">
          {DAYS.map((day) => (
            <article className="card program__card" key={day.num}>
              <div className="program__card-num">{day.num}</div>
              <h3 className="program__card-title">{day.title}</h3>
              <p className="program__card-desc">{day.desc}</p>
            </article>
          ))}
        </div>

        <div className="program__bonus">
          <p>
            <b>+ Бонус:</b> практичні відеоматеріали, готові шаблони n8n та
            чеклісти, які допоможуть швидше застосувати AI-інструменти на
            практиці.
          </p>
          <a href="#register" className="btn">
            Зареєструватися на інтенсив
          </a>
        </div>
      </div>
    </section>
  );
}
