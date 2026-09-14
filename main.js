(() => {
  "use strict";

  const burger = document.querySelector(".burger");
  const overlay = document.getElementById("mobileOverlay");
  const menu = document.getElementById("mobileMenu");

  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    overlay.hidden = !open;
    menu.hidden = !open;
  };

  const isOpen = () => !menu.hidden;

  burger.addEventListener("click", () => setMenu(!isOpen()));
  overlay.addEventListener("click", () => setMenu(false));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720 && isOpen()) setMenu(false);
  });

  // ——— Hero views: Modes / Features / Pro — akurat dari nobody0x.com ———
  const VIEWS = {
    modes: {
      trust: "Cloud chat workspace",
      headline1: "DSOC AI",
      phrases: ["Security Workspace", "Daily Chat", "Security Planner"],
      tags: ["Code · logs · patches", "Talk · voice · brainstorm", "Plan · approve · execute"],
      subhead: "Chat in the browser with file attachments, streaming answers, and voice. Switch between Security Workspace, Daily Chat, and Security Planner without leaving your session.",
      ctaText: "Sign in with email",
      ctaHref: "https://nobody0x.com/login",
      stats: [
        { icon: "<", target: "3", decimals: 0, suffix: "", label: "Active Modes" },
        { icon: "$", target: "16.50", decimals: 2, suffix: "", label: "Pro / month USD" },
        { icon: "*", target: "8.33", decimals: 2, suffix: "", label: "Topup Start USD" },
        { icon: "#", target: "24", decimals: 0, suffix: "/7", label: "Cloud Workspace" }
      ]
    },
    features: {
      trust: "Same workspace after login",
      headline1: "Workspace",
      phrases: ["File Attach", "Live Streaming", "Voice Call"],
      tags: ["Sidebar history", "Planner gate", "No install"],
      subhead: "Sidebar history (every session saved), file attach PNG/PDF/code, streaming answers, voice mic + Daily voice call, and planner artifact preview with Continue/Cancel gate — all in the browser.",
      ctaText: "See the modes",
      ctaHref: "https://nobody0x.com/#fitur",
      stats: [
        { icon: "<", target: "5", decimals: 0, suffix: "", label: "Core Features" },
        { icon: "%", target: "100", decimals: 0, suffix: "%", label: "Browser Native" },
        { icon: "*", target: "3", decimals: 0, suffix: "", label: "Chat Modes" },
        { icon: "#", target: "24", decimals: 0, suffix: "/7", label: "Always On" }
      ]
    },
    pro: {
      trust: "Pro for daily output",
      headline1: "Go Pro",
      phrases: ["USD 16.50 / mo", "USD 19.00 → 16.50", "USD 8.33 min"],
      tags: ["No per-message charge", "Daily fair use", "Crypto / Pakasir"],
      subhead: "DSOC Pro USD 19.00 → USD 16.50/month — longer sessions, no per-message deduction, daily response-token fair use across all 3 modes. Token Topup from USD 8.33 (crypto, Pakasir local) — no Pro required, Telegram verification required.",
      ctaText: "Start Pro — $16.50",
      ctaHref: "https://nobody0x.com/login",
      stats: [
        { icon: "$", target: "16.50", decimals: 2, suffix: "", label: "Pro / month" },
        { icon: "*", target: "8.33", decimals: 2, suffix: "", label: "Topup Min USD" },
        { icon: "#", target: "19.00", decimals: 2, suffix: "", label: "Was $19.00" },
        { icon: "<", target: "1", decimals: 0, suffix: "", label: "Workspace" }
      ]
    },
    faq: {
      trust: "Got questions?",
      headline1: "FAQ",
      phrases: ["Three modes?", "Attach files?", "Topup?"],
      tags: ["Modes", "Files", "Tokens"],
      subhead: "Jawaban cepat — semua diambil langsung dari nobody0x.com",
      ctaText: "Ask in Workspace",
      ctaHref: "https://nobody0x.com/login",
      stats: [
        { icon: "?", target: "8", decimals: 0, suffix: "", label: "Questions" },
        { icon: "#", target: "3", decimals: 0, suffix: "", label: "Modes" },
        { icon: "*", target: "8.33", decimals: 2, suffix: "", label: "Topup" },
        { icon: "<", target: "1", decimals: 0, suffix: "", label: "Workspace" }
      ]
    }
  };

  let currentView = "modes";
  let HEADLINE1 = VIEWS.modes.headline1;
  let PHRASES = [...VIEWS.modes.phrases];
  let TAGS = [...VIEWS.modes.tags];

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Nav purple indicator — slides on hover, snaps to active
  (() => {
    const pill = document.querySelector(".nav-pill");
    const indicator = pill?.querySelector(".nav-indicator");
    const links = pill ? Array.from(pill.querySelectorAll(".nav-link")) : [];
    if (!pill || !indicator || !links.length) return;
    pill.classList.add("has-indicator");
    const moveTo = (el) => {
      if (!el) return;
      indicator.style.left = el.offsetLeft + "px";
      indicator.style.width = el.offsetWidth + "px";
      links.forEach((l) => l.classList.toggle("is-indicator-active", l === el));
    };
    const active = () => pill.querySelector(".nav-link.active") || links[0];
    requestAnimationFrame(() => moveTo(active()));
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => moveTo(link));
      link.addEventListener("focus", () => moveTo(link));
      link.addEventListener("click", (e) => {
        const view = link.dataset.view;
                if (VIEWS[view]) e.preventDefault();
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        moveTo(link);
      });
    });
    pill.addEventListener("mouseleave", () => moveTo(active()));
    window.addEventListener("resize", () => moveTo(active()));
  })();

  // Mobile nav purple indicator — slides vertically on hover
  (() => {
    const menuEl = document.getElementById("mobileMenu");
    const indicator = menuEl?.querySelector(".m-indicator");
    const links = menuEl ? Array.from(menuEl.querySelectorAll(".m-link")) : [];
    if (!menuEl || !indicator || !links.length) return;
    menuEl.classList.add("has-indicator");
    const moveTo = (el) => {
      if (!el) return;
      indicator.style.top = el.offsetTop + "px";
      indicator.style.height = el.offsetHeight + "px";
      links.forEach((l) => l.classList.toggle("is-indicator-active", l === el));
    };
    const active = () => menuEl.querySelector(".m-link.active") || links[0];
    const update = () => { if (menuEl.hidden) return; requestAnimationFrame(() => moveTo(active())); };
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => moveTo(link));
      link.addEventListener("focus", () => moveTo(link));
      link.addEventListener("click", (e) => {
        const view = link.dataset.view;
                if (VIEWS[view]) e.preventDefault();
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        moveTo(link);
      });
    });
    menuEl.addEventListener("mouseleave", () => moveTo(active()));
    new MutationObserver(update).observe(menuEl, { attributes: true, attributeFilter: ["hidden"] });
    window.addEventListener("resize", update);
    if (!menuEl.hidden) update();
  })();

  // Stat count-up helper
  const runStats = () => {
    const els = Array.from(document.querySelectorAll(".stat-value"));
    const vals = els.map((el, i) => ({
      el,
      target: parseFloat(el.dataset.target),
      decimals: parseInt(el.dataset.decimals, 10) || 0,
      suffix: el.dataset.suffix || "",
      delay: 80 + i * 40,
      duration: 900 + i * 60
    }));
    vals.forEach((v) => {
      v.el.textContent = (0).toFixed(v.decimals) + v.suffix;
      setTimeout(() => {
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / v.duration, 1);
          v.el.textContent = (v.target * easeOutCubic(p)).toFixed(v.decimals) + v.suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, v.delay);
    });
  };

  if (!reduced) {
    let started = false;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && !started) { started = true; runStats(); io.unobserve(e.target); }
      }),
      { threshold: 0.25 }
    );
    const statsEl = document.querySelector(".stats");
    if (statsEl) io.observe(statsEl);
  }

  // Typewriter loop: headline retypes each cycle, line 2 + tagline rotate through 3 stages
  if (!reduced) {
    const l1 = document.querySelector(".headline .l1");
    const l2 = document.querySelector(".headline .l2");
    const tagLine = document.querySelector(".tagline");
    const t1 = l1.querySelector(".txt");
    const t2 = l2.querySelector(".txt");
    const tTag = tagLine.querySelector(".txt");
    const caret = document.createElement("span");
    caret.className = "caret";
    caret.setAttribute("aria-hidden", "true");

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const focus = (line) => {
      if (caret.parentNode !== line) { caret.remove(); line.appendChild(caret); }
    };
    const type = async (line, txt, text, speed) => {
      focus(line);
      for (let i = 1; i <= text.length; i++) { txt.textContent = text.slice(0, i); await sleep(speed); }
    };
    const erase = async (line, txt, speed) => {
      focus(line);
      while (txt.textContent.length) { txt.textContent = txt.textContent.slice(0, -1); await sleep(speed); }
    };

    (async () => {
      const TYPE = 62, DEL = 24;
      t1.textContent = "";
      t2.textContent = "";
      await sleep(650);
      for (;;) {
        await type(l1, t1, HEADLINE1, TYPE);
        for (let i = 0; i < PHRASES.length; i++) {
          await type(l2, t2, PHRASES[i], TYPE);
          await type(tagLine, tTag, TAGS[i], TYPE - 12);
          await sleep(2400);
          await erase(tagLine, tTag, DEL);
        }
        await erase(l2, t2, DEL);
        await erase(l1, t1, DEL);
      }
    })();
  } else {
    // reduced-motion: show static first view
    const l1t = document.querySelector(".headline .l1 .txt");
    const l2t = document.querySelector(".headline .l2 .txt");
    const tagt = document.querySelector(".tagline .txt");
    if (l1t) l1t.textContent = VIEWS.modes.headline1;
    if (l2t) l2t.textContent = VIEWS.modes.phrases[0];
    if (tagt) tagt.textContent = VIEWS.modes.tags[0];
  }

  // View switcher — distinct layouts, not flat text swap
  const viewEls = {
    modes: document.getElementById("view-modes"),
    features: document.getElementById("view-features"),
    pro: document.getElementById("view-pro"),
    faq: document.getElementById("view-faq"),
    privacy: document.getElementById("view-privacy"),
    terms: document.getElementById("view-terms"),
    contact: document.getElementById("view-contact"),
    code: document.getElementById("view-code")
  };

  const applyView = (name) => {
    if (!viewEls[name] || viewEls[name].classList.contains("is-active")) return;
    Object.values(viewEls).forEach((el) => el && el.classList.remove("is-active"));
    viewEls[name].classList.add("is-active");
    if (VIEWS[name]) {
      HEADLINE1 = VIEWS[name].headline1;
      PHRASES = [...VIEWS[name].phrases];
      TAGS = [...VIEWS[name].tags];
    }
    if (name === "modes" && !reduced) setTimeout(() => runStats(), 400);
  };

  document.querySelectorAll("[data-view]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const view = a.dataset.view;
            if (viewEls[view]) {
        e.preventDefault();
        document.querySelectorAll("[data-view]").forEach((el) => {
          if (false) return;
          el.classList.toggle("active", el.dataset.view === view);
        });
        const dActive = document.querySelector('.nav-pill [data-view="' + view + '"]');
        const mActive = document.querySelector('.mobile-menu [data-view="' + view + '"]');
        const dPill = document.querySelector(".nav-pill");
        const dInd = dPill?.querySelector(".nav-indicator");
        if (dActive && dInd) {
          dInd.style.left = dActive.offsetLeft + "px";
          dInd.style.width = dActive.offsetWidth + "px";
          dPill.querySelectorAll(".nav-link").forEach((l) => l.classList.toggle("is-indicator-active", l === dActive));
        }
        const mMenu = document.getElementById("mobileMenu");
        const mInd = mMenu?.querySelector(".m-indicator");
        if (mActive && mInd && !mMenu.hidden) {
          mInd.style.top = mActive.offsetTop + "px";
          mInd.style.height = mActive.offsetHeight + "px";
          mMenu.querySelectorAll(".m-link").forEach((l) => l.classList.toggle("is-indicator-active", l === mActive));
        }
        // mobile: satu halaman panjang — scroll ke section (code/terms/privacy/contact dikecualikan); desktop: tab switch
        if (window.matchMedia("(max-width: 720px)").matches) {
          if (view === "code" || view === "terms" || view === "privacy" || view === "contact") {
            applyView(view);
          } else {
            viewEls.code?.classList.remove("is-active");
            viewEls.terms?.classList.remove("is-active");
            viewEls.privacy?.classList.remove("is-active");
            viewEls.contact?.classList.remove("is-active");
          }
          requestAnimationFrame(() => viewEls[view].scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }));
        } else {
          applyView(view);
        }
        const b = document.querySelector(".burger");
        const ov = document.getElementById("mobileOverlay");
        const mm = document.getElementById("mobileMenu");
        if (mm && !mm.hidden) {
          document.body.classList.remove("menu-open");
          b?.setAttribute("aria-expanded", "false");
          if (ov) ov.hidden = true;
          mm.hidden = true;
        }
      }
    });
  });
})();