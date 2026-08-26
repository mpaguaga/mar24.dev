import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import {ArrowUpRight,Mail,ExternalLink,Activity,Command,Sparkles} from "lucide-react";
import "./styles.css";

const projects=[
{n:"01",title:"StreamPulse",desc:"A creator control center for OBS, games, PC telemetry and stream health.",tags:["SaaS","React","Vercel","Stripe"],featured:true,url:"https://stream-pulse-beta.vercel.app/"},
{n:"02",title:"IAM Tools",desc:"Automation and internal tools for identity, access and systems management.",tags:["Automation","PowerShell","IAM"]},
{n:"03",title:"Dashboards",desc:"Clean, practical dashboards that turn noisy data into something useful.",tags:["React","APIs","Data"]}
];

const GitHubMark=()=> <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.25.78-.55v-2.16c-3.18.69-3.85-1.34-3.85-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.54-.29-5.21-1.27-5.21-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17a10.9 10.9 0 0 1 5.7 0c2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.39-2.68 5.36-5.23 5.64.41.35.77 1.04.77 2.1v3.12c0 .3.21.65.79.54A11.3 11.3 0 0 0 12 .7Z"/></svg>;

function App(){
 const[scrolled,setScrolled]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(window.scrollY>30);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f)},[]);
 const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
 return <div className="site"><div className="noise"/><div className="grid"/>
 <header className={scrolled?"scrolled":""}>
  <button className="logo" onClick={()=>go("top")}><span className="logoMark">M</span><span>MAR24<span className="dot">.</span>DEV</span></button>
  <nav><button onClick={()=>go("work")}>Work</button><button onClick={()=>go("about")}>About</button><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a></nav>
  <button className="contact" onClick={()=>location.href="mailto:hello@mar24.dev"}>Let's talk <ArrowUpRight size={13}/></button>
 </header>
 <main id="top">
  <section className="hero"><div className="eyebrow"><span className="liveDot"/> AVAILABLE FOR NEW BUILDS</div><h1>BUILDING THINGS<br/><em>THAT MATTER.</em></h1><p className="heroCopy">Software, automation and experiments — built to solve real problems and look damn good doing it.</p><div className="heroActions"><button className="primary" onClick={()=>go("work")}>Explore work <ArrowUpRight size={16}/></button><button className="ghost" onClick={()=>go("about")}>About me</button></div><div className="scrollHint"><span/> SCROLL TO EXPLORE</div></section>
  <section className="ticker"><div>SOFTWARE</div><span>✦</span><div>AUTOMATION</div><span>✦</span><div>PRODUCT</div><span>✦</span><div>EXPERIMENTS</div><span>✦</span></section>
  <section id="work" className="section"><div className="sectionHead"><div><span className="label">SELECTED WORK</span><h2>Things I've been<br/><i>building.</i></h2></div><span className="count">03 PROJECTS</span></div>
   <div className="projectList">{projects.map(p=><article className="project" key={p.n}><div className="projectNo">{p.n}</div><div className="projectMain"><div className="projectTop"><span className="status">{p.featured?<><span/> LIVE BUILD</>:"EXPERIMENT"}</span><span>{p.url?<a className="projectArrow" href={p.url} target="_blank" rel="noreferrer"><ExternalLink size={19}/></a>:<ArrowUpRight size={19}/>}</span></div><h3>{p.title}</h3><p>{p.desc}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div>{p.featured&&<div className="pulsePreview"><div className="miniTop"><span><Activity size={12}/> STREAMPULSE</span><b>LIVE</b></div><div className="miniChart">{[35,52,45,76,62,84,72,92].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div><div className="miniStats"><span>STREAM HEALTH <b>98%</b></span><span>FPS <b>60</b></span><span>BITRATE <b>6.2 Mbps</b></span></div></div>}</article>)}</div>
  </section>
  <section id="about" className="about section"><div className="aboutLabel"><span className="label">ABOUT</span><Command size={18}/></div><div className="aboutBody"><h2>Curious by default.<br/><i>Builder by choice.</i></h2><p>I like taking ideas from <strong>"this would be cool"</strong> to something you can actually open in a browser and use.</p><p>My work sits somewhere between software, systems, automation and product design. I care about useful tools, clean interfaces and making complicated things feel simple.</p><div className="aboutLinks"><a href="https://github.com/" target="_blank" rel="noreferrer"><GitHubMark/> GitHub <ArrowUpRight size={13}/></a><a href="mailto:hello@mar24.dev"><Mail size={17}/> Email <ArrowUpRight size={13}/></a></div></div></section>
  <section className="cta"><Sparkles size={18}/><h2>Have an idea?<br/><i>Let's build it.</i></h2><a href="mailto:hello@mar24.dev">GET IN TOUCH <ArrowUpRight size={14}/></a></section>
 </main><footer><span>© 2026 MAR24.DEV</span><span>BUILT WITH CURIOSITY <span className="dot">✦</span></span></footer></div>
}
createRoot(document.getElementById("root")).render(<App/>);
