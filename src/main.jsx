import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Box, FileText, Layers3, Mail, MapPin, Menu, Send, Sparkles, X } from 'lucide-react';
import portraitImage from '../3d7c8182-ab01-4f3f-b55a-fc7c4fdb3ce9.png';
import './index.css';

const baseUrl = import.meta.env.BASE_URL;

const projects = [
  { id: '01', title: 'The Last Outpost', category: 'Environment art', description: 'A lonely research station built around scale, atmosphere, and environmental storytelling.', tags: ['Worldbuilding', 'Lighting'], accent: 'green', className: 'feature-project' },
  { id: '02', title: 'Warden', category: '3D character art', description: 'A stylized guardian study exploring silhouette, layered materials, and readable identity.', tags: ['Sculpting', 'Materials'], accent: 'gold' },
  { id: '03', title: 'Echoes of Motion', category: 'Game design document', description: 'A systems-focused concept for a traversal game with a tactile, repeatable movement loop.', tags: ['Mechanics', 'Systems'], accent: 'blue' },
];

const portfolioMedia = [
  { slug: 'living-room', title: 'Living Room', type: 'video', src: `${baseUrl}portfolio/living-room.mp4`, goal: 'Environment building', intro: 'A first environment-building exercise where I turned a simple room into a complete lived-in space through furniture, lighting, and atmosphere.', tools: 'Blender', summary: 'A complete living room environment created as a student learning project. I modeled the furniture and interior details, including a couch, lights, lamps, table, chairs, and stool, then used HDRI lighting to study atmosphere and presentation.', role: 'Environment modeling, set dressing, and lighting' },
  { slug: 'headphones', title: 'Headphones', type: 'video', src: `${baseUrl}portfolio/headphones.mp4`, goal: 'Product video study', intro: 'A product-animation exercise focused on giving a pair of Microsoft headphones a clean reveal through controlled camera movement and studio-style lighting.', tools: 'Blender', summary: 'A product animation study focused on presenting Microsoft headphones with a clean, polished feel. I explored smooth camera transitions and lighting setups to reveal the product clearly throughout the sequence.', role: 'Product modeling presentation, camera animation, and lighting' },
  { slug: 'airpods', title: 'Airpods', type: 'video', src: `${baseUrl}portfolio/airpods.mp4`, goal: 'Product video study', intro: 'A personal attempt at recreating the rhythm of a real product advertisement, using smooth transitions and lighting to make the AirPods feel refined and tangible.', tools: 'Blender', summary: 'A student product-video exercise inspired by real advertising language. I created a smooth camera transition and lighting setup for Apple AirPods, aiming for a clean presentation that makes the product feel tangible and premium.', role: 'Product presentation, camera animation, and lighting' },
  { slug: 'product-photo', title: 'Product Photo', type: 'image', src: `${baseUrl}portfolio/product-photo.png`, goal: 'Product render study', intro: 'A focused still-life render created to practice how composition, materials, and light can turn a simple perfume product into a clear visual subject.', tools: 'Blender', summary: 'A focused still-render exercise for a perfume product. The project helped me practice framing, material response, lighting, and the small decisions that make a simple product image feel intentional.', role: 'Product staging, materials, composition, and rendering' },
  { slug: 'chess', title: 'Chess', type: 'video', src: `${baseUrl}portfolio/chess.mp4`, goal: 'Animation study', intro: 'A small animation exercise built around chess pieces, helping me explore timing, movement, framing, and how simple actions can create visual interest.', tools: 'Blender', summary: 'A simple animation study using chess pieces. I used the scene to practice object movement, timing, camera framing, and the relationship between a small action and a readable visual composition.', role: 'Animation, scene setup, and camera composition' },
];

function ProfilePortrait() {
  return <div className="profile-portrait"><img src={portraitImage} alt="Krunal Dholakia" /><div className="portrait-placeholder"><span>KD</span><small>Portrait unavailable</small></div><div className="portrait-label"><strong>Krunal Dholakia</strong><span>Game artist & designer</span></div></div>;
}

function ProjectVisual({ project }) {
  return <div className={`project-visual ${project.accent}`}>
    <span className="project-number">{project.id}</span>
    <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
    <div className="visual-core" />
    <div className="visual-caption"><span>visual study</span><span>2026</span></div>
  </div>;
}

function projectFromLocation() {
  const appPath = window.location.pathname.startsWith(baseUrl)
    ? window.location.pathname.slice(baseUrl.length - 1)
    : window.location.pathname;
  const match = appPath.match(/^\/project\/([^/]+)\/?$/);
  return portfolioMedia.find((project) => project.slug === match?.[1]) || null;
}

function PortfolioDetail({ project, onBack }) {
  return <main className="case-study-page"><div className="case-study-shell"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to portfolio</button><div className="case-study-header"><p className="eyebrow">Student project / Learning study</p><h1>{project.title}</h1><p className="case-study-lede">{project.intro}</p></div><div className="case-study-media">{project.type === 'video' ? <video src={project.src} controls autoPlay muted loop playsInline /> : <img src={project.src} alt={project.title} />}</div><div className="case-study-grid"><div><p className="case-label">Project goal</p><h2>{project.goal}</h2><p className="case-copy">{project.summary}</p></div><aside><div><p className="case-label">Tools / software</p><p>{project.tools}</p></div><div><p className="case-label">My contribution</p><p>{project.role}</p></div><div><p className="case-label">Project type</p><p>Personal student learning project</p></div></aside></div></div></main>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [selectedProject, setSelectedProject] = useState(projectFromLocation);
  const [form, setForm] = useState({ name: '', email: '', brief: '' });
  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submitForm = async (event) => {
    event.preventDefault();
    setSending(true);
    setFormError('');
    try {
      const response = await fetch('https://formsubmit.co/ajax/krunaldholakia1@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.brief,
          _subject: 'New portfolio inquiry',
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!response.ok) throw new Error('The message could not be sent.');
      setSent(true);
      setForm({ name: '', email: '', brief: '' });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSending(false);
    }
  };
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    const handleHistoryChange = () => setSelectedProject(projectFromLocation());
    window.addEventListener('popstate', handleHistoryChange);
    return () => window.removeEventListener('popstate', handleHistoryChange);
  }, []);
  const openProject = (project) => { window.location.assign(`${baseUrl}project/${project.slug}`); };
  const closeProject = () => { window.location.assign(baseUrl); };

  if (selectedProject) return <div className="site-shell"><PortfolioDetail project={selectedProject} onBack={closeProject} /></div>;

  return <div className="site-shell">
    <div className="grain" />
    <header className="site-header"><nav className="nav-wrap">
      <a className="brand" href="#top" onClick={closeMenu}>KD<span>.</span></a>
      <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        <a href="#work" onClick={closeMenu}>Selected work</a><a href="#about" onClick={closeMenu}>About</a><a href="#contact" onClick={closeMenu}>Contact</a>
      </div>
      <a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
    </nav></header>

    <main id="top">
      <section className="hero section-grid"><div className="content-grid hero-grid">
        <div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> Game art / game design / visual worlds</p><h1>Krunal<br /><em>Dholakia.</em></h1><p className="hero-intro">I’m a game artist and designer building memorable characters, environments, and systems with a cinematic point of view.</p><div className="button-row"><a className="button button-primary" href="#work">Explore the work <ArrowDownRight size={17} /></a><a className="text-link" href="#contact">Available for freelance <span>↗</span></a></div><div className="hero-meta"><span>Based in India</span><span>Open to remote</span><span>Game art + design</span></div></div>
        <div className="hero-art"><ProfilePortrait /><div className="availability"><i /> Available for new projects</div></div>
      </div></section>

      <section id="work" className="work section-grid"><div className="content-grid"><div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2>Built from<br /><em>imagination.</em></h2></div><p className="section-note">A growing collection of visual experiments, design studies, and game-world concepts.</p></div><div className="project-list">{projects.map((project) => <article className={`project ${project.className || ''}`} key={project.id}><ProjectVisual project={project} /><div className="project-info"><div><p className="project-category">{project.category}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><button className="case-link">View study <ArrowUpRight size={16} /></button></div></article>)}</div></div></section>

      <section className="instagram-section section-band"><div className="content-grid"><div className="section-heading instagram-heading"><div><p className="eyebrow">01.5 / From the studio</p><h2>See the work<br /><em>in motion.</em></h2></div><a className="text-link instagram-link" href="https://www.instagram.com/pixeldrift_krunal/" target="_blank" rel="noreferrer">More work on Instagram <ArrowUpRight size={15} /></a></div><div className="portfolio-media-grid">{portfolioMedia.map((media, index) => <button className={`portfolio-media-card media-${index + 1}`} key={media.src} onClick={() => openProject(media)} aria-label={`View details for ${media.title}`}>{media.type === 'video' ? <video src={media.src} muted loop autoPlay playsInline preload="metadata" /> : <img src={media.src} alt={media.title} loading="lazy" />}<div className="media-overlay"><span>0{index + 1}</span><strong>{media.title}</strong><small>{media.type === 'video' ? 'Motion study · View details' : 'Product image · View details'}</small></div></button>)}</div></div></section>

      <section id="about" className="about section-band"><div className="content-grid about-grid"><div className="profile-section"><div className="profile-section-image"><img src={portraitImage} alt="Krunal Dholakia" /><span>KD</span></div><p className="profile-caption">Krunal Dholakia<br /><small>Game artist & designer</small></p></div><div><p className="eyebrow">02 / Profile & capabilities</p><h2>Built for<br /><em>play.</em></h2><p className="about-lede">I work across the visual and design sides of game development, turning early ideas into clear worlds, readable characters, and playable systems.</p><div className="discipline-grid"><div><Box /><h3>3D models & character art</h3><p>From silhouette and sculpting to materials and final presentation.</p></div><div><Layers3 /><h3>Environment & concept art</h3><p>Worldbuilding, mood, composition, and visual storytelling.</p></div><div><FileText /><h3>Game design documents</h3><p>Mechanics, player loops, balance notes, and production direction.</p></div></div></div></div></section>

      <section id="contact" className="contact section-grid"><div className="content-grid contact-grid"><div><p className="eyebrow">03 / Freelance inquiries</p><h2>Have a world<br /><em>in mind?</em></h2><p className="contact-copy">Tell me what you’re building. I’m open to character art, environment art, visual development, and game design collaborations.</p><div className="contact-details"><a href="mailto:krunaldholakia1@gmail.com"><Mail size={16} /> krunaldholakia1@gmail.com</a><span><MapPin size={16} /> India · available remotely</span></div></div><div className="form-panel">{sent ? <div className="success-state"><div className="success-mark">✓</div><h3>Brief received.</h3><p>Thanks for reaching out. This demo form is ready to connect to your preferred email or form service.</p><button className="text-link" onClick={() => setSent(false)}>Send another inquiry <span>↗</span></button></div> : <form onSubmit={submitForm}><div className="form-row"><label>Name<input required name="name" value={form.name} onChange={updateForm} placeholder="Your name" /></label><label>Email<input required type="email" name="email" value={form.email} onChange={updateForm} placeholder="you@studio.com" /></label></div><label>Project brief<textarea required name="brief" value={form.brief} onChange={updateForm} placeholder="A few words about the world you want to make..." rows="5" /></label><button className="button button-primary" type="submit">Send inquiry <Send size={16} /></button><p className="form-note">No passwords are collected here. Connect this form to Formspree, Resend, or your own backend before launch.</p></form>}</div></div></section>
    </main>
    <footer className="site-footer"><span>© 2026 Krunal Dholakia</span><span>Game artist · Game designer</span><a href="#top">Back to top ↑</a></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
