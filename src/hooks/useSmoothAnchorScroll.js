import { useEffect } from "react";
import { smoothScrollToId } from "../utils/smoothScroll.js";

/**
 * Перехоплює кліки по якірних посиланнях (a[href^="#"]) і анімує скрол
 * через requestAnimationFrame з easeInOutQuart — швидше за дефолтний
 * scroll-behavior: smooth, але з більш приємною інерцією.
 */
export function useSmoothAnchorScroll() {
  useEffect(() => {
    let cancelCurrent = () => {};

    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;

      const id = decodeURIComponent(href.slice(1));
      if (!document.getElementById(id)) return;

      e.preventDefault();
      cancelCurrent();
      cancelCurrent = smoothScrollToId(id);

      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    };

    const cancelOnInteract = () => cancelCurrent();

    document.addEventListener("click", onClick);
    window.addEventListener("wheel", cancelOnInteract, { passive: true });
    window.addEventListener("touchstart", cancelOnInteract, { passive: true });
    window.addEventListener("keydown", cancelOnInteract);

    return () => {
      cancelCurrent();
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", cancelOnInteract);
      window.removeEventListener("touchstart", cancelOnInteract);
      window.removeEventListener("keydown", cancelOnInteract);
    };
  }, []);
}
