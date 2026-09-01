/* ==========================================================================
   Oversight — site behaviour
   Vanilla JS, no dependencies. Safe to load with `defer` on every page.
   ========================================================================== */
(function () {
  "use strict";

  var DICT = window.OVERSIGHT_I18N || { ar: {}, en: {} };
  var STORE_KEY = "oversight:lang";
  var DEFAULT_LANG = "ar";

  /* ---------------------------------------------------------------- helpers */
  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(sel));
  }
  function readStore() {
    try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; }
  }
  function writeStore(v) {
    try { localStorage.setItem(STORE_KEY, v); } catch (e) { /* private mode */ }
  }

  /* ================================================================
     1. Language
     ================================================================ */
  function resolveInitialLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl === "ar" || fromUrl === "en") return fromUrl;
    var stored = readStore();
    if (stored === "ar" || stored === "en") return stored;
    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    var table = DICT[lang] || {};
    var html = document.documentElement;

    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    $$("[data-i18n]").forEach(function (el) {
      var v = table[el.getAttribute("data-i18n")];
      if (typeof v === "string") el.textContent = v;
    });
    $$("[data-i18n-html]").forEach(function (el) {
      var v = table[el.getAttribute("data-i18n-html")];
      if (typeof v === "string") el.innerHTML = v;
    });
    $$("[data-i18n-placeholder]").forEach(function (el) {
      var v = table[el.getAttribute("data-i18n-placeholder")];
      if (typeof v === "string") el.setAttribute("placeholder", v);
    });
    $$("[data-i18n-aria]").forEach(function (el) {
      var v = table[el.getAttribute("data-i18n-aria")];
      if (typeof v === "string") el.setAttribute("aria-label", v);
    });
    $$("[data-i18n-content]").forEach(function (el) {
      var v = table[el.getAttribute("data-i18n-content")];
      if (typeof v === "string") el.setAttribute("content", v);
    });
    $$("[data-i18n-alt]").forEach(function (el) {
      var v = table[el.getAttribute("data-i18n-alt")];
      if (typeof v === "string") el.setAttribute("alt", v);
    });
    $$("[data-i18n-title]").forEach(function (el) {
      var v = table[el.getAttribute("data-i18n-title")];
      if (typeof v === "string") {
        if (el.tagName === "TITLE") el.textContent = v;
        else el.setAttribute("title", v);
      }
    });

    $$("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-btn") === lang));
    });

    writeStore(lang);
    document.dispatchEvent(new CustomEvent("oversight:langchange", { detail: { lang: lang } }));
  }

  function initLang() {
    applyLang(resolveInitialLang());
    $$("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang-btn"));
      });
    });
  }

  /* ================================================================
     2. Header — sticky state + mobile nav
     ================================================================ */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $(".nav-toggle");
    var nav = $("#primary-nav");
    if (!toggle || !nav) return;

    var setOpen = function (open) {
      nav.setAttribute("data-open", String(open));
      toggle.setAttribute("aria-expanded", String(open));
    };

    // Mobile nav starts closed; on desktop CSS ignores the attribute entirely.
    setOpen(false);

    toggle.addEventListener("click", function () {
      setOpen(nav.getAttribute("data-open") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (window.innerWidth > 1080) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
  }

  /* ================================================================
     3. Tabs (concern cards + inspection plan)
     Markup contract:
       <div data-tabs>
         <button data-tab="id" aria-selected>…</button>
         <div data-panel="id" hidden>…</div>
       </div>
     ================================================================ */
  function initTabs() {
    $$("[data-tabs]").forEach(function (group) {
      var tabs = $$("[data-tab]", group);
      var panels = $$("[data-panel]", group);
      if (!tabs.length) return;

      var select = function (id) {
        tabs.forEach(function (t) {
          t.setAttribute("aria-selected", String(t.getAttribute("data-tab") === id));
        });
        panels.forEach(function (p) {
          p.hidden = p.getAttribute("data-panel") !== id;
        });
      };

      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () {
          select(tab.getAttribute("data-tab"));
        });
        tab.addEventListener("keydown", function (e) {
          var next = null;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[i + 1] || tabs[0];
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[i - 1] || tabs[tabs.length - 1];
          if (!next) return;
          e.preventDefault();
          next.focus();
          select(next.getAttribute("data-tab"));
        });
      });

      var initial = tabs.find(function (t) { return t.getAttribute("aria-selected") === "true"; }) || tabs[0];
      select(initial.getAttribute("data-tab"));
    });
  }

  /* ================================================================
     4. FAQ accordion
     ================================================================ */
  function initFaq() {
    $$(".faq").forEach(function (faq) {
      var items = $$(".faq__item", faq);
      items.forEach(function (item) {
        var btn = $(".faq__q", item);
        var panel = $(".faq__a", item);
        if (!btn || !panel) return;

        btn.setAttribute("aria-expanded", item.getAttribute("data-open") === "true" ? "true" : "false");

        btn.addEventListener("click", function () {
          var willOpen = item.getAttribute("data-open") !== "true";
          items.forEach(function (other) {
            other.setAttribute("data-open", "false");
            var b = $(".faq__q", other);
            if (b) b.setAttribute("aria-expanded", "false");
          });
          if (willOpen) {
            item.setAttribute("data-open", "true");
            btn.setAttribute("aria-expanded", "true");
          }
        });
      });
    });
  }

  /* ================================================================
     5. Thermal before/after comparison
     ================================================================ */
  function initCompare() {
    $$(".compare").forEach(function (box) {
      var range = $(".compare__range", box);
      if (!range) return;
      var set = function (v) { box.style.setProperty("--pos", v + "%"); };
      set(range.value || 50);
      range.addEventListener("input", function () { set(range.value); });
    });
  }

  /* ================================================================
     6. Horizontal rail (testimonials)
     ================================================================ */
  function initRails() {
    $$("[data-rail]").forEach(function (wrap) {
      var rail = $(".rail", wrap);
      var dotsBox = $(".rail-dots", wrap);
      if (!rail) return;

      var cards = $$(":scope > *", rail);
      var dots = [];

      if (dotsBox) {
        dotsBox.innerHTML = "";
        cards.forEach(function (_, i) {
          var d = document.createElement("button");
          d.type = "button";
          d.className = "rail-dot";
          d.setAttribute("aria-label", String(i + 1));
          d.addEventListener("click", function () { scrollToIndex(i); });
          dotsBox.appendChild(d);
          dots.push(d);
        });
      }

      function currentIndex() {
        var mid = rail.scrollLeft + rail.clientWidth / 2;
        var best = 0, bestDist = Infinity;
        cards.forEach(function (c, i) {
          var centre = c.offsetLeft + c.offsetWidth / 2;
          var d = Math.abs(centre - mid);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        return best;
      }
      function syncDots() {
        var i = currentIndex();
        dots.forEach(function (d, j) { d.setAttribute("aria-current", String(j === i)); });
      }
      function scrollToIndex(i) {
        var c = cards[Math.max(0, Math.min(cards.length - 1, i))];
        if (!c) return;
        rail.scrollTo({
          left: c.offsetLeft - (rail.clientWidth - c.offsetWidth) / 2,
          behavior: "smooth"
        });
      }

      // In RTL the "next" button must move toward the visually-following card,
      // which is a *decreasing* scrollLeft in most engines. Index maths avoids
      // having to reason about the sign at all.
      var prevBtn = $("[data-rail-prev]", wrap);
      var nextBtn = $("[data-rail-next]", wrap);
      if (prevBtn) prevBtn.addEventListener("click", function () { scrollToIndex(currentIndex() - 1); });
      if (nextBtn) nextBtn.addEventListener("click", function () { scrollToIndex(currentIndex() + 1); });

      var t;
      rail.addEventListener("scroll", function () {
        clearTimeout(t);
        t = setTimeout(syncDots, 90);
      }, { passive: true });
      syncDots();
    });
  }

  /* ================================================================
     7. Work filters
     ================================================================ */
  function initFilters() {
    $$("[data-filter-group]").forEach(function (group) {
      var btns = $$("[data-filter]", group);
      var targetSel = group.getAttribute("data-filter-group");
      var items = $$(targetSel + " [data-cat]");

      btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var cat = btn.getAttribute("data-filter");
          btns.forEach(function (b) { b.setAttribute("aria-selected", String(b === btn)); });
          items.forEach(function (item) {
            var show = cat === "all" || item.getAttribute("data-cat") === cat;
            item.hidden = !show;
          });
        });
      });
    });
  }

  /* ================================================================
     8. Contact form (front-end only — wire to your endpoint)
     ================================================================ */
  function initForms() {
    $$("[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var status = $(".form-status", form);
        if (status) {
          status.hidden = false;
          status.setAttribute("role", "status");
        }
        form.reset();
      });
    });
  }

  /* ================================================================
     9. Reveal on scroll
     ================================================================ */
  function initReveal() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ================================================================
     10. Year stamp
     ================================================================ */
  function initYear() {
    $$("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------------------------------------------------------------- boot */
  function boot() {
    initLang();
    initHeader();
    initTabs();
    initFaq();
    initCompare();
    initRails();
    initFilters();
    initForms();
    initReveal();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
