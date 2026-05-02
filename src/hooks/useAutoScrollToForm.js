import { useEffect } from "react";
import { smoothScrollToId } from "../utils/smoothScroll.js";

/**
 * Тихий автоскрол до форми реєстрації після затримки.
 * Скасовується при будь-якій взаємодії користувача.
 * Без візуальних попереджень — користувач не повинен бачити, що відбувається авто-скрол.
 */
export function useAutoScrollToForm(targetId = "register", delayMs = 4000) {
  useEffect(() => {
    let cancelled = false;
    let timer;
    let cancelAnim = () => {};

    const cancel = () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnim();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("mousedown", cancel);
    };

    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    window.addEventListener("mousedown", cancel);

    timer = setTimeout(() => {
      if (cancelled) return;
      cancelAnim = smoothScrollToId(targetId, {
        minDuration: 600,
        maxDuration: 1100,
        speed: 0.55,
      });
    }, delayMs);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cancelAnim();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("mousedown", cancel);
    };
  }, [targetId, delayMs]);
}
