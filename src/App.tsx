import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'
import './App.css'

const nav = [
  ['Research', 'research'],
  ['Publications', 'publications'],
  ['Work', 'experience'],
  ['Interests', 'future'],
  ['Education', 'education'],
  ['Skills', 'skills'],
  ['About', 'about'],
]

const research = [
  {
    date: 'Nov 2025 — Sep 2026',
    type: 'Spatial multi-omics · First author',
    title: 'Learning a shared language for space and molecules',
    summary: 'SpaHDSRL integrates spatial and modality-specific graphs through gated fusion, Deep Graph Infomax, and spatial regularization.',
    detail: 'Benchmarked against four methods on two simulated and three real multi-omics datasets, with ARI improvements of 15.3% and 13.0% over COSMOS on simulated data and Moran’s I values of 0.740–0.913 on real data.',
    tag: 'SpaHDSRL',
  },
  {
    date: 'May 2025 — Jul 2025',
    type: 'Transcriptomics · Core contributor',
    title: 'From expression signals to cellular context',
    summary: 'A systematic bioinformatics study across bulk RNA-seq and single-cell transcriptomic data, connecting differential expression with cell-type-specific evidence.',
    detail: 'Identified 1,460 differentially expressed genes from 15,596 genes in GSE21933. Processed GSE140510 with Seurat and Harmony, retaining 32,448 cells after quality control and annotating six major cell types.',
    tag: 'Bulk + scRNA-seq',
  },
  {
    date: 'Nov 2024 — Oct 2025',
    type: 'Medical AI · Team member',
    title: 'Earlier diagnosis, with uncertainty made visible',
    summary: 'A Transformer-based multimodal framework for Alzheimer’s disease diagnosis, designed to handle missing features and communicate predictive uncertainty.',
    detail: 'The work combines multimodal learning with Monte Carlo Dropout, exploring not only whether a prediction is accurate, but also how confidently it should be interpreted.',
    tag: 'Multimodal learning',
  },
]

const experience = [
  {
    period: 'Sep 2026 — Present',
    place: 'Shanghai, China',
    role: 'Algorithm Intern, Department of Research',
    org: 'Shanghai Fosun Aitrox Technology',
    text: 'Clinical collaborations spanning six-class cancer cell detection in pathology images and weakly supervised ultrasound lesion segmentation using limited masks and large-scale clinical reports.',
    link: 'https://www.proxima-ai.com/about',
  },
  {
    period: 'Jul — Sep 2025 & 2026',
    place: 'Hangzhou, China',
    role: 'Research Intern, AI Team',
    org: 'Guomics Laboratory, Westlake University',
    text: 'Spatial proteomics reconstruction at single-cell resolution. Led revision analyses for HetuNet, including ablation and sensitivity tests, imaging-channel diagnostics, cell segmentation, and protein-expression recovery.',
    link: 'https://guomics.com/',
  },
]

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="arrow-link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span><ArrowUpRight size={16} />
    </a>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('research')
  const [expanded, setExpanded] = useState<number | null>(0)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
    }, { rootMargin: '-20% 0px -65% 0px' })
    nav.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="header">
        <a href="#top" className="wordmark" aria-label="Xiang Li, back to top">XIANG LI<span>李想</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, id]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => goTo(id)}>{label}</button>)}
        </nav>
        <a className="contact-link" href="mailto:lixiang@stu.cpu.edu.cn">Let’s talk <ArrowUpRight size={15} /></a>
        <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(([label, id]) => <button key={id} onClick={() => goTo(id)}>{label}<ArrowUpRight size={18} /></button>)}</nav>}

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="kicker">Biostatistics · Computational Biology · Medical AI</p>
            <h1 id="hero-title">Finding patterns<br />in <em>living systems.</em></h1>
            <p className="intro">I’m Xiang Li, an undergraduate researcher at China Pharmaceutical University. I work where statistics, machine learning, and biology meet.</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => goTo('research')}>Explore my research <ArrowDown size={16} /></button>
            </div>
          </div>
          <figure className="hero-visual">
            <img src="./xiang-research-atlas.png" alt="Original botanical specimen artwork transforming into graph networks, cells, and spatial omics maps" />
            <figcaption><span>Research atlas / 01</span><span>From tissue to topology</span></figcaption>
          </figure>
        </section>

        <section className="statement" aria-label="Research statement">
          <p className="section-label">Research perspective</p>
          <p className="statement-text">Biology is complex. My work is to build representations that make its structure <em>legible</em>—without losing sight of the uncertainty that remains.</p>
        </section>

        <section id="research" className="content-section research-section">
          <div className="section-heading">
            <p className="section-label">Selected research</p>
            <h2>Questions I’m<br />working through.</h2>
            <p>Methods for integrating biological data, understanding cellular organization, and supporting more reliable clinical decisions.</p>
          </div>
          <div className="research-list">
            {research.map((item, index) => (
              <article className={`research-item ${expanded === index ? 'is-open' : ''}`} key={item.title}>
                <button className="research-toggle" aria-expanded={expanded === index} onClick={() => setExpanded(expanded === index ? null : index)}>
                  <span className="research-meta">{item.date}<br />{item.type}</span>
                  <span className="research-main"><span className="research-tag">{item.tag}</span><strong>{item.title}</strong><span className="research-summary">{item.summary}</span></span>
                  <span className="plus" aria-hidden="true">{expanded === index ? '−' : '+'}</span>
                </button>
                <div className="research-detail" hidden={expanded !== index}><p>{item.detail}</p>{index === 0 && <div className="inline-links"><ArrowLink href="https://doi.org/10.1093/bib/bbag517">Read paper</ArrowLink><ArrowLink href="https://github.com/Lisa62103/SpaHDSRL">View code</ArrowLink></div>}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="publications" className="content-section publications-section">
          <div className="section-heading compact"><p className="section-label">Publications & manuscripts</p><h2>Written work.</h2></div>
          <div className="publication-list">
            <article className="publication">
              <div className="pub-year">2026<span>Briefings in Bioinformatics</span></div>
              <div><h3>SpaHDSRL: Hierarchical Dual-Graph Self-Supervised Representation Learning for Integrating Spatially Resolved Multi-Omics Data</h3><p><strong>Li, X.</strong>, Zhang, K., Li, Y., et al. · 27(5), bbag517</p><ArrowLink href="https://doi.org/10.1093/bib/bbag517">DOI / Paper</ArrowLink></div>
            </article>
            <article className="publication">
              <div className="pub-year">2026<span>LangTaoSha Preprint Server</span></div>
              <div><h3>Multimodal AI-enabled mass spectrometry-based expansion proteomics for whole-slide at single-cell resolution</h3><p>Wang, S., Dong, Z., Wu, C., et al., including <strong>Li, X.</strong></p><ArrowLink href="https://langtaosha.org.cn/lts/en/preprint/view/134">Read preprint</ArrowLink></div>
            </article>
          </div>
        </section>

        <section id="experience" className="content-section experience-section">
          <div className="section-heading"><p className="section-label">Work experience</p><h2>Experience.</h2><p>Collaborating across laboratories, clinical teams, and computational disciplines.</p></div>
          <div className="experience-list">
            {experience.map((item) => <article className="experience-item" key={item.org}><div className="experience-time">{item.period}<span>{item.place}</span></div><div><p className="role">{item.role}</p><h3>{item.org}</h3><p>{item.text}</p><ArrowLink href={item.link}>Visit organization</ArrowLink></div></article>)}
          </div>
        </section>

        <section id="future" className="future-section" aria-labelledby="future-title">
          <figure className="future-visual"><img src="./unpaired-spatial-watercolor.png" alt="Watercolor atlas of adjacent tissue sections connected by probabilistic paths to a shared cellular graph" /><figcaption><span>Research atlas / 02</span><span>Correspondence without shared coordinates</span></figcaption></figure>
          <div className="future-content">
            <p className="section-label">The next question · Research interests</p>
            <div className="future-heading"><h2 id="future-title">Integration without<br /><em>shared coordinates.</em></h2></div>
            <div className="next-copy"><p>Spatial multi-omics is often measured on adjacent tissue sections rather than on exactly the same spots. I’m interested in whether tissue architecture and conserved biological programs can serve as weak anchors for learning correspondence across these sections.</p><p>The goal is not to force a one-to-one alignment, but to learn a shared tissue representation while preserving modality-specific signals and expressing correspondence uncertainty explicitly.</p><span>Unpaired spatial multi-omics · Representation learning · Uncertainty</span></div>
            <ArrowLink href="https://doi.org/10.1093/bib/bbag517">Where this began</ArrowLink>
          </div>
        </section>

        <section id="education" className="education-section" aria-labelledby="education-title">
          <p className="section-label">Education</p>
          <div><h2 id="education-title">China Pharmaceutical<br />University</h2><p>B.S. in Biostatistics, School of Science<br />Sep 2023 — Jun 2027 · Nanjing, China</p></div>
          <div className="education-stats"><span><strong>94.32</strong> / 100 GPA</span><span><strong>1 / 32</strong> Major rank</span><span><strong>3.97</strong> / 4.00 WES GPA</span></div>
          <p className="honors">National Scholarship · “Jingyuan Pharmacy” Enterprise Scholarship · Merit Student Leader</p>
        </section>

        <section id="skills" className="skills-section" aria-labelledby="skills-title">
          <div className="skills-intro"><p className="section-label">Technical toolkit</p><h2 id="skills-title">Methods<br />& tools.</h2><p>Tools serve the question—from statistical analysis and model design to biological interpretation.</p></div>
          <div className="skills-table">
            <div className="skill-row"><h3>Programming</h3><p>Python <i>·</i> R <i>·</i> SAS <i>·</i> JavaScript / TypeScript <i>·</i> Go</p></div>
            <div className="skill-row"><h3>Bioinformatics</h3><p>Seurat <i>·</i> Harmony <i>·</i> GEOquery <i>·</i> limma <i>·</i> Bulk & single-cell RNA-seq <i>·</i> Spatial omics</p></div>
            <div className="skill-row"><h3>Web & cloud</h3><p>HTML / CSS <i>·</i> Vite <i>·</i> Cloudflare</p></div>
            <div className="skill-row"><h3>DevOps & writing</h3><p>Git <i>·</i> GitHub Actions <i>·</i> LaTeX</p></div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-title"><p className="section-label">Beyond the work</p><h2>A little more<br /><em>about me.</em></h2></div>
          <div className="about-copy"><p>I’m from Shanghai, China, studying across mathematics, statistics, biology, and medicine. I’m interested in computational methods that are not only elegant, but useful for asking better biological questions.</p><p>I want to move between algorithmic design and biological discovery—revealing tissue structure with clarity and interpretability, and ultimately contributing to biomedical decision making.</p><ArrowLink href="https://syanglee.com/about/">Visit my blog</ArrowLink></div>
        </section>

        <section className="contact-section">
          <p className="section-label">Contact</p>
          <h2>Let’s explore<br />what’s <em>next.</em></h2>
          <p>Open to conversations about research, collaboration, and computational biology.</p>
          <a className="email-link" href="mailto:lixiang@stu.cpu.edu.cn">lixiang@stu.cpu.edu.cn <ArrowUpRight /></a>
        </section>
      </main>

      <footer><span>© 2026 Xiang Li</span><span>Shanghai · China</span><div><a href="https://github.com/Lisa62103" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://syanglee.com/" target="_blank" rel="noreferrer">Blog ↗</a><a href="mailto:lixiang.lisalee@gmail.com">Email ↗</a></div></footer>
    </div>
  )
}
