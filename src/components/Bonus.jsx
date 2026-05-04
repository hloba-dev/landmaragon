export default function Bonus() {
  return (
    <section className="section">
      <div className="container">
        <div className="bonus">
          <span className="section-eyebrow">Бонус кожному учаснику</span>
          <h2 className="bonus__title">
            Безкоштовний урок:{" "}
            <span className="text-accent">встанови n8n на власний сервер</span>
          </h2>
          <p className="bonus__sub">
            Покрокова відеоінструкція + готовий чек-лист — від купівлі сервера до
            запуску першого workflow. Отримує <b>кожен</b>, хто зареєструвався на інтенсив.
          </p>

          <ul className="bonus__list">
            <li>як обрати й налаштувати недорогий VPS під n8n;</li>
            <li>встановлення n8n у Docker за 15 хвилин;</li>
            <li>підключення власного домену та HTTPS-сертифіката;</li>
            <li>бекапи, оновлення й базова безпека сервера;</li>
            <li>готовий стартовий workflow для перевірки.</li>
          </ul>

          <p className="bonus__sub" style={{ marginTop: 18 }}>
            <b className="text-accent">Додатково:</b> серед активних учасників — розіграш
            готового сервера з n8n <b>безкоштовно на 2 місяці</b> від HlobaFlow.
          </p>

          <a href="#register" className="btn btn--lg">
            Хочу отримати урок
          </a>
        </div>
      </div>
    </section>
  );
}
