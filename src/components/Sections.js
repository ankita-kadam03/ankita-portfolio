import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

// Reusable fade-in wrapper
function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const variants = {
    hidden: { opacity: 0, y: direction === 'up' ? 50 : 0, x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0, scale: 0.97 },
    visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
  };
  return <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants}>{children}</motion.div>;
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, transition: 'all 0.3s', ...style }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.4)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >{children}</div>
  );
}

// ── ABOUT ──────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <FadeIn><p className="section-label">about_me</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Passionate about AI<br /><span>that matters</span></h2></FadeIn>
        <div className="divider" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          <FadeIn delay={0.15} direction="left">
            <div>
              {portfolioData.bio.map((p, i) => (
                <p key={i} style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: 18, fontSize: '1rem' }} dangerouslySetInnerHTML={{ __html: p.replace(/LLMs|RAG|Generative AI|Python|open source/g, m => `<strong style="color:#fff">${m}</strong>`) }} />
              ))}
              <div style={{ marginTop: 28 }}>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: 14, fontSize: '0.92rem' }}>Interests & Passions</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {['🤖 LLMs', '🔗 RAG', '🧬 GenAI', '🧩 NLP', '🤝 Open Source', '📚 AI Research', '🌱 Teaching'].map(t => (
                    <span key={t} style={{ background: 'rgba(123,47,255,0.1)', border: '1px solid rgba(123,47,255,0.25)', color: 'var(--c2)', padding: '8px 18px', borderRadius: 100, fontSize: '0.82rem', fontWeight: 600, transition: 'all 0.2s', cursor: 'default' }}
                      onMouseEnter={e => { e.target.style.background = 'rgba(123,47,255,0.2)'; e.target.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.target.style.background = 'rgba(123,47,255,0.1)'; e.target.style.transform = ''; }}
                    >{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.25} direction="right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[['📍', 'Location', 'Hyderabad, Telangana, India\nOpen to remote worldwide'], ['🎯', 'Mission', 'Democratize AI — build tools that are powerful, accessible, and impactful for everyone.'], ['⚡', 'Currently', 'Building LLM apps, RAG pipelines & exploring agentic AI systems.']].map(([ic, t, s]) => (
                <div key={t} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: 24, transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.4)'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.querySelector('.abar').style.opacity = 1; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; e.currentTarget.querySelector('.abar').style.opacity = 0; }}
                >
                  <div className="abar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,var(--c1),var(--c2))', opacity: 0, transition: 'opacity 0.3s' }} />
                  <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{ic}</div>
                  <div style={{ fontWeight: 800, color: '#fff', marginBottom: 4 }}>{t}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{s}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ─────────────────────────────────────────────────
export function Skills() {
  return (
    <section id="skills" className="section alt-bg">
      <div className="section-inner">
        <FadeIn><p className="section-label">tech_stack</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Skills &amp; <span>Tools</span></h2></FadeIn>
        <FadeIn delay={0.15}><p className="section-desc">Technologies I use to build AI systems from research to production.</p></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 20 }}>
          {portfolioData.skills.map((s, i) => (
            <FadeIn key={s.cat} delay={i * 0.08}>
              <Card style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(123,47,255,0.1),transparent)', top: -80, right: -80, pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(123,47,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{s.cat.split(' ')[0]}</div>
                  <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>{s.cat.slice(3)}</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {s.items.map(item => (
                    <span key={item} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text)', padding: '6px 14px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.2s', cursor: 'default' }}
                      onMouseEnter={e => { e.target.style.background = 'rgba(123,47,255,0.15)'; e.target.style.borderColor = 'var(--c1)'; e.target.style.color = 'var(--c2)'; }}
                      onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text)'; }}
                    >{item}</span>
                  ))}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EXPERIENCE ─────────────────────────────────────────────
export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-inner">
        <FadeIn><p className="section-label">work_history</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">My <span>Journey</span></h2></FadeIn>
        <FadeIn delay={0.15}><p className="section-desc" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.82rem' }}>{`// Replace with your actual experience!`}</p></FadeIn>
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          <div style={{ position: 'absolute', left: 0, top: 12, bottom: 12, width: 1, background: 'linear-gradient(180deg,var(--c1),var(--c2),transparent)' }} />
          {portfolioData.experience.map((e, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{ position: 'relative', marginBottom: 52 }}>
                <div style={{ position: 'absolute', left: -37, top: 6, width: 12, height: 12, borderRadius: '50%', background: 'linear-gradient(135deg,var(--c1),var(--c2))', boxShadow: '0 0 16px rgba(123,47,255,0.6)' }} />
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--c2)', letterSpacing: 2, marginBottom: 8 }}>{e.date}</div>
                <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: '1.3rem', fontWeight: 700, color: '#fff', letterSpacing: -0.5, marginBottom: 4 }}>{e.role}</div>
                <div style={{ color: 'var(--c1)', fontWeight: 700, fontSize: '0.9rem', marginBottom: 12 }}>{e.company} · {e.location}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 14 }}>{e.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {e.tags.map(t => <span key={t} style={{ background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.18)', color: 'var(--c4)', padding: '4px 12px', borderRadius: 6, fontSize: '0.73rem', fontWeight: 700 }}>{t}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ───────────────────────────────────────────────
export function Projects() {
  const onMove = (e, card) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  };

  return (
    <section id="projects" className="section alt-bg">
      <div className="section-inner">
        <FadeIn><p className="section-label">featured_work</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">My <span>Projects</span></h2></FadeIn>
        <FadeIn delay={0.15}><p className="section-desc">Real AI/ML projects — update links with your actual GitHub repos!</p></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22 }}>
          {portfolioData.projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 22, padding: 32, transition: 'all 0.35s', position: 'relative', overflow: 'hidden', cursor: 'default' }}
                onMouseMove={e => onMove(e, e.currentTarget)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.4)'; e.currentTarget.style.transform = 'translateY(-8px) rotateX(2deg)'; e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.5)'; e.currentTarget.querySelector('.pglow').style.opacity = 1; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.querySelector('.pglow').style.opacity = 0; }}
              >
                <div className="pglow" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(123,47,255,0.08), transparent 60%)', pointerEvents: 'none', opacity: 0, transition: 'opacity 0.3s' }} />
                <div style={{ position: 'absolute', top: 20, right: 24, fontFamily: "'Clash Display',sans-serif", fontSize: '4rem', fontWeight: 700, color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>{p.num}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,rgba(123,47,255,0.2),rgba(0,212,255,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 18, border: '1px solid rgba(123,47,255,0.2)' }}>{p.icon}</div>
                <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: '1.15rem', fontWeight: 700, color: '#fff', letterSpacing: -0.5, marginBottom: 10 }}>{p.title}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 22 }}>{p.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {p.stack.map(s => <span key={s} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--muted)', padding: '4px 12px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600 }}>{s}</span>)}
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--c2)', fontSize: '0.82rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'gap 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >View on GitHub →</a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CERTIFICATIONS ─────────────────────────────────────────
export function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="section-inner">
        <FadeIn><p className="section-label">credentials</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title"><span>Certifi</span>cations</h2></FadeIn>
        <FadeIn delay={0.15}><p className="section-desc" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.82rem' }}>{`// Replace with your actual certifications!`}</p></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {portfolioData.certifications.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.07}>
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 18, padding: 22, display: 'flex', gap: 16, alignItems: 'flex-start', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
              >
                <div style={{ width: 50, height: 50, borderRadius: 12, background: 'linear-gradient(135deg,rgba(123,47,255,0.15),rgba(0,212,255,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0, border: '1px solid rgba(123,47,255,0.15)' }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, color: '#fff', marginBottom: 4, fontSize: '0.9rem', lineHeight: 1.3 }}>{c.name}</div>
                  <div style={{ color: 'var(--c1)', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>{c.issuer}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>{c.year}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BLOG ───────────────────────────────────────────────────
export function Blog() {
  return (
    <section id="blog" className="section alt-bg">
      <div className="section-inner">
        <FadeIn><p className="section-label">thoughts</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Blog &amp; <span>Articles</span></h2></FadeIn>
        <FadeIn delay={0.15}><p className="section-desc">Writing about AI, LLMs & everything in between. Coming soon!</p></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 22 }}>
          {portfolioData.blogs.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.1}>
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 22, padding: 32, transition: 'all 0.3s', position: 'relative', overflow: 'hidden', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <span style={{ display: 'inline-block', background: 'rgba(0,255,157,0.1)', border: '1px solid rgba(0,255,157,0.2)', color: 'var(--c4)', padding: '4px 12px', borderRadius: 100, fontSize: '0.72rem', fontWeight: 700, marginBottom: 16 }}>{b.tag} · Coming Soon</span>
                <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#fff', letterSpacing: -0.3, marginBottom: 10, lineHeight: 1.3 }}>{b.title}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 22 }}>{b.excerpt}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{b.date}</span>
                  <span style={{ color: 'var(--c2)', fontSize: '1.1rem' }}>→</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ────────────────────────────────────────────────
export function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = '✓ Sent! I\'ll get back to you soon';
    btn.style.background = 'linear-gradient(135deg,#00ff9d,#00b37a)';
    setTimeout(() => { btn.textContent = 'Send Message ✦'; btn.style.background = ''; }, 3500);
  };

  const inp = { background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text)', padding: '14px 18px', borderRadius: 12, fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: '0.95rem', outline: 'none', width: '100%', transition: 'all 0.2s' };

  return (
    <section id="contact" className="section alt-bg">
      <div className="section-inner">
        <FadeIn><p className="section-label">get_in_touch</p></FadeIn>
        <FadeIn delay={0.1}><h2 className="section-title">Let's <span>Connect</span></h2></FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, marginTop: 48 }}>
          <FadeIn delay={0.15} direction="left">
            <div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 36 }}>I'm always open to interesting conversations, collaborations, research opportunities, and roles in AI/ML. Feel free to reach out!</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['/in', 'linkedin.com/in/ankita-kadam03', portfolioData.linkedin], ['⌥', 'github.com/ankita-kadam03', portfolioData.github], ['@', portfolioData.email, `mailto:${portfolioData.email}`], ['📍', 'Hyderabad, India', '#']].map(([ic, label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.25s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.5)'; e.currentTarget.style.color = 'var(--c2)'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.background = 'rgba(123,47,255,0.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = ''; e.currentTarget.style.background = 'var(--card)'; }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(123,47,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ic}</div>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.25} direction="right">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div><label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 8 }}>Name</label><input type="text" required placeholder="Your name" style={inp} onFocus={e => e.target.style.borderColor = 'var(--c1)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} /></div>
                <div><label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 8 }}>Email</label><input type="email" required placeholder="your@email.com" style={inp} onFocus={e => e.target.style.borderColor = 'var(--c1)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} /></div>
              </div>
              <div><label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 8 }}>Subject</label><input type="text" placeholder="What's this about?" style={inp} onFocus={e => e.target.style.borderColor = 'var(--c1)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} /></div>
              <div><label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 8 }}>Message</label><textarea placeholder="Let's build something amazing together..." style={{ ...inp, minHeight: 130, resize: 'vertical' }} onFocus={e => e.target.style.borderColor = 'var(--c1)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} /></div>
              <button type="submit" style={{ background: 'linear-gradient(135deg,var(--c1),var(--c2))', color: '#fff', padding: '16px 32px', borderRadius: 14, border: 'none', fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: '1rem', fontWeight: 800, transition: 'all 0.25s', boxShadow: '0 8px 30px rgba(123,47,255,0.35)' }}
                onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 14px 50px rgba(123,47,255,0.55)'; }}
                onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 8px 30px rgba(123,47,255,0.35)'; }}
              >Send Message ✦</button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────
export function Footer() {
  return (
    <footer style={{ padding: '40px 60px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, position: 'relative', zIndex: 2 }}>
      <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: '1.1rem', fontWeight: 700, background: 'linear-gradient(135deg,var(--c1),var(--c2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Ankita Kadam.</div>
      <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>© 2025 Ankita Kadam · Built with ❤️ from Hyderabad 🇮🇳</div>
      <div style={{ display: 'flex', gap: 24 }}>
        {[[portfolioData.linkedin, 'LinkedIn'], [portfolioData.github, 'GitHub']].map(([href, label]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--c2)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >{label}</a>
        ))}
      </div>
    </footer>
  );
}