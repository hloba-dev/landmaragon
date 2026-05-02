const NUMBERS = [
  { big: "$30+", cap: "за годину роботи" },
  { big: "$100+", cap: "за один проєкт" },
  { big: "$1000+", cap: "після кількох проєктів" },
];

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <div className="about__inner">
          <div className="about__media" aria-hidden="true">
            <div className="about__media-glow" />
            <img
              src="/images/profession-ai.png"
              alt=""
              className="about__media-img"
              loading="lazy"
              decoding="async"
            />
            <div className="about__media-badge">
              <span className="about__media-badge-dot" />
              майбутнє вже тут
            </div>
          </div>

          <div className="about__text">
            <span className="section-eyebrow">Професія</span>
            <h2 className="section-title about__title">
              <span className="no-wrap-word">AI-автоматизатор</span> — сучасна
              професія
            </h2>

            <p className="about__lead">
              Це шлях до нового рівня доходу. Ти можеш заробляти{" "}
              <b>від $30 за годину</b> або <b>від $100 за проєкт</b>. Сам
              визначай, скільки заробиш цього місяця.
            </p>

            <p className="about__sub">
              Ти налаштовуєш процеси, які працюють <b>без коду й без команди</b>.
              А бізнес платить за те, що економить йому час і приносить
              результат.
            </p>

            <div className="about__numbers">
              {NUMBERS.map((n) => (
                <div className="about__num" key={n.big}>
                  <div className="about__num-big">{n.big}</div>
                  <div className="about__num-cap">{n.cap}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
