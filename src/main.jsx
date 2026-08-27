import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

/* ====== CONFIG ====== */
const EMAIL = "hello@mar24.dev";
// 1) Sign up free at https://formspree.io  2) Create a form  3) paste your ID below.
//    e.g. "xldbnqwe"  ->  endpoint becomes https://formspree.io/f/xldbnqwe
const FORMSPREE_ID = "xeaqjzak";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

/* ====== Icons ====== */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
const SunIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>);
const MoonIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>);
const ArrowUpIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>);
const SearchIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-3.5-3.5" /></svg>);
const HomeIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" /></svg>);
const MailIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
const BriefcaseIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>);
const UserIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>);
const MenuIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>);
const CloseIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>);

const TECH = ["React", "Node.js", "Automation", "Azure", "Linux", "Python", "REST APIs", "Identity", "SharePoint", "CI/CD"];

/* ====== Count-up ====== */
function CountUp({ end, plus = false }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const dur = 1300, t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    io.observe(node);
    return () => io.disconnect();
  }, [end]);
  return <b ref={ref}>{val}{plus ? "+" : ""}</b>;
}

/* ====== Command Palette ====== */
function CommandPalette({ open, onClose, actions }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  const itemRefs = useRef([]);

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => { setSel(0); }, [q]);

  // Keep the highlighted item visible as you arrow up/down
  useEffect(() => {
    itemRefs.current[sel]?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
      else if (e.key === "Enter") { e.preventDefault(); filtered[sel]?.run(); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, sel, onClose]);

  if (!open) return null;
  return (
    <div className="cmdkOverlay" onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdkInput"
          placeholder="Search sections, links, actions…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="cmdkList">
          {filtered.length === 0 && <div className="cmdkEmpty">No results for "{q}"</div>}
          {filtered.map((a, i) => (
            <div
              key={a.label}
              ref={(el) => (itemRefs.current[i] = el)}
              className={`cmdkItem ${i === sel ? "sel" : ""}`}
              onMouseEnter={() => setSel(i)}
              onClick={() => { a.run(); onClose(); }}
            >
              <span className="cmdkIcon">{a.icon}</span>
              {a.label}
              <small>{a.hint}</small>
            </div>
          ))}
        </div>
        <div className="cmdkFoot">
          <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [botField, setBotField] = useState(""); // honeypot — real users never fill this
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Theme persistence */
  useEffect(() => { const s = localStorage.getItem("mar24-theme"); if (s) setTheme(s); }, []);
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("mar24-theme", theme); }, [theme]);

  /* Scroll progress */
  useEffect(() => {
    const bar = document.querySelector(".progress");
    const onScroll = () => {
      const h = document.documentElement;
      if (bar) bar.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reveal on scroll — triggers early (rootMargin) so content never lags on mobile */
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("inview"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("inview"); io.unobserve(entry.target); } });
    }, { threshold: 0, rootMargin: "0px 0px -12% 0px" });
    nodes.forEach((n) => {
      // If it's already in/above the viewport on load, reveal immediately
      if (n.getBoundingClientRect().top < window.innerHeight * 0.9) n.classList.add("inview");
      else io.observe(n);
    });
    // Safety net: guarantee everything is visible shortly after load
    const failsafe = setTimeout(() => nodes.forEach((n) => n.classList.add("inview")), 1200);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  /* Back-to-top + active section */
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      const ids = ["work", "about", "contact"];
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Magnetic buttons */
  useEffect(() => {
    const magnets = document.querySelectorAll(".btn");
    const strength = 22;
    const handlers = [];
    magnets.forEach((mag) => {
      const move = (e) => {
        const r = mag.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
        const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
        mag.style.transform = `translate(${x}px, ${y}px)`;
      };
      const reset = () => { mag.style.transform = "translate(0,0)"; };
      mag.addEventListener("pointermove", move);
      mag.addEventListener("pointerleave", reset);
      handlers.push({ mag, move, reset });
    });
    return () => handlers.forEach(({ mag, move, reset }) => { mag.removeEventListener("pointermove", move); mag.removeEventListener("pointerleave", reset); });
  }, []);

  /* ⌘K / Ctrl+K to open palette */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmdOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Close mobile menu on outside tap or Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => { if (!e.target.closest(".header")) setMenuOpen(false); };
    const onEsc = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("pointerdown", onDown); window.removeEventListener("keydown", onEsc); };
  }, [menuOpen]);

  /* Copy email */
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true); setToast(true);
      setTimeout(() => setCopied(false), 1600);
      setTimeout(() => setToast(false), 2200);
    } catch { window.location.href = `mailto:${EMAIL}`; }
  };

  const goto = (id) => {
    if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* Form submit -> Formspree (graceful mailto fallback if not configured) */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Honeypot: if this hidden field is filled, it's a bot — silently pretend success.
    if (botField) { setStatus("sent"); return; }
    if (FORMSPREE_ID === "YOUR_FORM_ID") {
      const body = encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`);
      window.location.href = `mailto:${EMAIL}?subject=Portfolio%20contact&body=${body}`;
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _gotcha: botField }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  };

  const actions = [
    { label: "Go to top", hint: "nav", icon: <HomeIcon />, run: () => goto("top") },
    { label: "View Work", hint: "nav", icon: <BriefcaseIcon />, run: () => goto("work") },
    { label: "About me", hint: "nav", icon: <UserIcon />, run: () => goto("about") },
    { label: "Contact", hint: "nav", icon: <MailIcon />, run: () => goto("contact") },
    { label: "Copy email address", hint: "action", icon: <MailIcon />, run: copyEmail },
    { label: "Toggle light / dark", hint: "theme", icon: theme === "dark" ? <SunIcon /> : <MoonIcon />, run: () => setTheme(theme === "dark" ? "light" : "dark") },
    { label: "Open GitHub", hint: "link", icon: <GitHubIcon />, run: () => window.open("https://github.com/", "_blank") },
    { label: "Open StreamPulse", hint: "link", icon: <BriefcaseIcon />, run: () => window.open("https://stream-pulse-beta.vercel.app/", "_blank") },
  ];

  return (
    <div className="app">
      <div className="progress" />
      <div className="grain" />

      <header className="header">
        <a href="/" className="logo">MAR24<span>.DEV</span></a>
        <nav className="nav">
          <a href="#work" className={`navLink ${active === "work" ? "active" : ""}`}>Work</a>
          <a href="#about" className={`navLink ${active === "about" ? "active" : ""}`}>About</a>
          <a href="#contact" className={`navLink ${active === "contact" ? "active" : ""}`}>Contact</a>
          <a href="https://github.com/" className="navLink" target="_blank" rel="noreferrer">GitHub</a>
          <button className="kbdHint" onClick={() => setCmdOpen(true)} aria-label="Open command palette">⌘K</button>
          <button className="iconBtn themeToggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="iconBtn menuBtn" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>

        <div className={`mobileMenu ${menuOpen ? "open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub ↗</a>
        </div>
      </header>

      <main className="main">
        <section className="intro">
          <span className="eyebrow reveal d1"><i className="statusDot" />Software · Systems · Product</span>
          <h1 className="reveal d2">Design.<br />Build.<br /><span className="shimmer">Ship.</span></h1>
          <p className="introText reveal d3">Software, automation and systems — engineered to be fast, clean and genuinely useful.</p>
          <div className="introCtas reveal d4">
            <a href="#work" className="btn btnPrimary">View work ↗</a>
            <button className="btn btnGhost" onClick={copyEmail}>{copied ? "Copied ✓" : "Copy email"}</button>
          </div>
        </section>
      </main>

      <div className="marquee reveal d5">
        <div className="marqueeTrack">
          <span>{TECH.join(" ")}</span>
          <span>{TECH.join(" ")}</span>
        </div>
      </div>

      <main className="main">
        <section className="work" id="work" data-reveal>
          <div className="sectionHeader"><span>Selected Work</span><span>01 / 02</span></div>

          <a className="projectCard" href="https://stream-pulse-beta.vercel.app/" target="_blank" rel="noreferrer">
            <div className="projectTop"><span className="projectNumber">01</span><span className="live"><i />Live</span></div>
            <div className="projectContent">
              <div>
                <span className="projectMeta">SaaS · Streaming · React</span>
                <h2>StreamPulse</h2>
                <p>A modern streaming companion for creators — bringing stream controls, OBS connectivity and live system information into one clean interface.</p>
                <div className="tags"><span className="tag">React</span><span className="tag">OBS</span><span className="tag">Realtime</span></div>
              </div>
              <div className="projectAction">View project<strong>↗</strong></div>
            </div>
            <div className="projectFooter"><span>Public Build</span><span>StreamPulse</span></div>
          </a>

          <a className="projectCard" href="https://github.com/" target="_blank" rel="noreferrer">
            <div className="projectTop"><span className="projectNumber">02</span><span className="live soon"><i />In Progress</span></div>
            <div className="projectContent">
              <div>
                <span className="projectMeta">Automation · Tooling · Node</span>
                <h2>FlowKit</h2>
                <p>A lightweight automation toolkit for onboarding, offboarding and identity workflows — turning repetitive tasks into one-click actions with a clean audit trail.</p>
                <div className="tags"><span className="tag">Node</span><span className="tag">Automation</span><span className="tag">IAM</span></div>
              </div>
              <div className="projectAction">View project<strong>↗</strong></div>
            </div>
            <div className="projectFooter"><span>Private Build</span><span>FlowKit</span></div>
          </a>
        </section>

        <section className="about" id="about" data-reveal>
          <div className="sectionHeader"><span>About</span><span>Who I Am</span></div>
          <div className="aboutGrid">
            <div>
              <h2>Simple ideas.<br /><span>Well built.</span></h2>
              <div className="stats">
                <div className="stat"><CountUp end={5} plus /><span>Years</span></div>
                <div className="stat"><CountUp end={20} plus /><span>Projects</span></div>
                <div className="stat"><b>∞</b><span>Curiosity</span></div>
              </div>
            </div>
            <p>I enjoy turning ideas into software people can actually use. My work sits between systems, automation, product and interface design — with a focus on keeping complicated things simple.</p>
          </div>
        </section>

        <section className="contactSection" id="contact" data-reveal>
          <div className="sectionHeader"><span>Contact</span><span>Let's Talk</span></div>
          <div className="contactGrid">
            <div>
              <h2>Have a project<br /><span>in mind?</span></h2>
              <p className="contactBlurb">Whether it's an idea, a problem to solve or a build you want to ship — drop a message and I'll get back to you.</p>
              <button className={`contactEmail ${copied ? "copied" : ""}`} onClick={copyEmail}>
                {copied ? "Copied ✓" : `${EMAIL} ⧉`}
              </button>
            </div>

            {status === "sent" ? (
              <div className="formSent">
                <div className="formSentIcon">✓</div>
                <h3>Thanks — message sent!</h3>
                <p>I'll get back to you soon. You can also reach me directly at {EMAIL}.</p>
              </div>
            ) : (
              <form className="contactForm" onSubmit={handleSubmit}>
                {/* Honeypot — hidden from humans, catches bots. Do not remove. */}
                <input
                  type="text"
                  className="hp"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
                <label><span>Name</span>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
                </label>
                <label><span>Email</span>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                </label>
                <label><span>Message</span>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project…" />
                </label>
                {status === "error" && <span className="formError">Something went wrong. Please try again or email me directly.</span>}
                <button type="submit" className="formSubmit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message ↗"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <button className={`toTop ${showTop ? "show" : ""}`} onClick={() => goto("top")} aria-label="Back to top"><ArrowUpIcon /></button>

      {/* Section progress rail (desktop) */}
      <div className="rail" aria-hidden="true">
        {[
          { id: "work", label: "Work" },
          { id: "about", label: "About" },
          { id: "contact", label: "Contact" },
        ].map((s) => (
          <button
            key={s.id}
            className={`railDot ${active === s.id ? "on" : ""}`}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="railLabel">{s.label}</span>
          </button>
        ))}
      </div>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} actions={actions} />

      <div className={`toast ${toast ? "show" : ""}`}><b>✓</b>Email copied to clipboard</div>

      <footer className="footer">
        <span>© 2026 MAR24.DEV</span>
        <div>
          <a href="https://github.com/" target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
          <button className="contactEmail" onClick={copyEmail}>{EMAIL}</button>
        </div>
      </footer>
    </div>
  );
}

/* Console greeting — a little hello for the curious devs who open DevTools */
try {
  const brand = "color:#a78bfa;font-weight:bold;font-size:16px;line-height:1.5";
  const soft = "color:#85878c;font-size:13px;line-height:1.6";
  const mail = "color:#70c995;font-weight:bold;font-size:14px";
  console.log(
    "%cMAR24.DEV — Design. Build. Ship.\n\n%cLike what you see under the hood? Let's talk:\n%c📧 hello@mar24.dev\n",
    brand, soft, mail
  );
} catch (e) { /* no-op */ }

createRoot(document.getElementById("root")).render(<App />);
