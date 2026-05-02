import { noBreak } from "../utils/text.js";

const REGALIA = [
  noBreak("Понад 2 роки практичного досвіду з AI та no-code автоматизаціями"),
  noBreak("Засновник школи HlobaFlow — навчає студентів запускати AI-проєкти"),
  "Будує реальні автоматизації для українського й міжнародного бізнесу",
  "Пояснює складні речі простою мовою, з фокусом на результат, а не теорію",
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
          </div>
        </div>
      </div>
    </section>
  );
}
