import Brand from "./Brand.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Brand />

        <ul className="footer__links">
          <li>
            <a href="#terms">Умови користування</a>
          </li>
          <li>
            <a href="#privacy">Політика конфіденційності</a>
          </li>
          <li>
            <a href="#disclaimer">Відмова від відповідальності</a>
          </li>
        </ul>

        <div className="footer__copy">
          © {new Date().getFullYear()} HlobaFlow. Всі права захищено.
        </div>
      </div>
    </footer>
  );
}
