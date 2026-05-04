(function () {
  const STORAGE_KEY = "hf_legal_lang";
  const SUPPORTED = ["uk", "en"];

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = "uk";
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-lang-block]").forEach((el) => {
      const match = el.getAttribute("data-lang-block") === lang;
      if (match) el.removeAttribute("hidden");
      else el.setAttribute("hidden", "");
    });

    document.querySelectorAll(".legal-lang__btn").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }

  function detectInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) {}
    const nav = (navigator.language || "uk").slice(0, 2).toLowerCase();
    return nav === "en" ? "en" : "uk";
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLang(detectInitialLang());

    document.querySelectorAll(".legal-lang__btn").forEach((btn) => {
      btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
    });
  });
})();
