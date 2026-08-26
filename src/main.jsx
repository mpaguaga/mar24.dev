import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.25.78-.55v-2.16c-3.18.69-3.85-1.34-3.85-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.54-.29-5.21-1.27-5.21-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17a10.9 10.9 0 0 1 5.7 0c2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.39-2.68 5.36-5.23 5.64.41.35.77 1.04.77 2.1v3.12c0 .3.21.65.79.54A11.3 11.3 0 0 0 12 .7Z"/>
  </svg>
);

function App() {
  return (
    <div className="app">
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />

      <header className="header">
        <a className="logo" href="/">MAR24<span>.</span>DEV</a>

        <nav className="nav">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        </nav>

        <a className="contact" href="mailto:hello@mar24.dev">
          Contact <span>↗</span>
        </a>
      </header>

      <main className="main">
        <section className="intro">
          <div className="eyebrow">
            <span className="statusDot" />
            SOFTWARE · SYSTEMS · PRODUCT
          </div>

          <h1>
            I build <span>useful</span><br />
            digital things.
          </h1>

          <p className="introText">
            Software, automation and products designed to solve real problems
            without making things unnecessarily complicated.
          </p>
        </section>

        <section id="work" className="work">
          <div className="sectionHeader">
            <span>SELECTED WORK</span>
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
              <span className="live"><i /> LIVE</span>
            </div>

            <div className="projectContent">
              <div>
                <div className="projectMeta">SAAS · STREAMING · REACT</div>
                <h2>StreamPulse</h2>
                <p>
                  A modern streaming companion for creators — bringing stream
                  controls, OBS connectivity and live system information into
                  one clean interface.
                </p>
              </div>

              <div className="projectAction">
                <span>VIEW PROJECT</span>
                <strong>↗</strong>
              </div>
            </div>

            <div className="projectFooter">
              <span>PUBLIC BUILD</span>
              <span>STREAMPULSE</span>
            </div>
          </a>
        </section>

        <section id="about" className="about">
          <div className="sectionHeader">
            <span>ABOUT</span>
          </div>

          <div className="aboutGrid">
            <h2>Simple ideas.<br /><span>Well built.</span></h2>
            <p>
              I enjoy turning ideas into software people can actually use.
              My work sits between systems, automation, product and interface
              design — with a focus on keeping complicated things simple.
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
