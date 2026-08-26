import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import {ArrowUpRight,GithubIcon,Mail,ExternalLink,Activity,Command,Sparkles} from "lucide-react";
import "./styles.css";

const projects=[
{n:"01",title:"StreamPulse",desc:"A creator control center for OBS, games, PC telemetry and stream health.",tags:["SaaS","React","Vercel","Stripe"],featured:true,url:"https://stream-pulse-beta.vercel.app/"},
{n:"02",title:"IAM Tools",desc:"Automation and internal tools for identity, access and systems management.",tags:["Automation","PowerShell","IAM"]},
{n:"03",title:"Dashboards",desc:"Clean, practical dashboards that turn noisy data into something useful.",tags:["React","APIs","Data"]}
];

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
  <section id="work" className="work section"><div className="sectionHead"><div><span className="label">SELECTED WORK</span><h2>Things I've been<br/><i>building.</i></h2></div><span className="count">03 PROJECTS</span></div>
   <div className="projectList">{projects.map(p=><article className={"project "+(p.featured?"featured":"")} key={p.n}><div className="projectNo">{p.n}</div><div className="projectMain"><div className="projectTop"><span className="status">{p.featured?<><span/> LIVE BUILD</>:"EXPERIMENT"}</span><span className="projectArrow">{p.url?<a href={p.url} target="_blank" rel="noreferrer"><ExternalLink size={19}/></a>:<ArrowUpRight size={19}/>}</span></div><h3>{p.title}</h3><p>{p.desc}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div>{p.featured&&<div className="pulsePreview"><div className="miniTop"><span><Activity size={12}/> STREAMPULSE</span><b>LIVE</b></div><div className="miniChart">{[35,52,45,76,62,84,72,92].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div><div className="miniStats"><span>STREAM HEALTH <b>98%</b></span><span>FPS <b>60</b></span><span>BITRATE <b>6.2 Mbps</b></span></div></div>}</article>)}</div>
  </section>
  <section id="about" className="about section"><div className="aboutLabel"><span className="label">ABOUT</span><Command size={18}/></div><div className="aboutBody"><h2>Curious by default.<br/><i>Builder by choice.</i></h2><p>I like taking ideas from <strong>"this would be cool"</strong> to something you can actually open in a browser and use.</p><p>My work sits somewhere between software, systems, automation and product design. I care about useful tools, clean interfaces and making complicated things feel simple.</p><div className="aboutLinks"><a href="https://github.com/" target="_blank" rel="noreferrer"><GithubIcon size={17}/> GitHub <ArrowUpRight size={13}/></a><a href="mailto:hello@mar24.dev"><Mail size={17}/> Email <ArrowUpRight size={13}/></a></div></div></section>
  <section className="cta"><Sparkles size={18}/><h2>Have an idea?<br/><i>Let's build it.</i></h2><a href="mailto:hello@mar24.dev">GET IN TOUCH <ArrowUpRight size={14}/></a></section>
 </main><footer><span>© 2026 MAR24.DEV</span><span>BUILT WITH CURIOSITY <span className="dot">✦</span></span></footer></div>
}
createRoot(document.getElementById("root")).render(<App/>);
