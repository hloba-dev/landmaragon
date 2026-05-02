import { noBreak } from "../utils/text.js";

const BENEFITS = [
  noBreak(
    "Попит на AI-автоматизаторів зростає щомісяця — бізнес шукає тих, хто може створити системи швидко.",
  ),
  "Зарплати стартують від $1000+ вже після кількох виконаних проєктів.",
  "Професія поєднує AI, логіку, креатив — і дає свободу працювати з будь-якої точки світу.",
  "Один спеціаліст замінює команду з 3-4 ролей — тому за нього готові платити більше.",
];

export default function Benefits() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <span className="section-eyebrow">Чому це варто</span>
          <h2 className="section-title section-title--center">Переваги</h2>
        </div>

        <div className="benefits__grid">
          {BENEFITS.map((text, i) => (
            <div className="benefits__item" key={i}>
              <div className="benefits__item-num">0{i + 1}</div>
              <p className="benefits__item-text">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
