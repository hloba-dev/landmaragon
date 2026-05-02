import Brand from "./Brand.jsx";

export default function TopBar() {
  return (
    <header className="topbar" id="top">
      <div className="container topbar__inner">
        <Brand />

        <ul className="topbar__plate" aria-label="Параметри інтенсиву">
          <li>Безкоштовний інтенсив</li>
          <li>3 дні</li>
          <li>Старт: 10 травня</li>
        </ul>

        <a href="#register" className="btn topbar__cta">
          Зареєструватися
        </a>
      </div>
    </header>
  );
}
