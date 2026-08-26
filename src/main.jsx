import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

const TECH = ["React", "Node.js", "Automation", "Azure", "Linux", "Python", "REST APIs", "Identity", "SharePoint", "CI/CD"];

// Animated count-up number
function CountUp({ end, suffix = "", plus = false }) {
  const [val, setVal] = useState(0);
  const ref = React.useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const dur = 1300;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    io.observe(node);
    return () => io.disconnect();
  }, [end]);
  return <b ref={ref}>{val}{plus ? "+" : ""}{suffix}</b>;
}

function App() {
  const [theme, setTheme] = useState("dark");

  // Apply + persist theme
  useEffect(() => {
    const saved = localStorage.getItem("mar24-theme");
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mar24-theme", theme);
  }, [theme]);

  // Scroll progress bar
  useEffect(() => {
    const bar = document.querySelector(".progress");
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (bar) bar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal sections as they enter the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("inview");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Magnetic buttons
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
    return () => handlers.forEach(({ mag, move, reset }) => {
      mag.removeEventListener("pointermove", move);
      mag.removeEventListener("pointerleave", reset);
    });
  }, []);

  return (
    <div className="app">
      <div className="progress" />
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />
      <div className="grain" />

      <header className="header">
        <a href="/" className="logo">MAR24<span>.DEV</span></a>
        <nav className="nav">
          <a href="#work" className="navLink">Work</a>
          <a href="#about" className="navLink">About</a>
          <a href="https://github.com/" className="navLink" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:hello@mar24.dev" className="contact">Contact<span>↗</span></a>
          <button
            className="themeToggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>
      </header>

      <main className="main">
        {/* Intro */}
        <section className="intro">
          <span className="eyebrow reveal d1"><i className="statusDot" />Software · Systems · Product</span>
          <h1 className="reveal d2">
            Design.<br />
            Build.<br />
            <span className="shimmer">Ship.</span>
          </h1>
          <p className="introText reveal d3">
            Software, automation and systems — engineered to be fast, clean and
            genuinely useful.
          </p>
          <div className="introCtas reveal d4">
            <a href="#work" className="btn btnPrimary">View work ↗</a>
            <a href="mailto:hello@mar24.dev" className="btn btnGhost">Get in touch</a>
          </div>
        </section>
      </main>

      {/* Tech marquee (full width) */}
      <div className="marquee reveal d5">
        <div className="marqueeTrack">
          <span>{TECH.join(" ")}</span>
          <span>{TECH.join(" ")}</span>
        </div>
      </div>

      <main className="main">
        {/* Work */}
        <section className="work" id="work" data-reveal>
          <div className="sectionHeader">
            <span>Selected Work</span>
            <span>01 / 02</span>
          </div>

          <a
            className="projectCard"
            href="https://stream-pulse-beta.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="projectTop">
              <span className="projectNumber">01</span>
              <span className="live"><i />Live</span>
            </div>

            <div className="projectContent">
              <div>
                <span className="projectMeta">SaaS · Streaming · React</span>
                <h2>StreamPulse</h2>
                <p>
                  A modern streaming companion for creators — bringing stream
                  controls, OBS connectivity and live system information into one
                  clean interface.
                </p>
                <div className="tags">
                  <span className="tag">React</span>
                  <span className="tag">OBS</span>
                  <span className="tag">Realtime</span>
                </div>
              </div>
              <div className="projectAction">
                View project
                <strong>↗</strong>
              </div>
            </div>

            <div className="projectFooter">
              <span>Public Build</span>
              <span>StreamPulse</span>
            </div>
          </a>

          <a
            className="projectCard"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="projectTop">
              <span className="projectNumber">02</span>
              <span className="live soon"><i />In Progress</span>
            </div>

            <div className="projectContent">
              <div>
                <span className="projectMeta">Automation · Tooling · Node</span>
                <h2>FlowKit</h2>
                <p>
                  A lightweight automation toolkit for onboarding, offboarding and
                  identity workflows — turning repetitive tasks into one-click
                  actions with a clean audit trail.
                </p>
                <div className="tags">
                  <span className="tag">Node</span>
                  <span className="tag">Automation</span>
                  <span className="tag">IAM</span>
                </div>
              </div>
              <div className="projectAction">
                View project
                <strong>↗</strong>
              </div>
            </div>

            <div className="projectFooter">
              <span>Private Build</span>
              <span>FlowKit</span>
            </div>
          </a>
        </section>

        {/* About */}
        <section className="about" id="about" data-reveal>
          <div className="sectionHeader">
            <span>About</span>
            <span>Who I Am</span>
          </div>
          <div className="aboutGrid">
            <div>
              <h2>Simple ideas.<br /><span>Well built.</span></h2>
              <div className="stats">
                <div className="stat"><CountUp end={5} plus /><span>Years</span></div>
                <div className="stat"><CountUp end={20} plus /><span>Projects</span></div>
                <div className="stat"><b>∞</b><span>Curiosity</span></div>
              </div>
            </div>
            <p>
              I enjoy turning ideas into software people can actually use. My work
              sits between systems, automation, product and interface design — with
              a focus on keeping complicated things simple.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 MAR24.DEV</span>
        <div>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <GitHubIcon /> GitHub
          </a>
          <a href="mailto:hello@mar24.dev">hello@mar24.dev</a>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
