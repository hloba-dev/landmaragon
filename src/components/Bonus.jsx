export default function Bonus() {
  return (
    <section className="section">
      <div className="container">
        <div className="bonus">
          <span className="section-eyebrow">Бонус</span>
          <h2 className="bonus__title">Отримай шанс виграти сервер з N8N!</h2>
          <p className="bonus__sub">
            Розіграш повного курсу <b className="text-accent">AI Automator</b>{" "}
            від HlobaFlow серед тих, хто:
          </p>

          <ul className="bonus__list">
            <li>виконає всі домашні завдання інтенсиву;</li>
            <li>буде присутнім на фінальному вебінарі.</li>
            <li>залишиться у спільноті учасників і поділиться результатом.</li>
          </ul>

          <a href="#register" className="btn btn--lg">
            Я хочу взяти участь
          </a>
        </div>
      </div>
    </section>
  );
}
