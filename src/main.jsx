import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

function App() {
  const appRef = useRef(null);

  // Cursor spotlight glow that follows the mouse
  useEffect(() => {
    const el = appRef.current;
    if (!el) return;
    const move = (e) => {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

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

  return (
    <div className="app" ref={appRef}>
      <div className="progress" />
      <div className="spotlight" />
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />
      <div className="grain" />

      <header className="header">
        <a href="/" className="logo">MAR24<span>.DEV</span></a>
        <nav className="nav">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:hello@mar24.dev" className="contact">Contact<span>↗</span></a>
        </nav>
      </header>

      <main className="main">
        {/* Intro */}
        <section className="intro">
          <span className="eyebrow reveal d1"><i className="statusDot" />Software · Systems · Product</span>
          <h1 className="reveal d2">
            Design.<br />
            Build.<br />
            <span>Ship.</span>
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

        {/* Work */}
        <section className="work" id="work" data-reveal>
          <div className="sectionHeader">
            <span>Selected Work</span>
            <span>01 / 01</span>
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
                <div className="stat"><b>5+</b><span>Years</span></div>
                <div className="stat"><b>20+</b><span>Projects</span></div>
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
