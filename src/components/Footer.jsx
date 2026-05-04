import Brand from "./Brand.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Brand />

        <ul className="footer__links">
          <li>
            <a href="/terms.html" target="_blank" rel="noopener">
              Умови користування
            </a>
          </li>
          <li>
            <a href="/privacy.html" target="_blank" rel="noopener">
              Політика конфіденційності
            </a>
          </li>
          <li>
            <a href="/disclaimer.html" target="_blank" rel="noopener">
              Відмова від відповідальності
            </a>
          </li>
        </ul>

        <div className="footer__copy">
          © {new Date().getFullYear()} HlobaFlow. Всі права захищено.
        </div>
      </div>
    </footer>
  );
}
