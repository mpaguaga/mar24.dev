import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
  {
    number: "01",
    title: "StreamPulse",
    description: "A clean control center for streamers, OBS and live PC telemetry.",
    tags: "PRODUCT · SAAS",
    href: "https://stream-pulse-beta.vercel.app/"
  },
  {
    number: "02",
    title: "IAM Tools",
    description: "Automation and internal tools for identity and access management.",
    tags: "AUTOMATION · SYSTEMS"
  },
  {
    number: "03",
    title: "Dashboards",
    description: "Simple interfaces that turn complicated data into useful information.",
    tags: "PRODUCT · DATA"
  }
];

const Github = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.25.78-.55v-2.16c-3.18.69-3.85-1.34-3.85-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.54-.29-5.21-1.27-5.21-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17a10.9 10.9 0 0 1 5.7 0c2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.39-2.68 5.36-5.23 5.64.41.35.77 1.04.77 2.1v3.12c0 .3.21.65.79.54A11.3 11.3 0 0 0 12 .7Z"/>
  </svg>
);

function App() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="page">
      <header>
        <button className="brand" onClick={() => scrollTo("top")}>MAR24<span>.</span>DEV</button>
        <nav>
          <button onClick={() => scrollTo("work")}>Work</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <a className="contact" href="mailto:hello@mar24.dev">Let's talk</a>
      </header>

      <main id="top">
        <section className="hero">
          <p className="intro">SOFTWARE · SYSTEMS · PRODUCT</p>
          <h1>
            I BUILD<br />
            <span>THINGS THAT</span><br />
            MATTER.
          </h1>
          <div className="heroBottom">
            <p>
              I build useful software, automation and digital products —
              keeping things simple, practical and well designed.
            </p>
            <button className="textLink" onClick={() => scrollTo("work")}>
              See selected work <b>↓</b>
            </button>
          </div>
        </section>

        <section id="work" className="work">
          <div className="sectionTitle">
            <span>SELECTED WORK</span>
            <span>2026</span>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <a
                className="project"
                key={project.number}
                href={project.href || "#about"}
                target={project.href ? "_blank" : undefined}
                rel={project.href ? "noreferrer" : undefined}
              >
                <span className="projectNumber">{project.number}</span>
                <div className="projectInfo">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <small>{project.tags}</small>
                </div>
                <span className="arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <div className="sectionTitle">
            <span>ABOUT</span>
          </div>
          <div className="aboutContent">
            <h2>CURIOUS BY DEFAULT.<br /><span>BUILDER BY CHOICE.</span></h2>
            <p>
              I like taking ideas from “this would be cool” to something
              people can actually open, use and enjoy.
            </p>
            <p>
              My work sits between software, systems, automation and product
              design. I care about making complicated things feel simple.
            </p>
            <div className="links">
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                <Github /> GitHub ↗
              </a>
              <a href="mailto:hello@mar24.dev">Email ↗</a>
            </div>
          </div>
        </section>

        <section className="footerCta">
          <p>HAVE AN IDEA?</p>
          <h2>LET'S BUILD<br /><span>SOMETHING.</span></h2>
          <a href="mailto:hello@mar24.dev">hello@mar24.dev ↗</a>
        </section>
      </main>

      <footer>
        <span>© 2026 MAR24.DEV</span>
        <span>BUILT WITH CURIOSITY.</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
