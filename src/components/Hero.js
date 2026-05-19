import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

function useTyped(words) {
  const [text, setText] = useState('');
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const word = words[wi];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, idx.current + 1));
        idx.current++;
        if (idx.current === word.length) setTimeout(() => setDeleting(true), 1600);
      } else {
        setText(word.slice(0, idx.current - 1));
        idx.current--;
        if (idx.current === 0) {
          setDeleting(false);
          setWi(w => (w + 1) % words.length);
        }
      }
    }, deleting ? 55 : 110);
    return () => clearTimeout(timeout);
  }, [text, deleting, wi, words]);

  return text;
}

function useParallax() {
  useEffect(() => {
    const handler = (e) => {
      const rx = (e.clientX / window.innerWidth - 0.5);
      const ry = (e.clientY / window.innerHeight - 0.5);
      document.querySelectorAll('.orb').forEach((o, i) => {
        const s = [0.03, 0.05, 0.02][i] || 0.03;
        o.style.transform = `translate(${rx * s * 200}px, ${ry * s * 200}px)`;
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
}

export default function Hero() {
  const typed = useTyped(portfolioData.typedRoles);
  useParallax();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 60px 80px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>

      {/* Orbs */}
      <div className="orb" style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,47,255,0.35), transparent 70%)', top: -100, left: -150, filter: 'blur(80px)', pointerEvents: 'none', transition: 'transform 0.1s' }} />
      <div className="orb" style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.25), transparent 70%)', top: -50, right: -100, filter: 'blur(80px)', pointerEvents: 'none', transition: 'transform 0.1s' }} />
      <div className="orb" style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,45,120,0.18), transparent 70%)', bottom: -100, left: '30%', filter: 'blur(80px)', pointerEvents: 'none', transition: 'transform 0.1s' }} />

      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(123,47,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(123,47,255,0.06) 1px,transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto' }}>

        {/* Badge */}
        <motion.div {...fadeUp(0.1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(123,47,255,0.12)', border: '1px solid rgba(123,47,255,0.3)', padding: '8px 20px', borderRadius: 100, fontSize: '0.8rem', fontWeight: 700, color: 'var(--c2)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 32 }}>
          <span style={{ width: 8, height: 8, background: 'var(--c4)', borderRadius: '50%', boxShadow: '0 0 8px var(--c4)', animation: 'pulse 1.5s ease-out infinite', display: 'inline-block' }} />
          Available for Work · {portfolioData.location}
        </motion.div>

        {/* Name */}
        <motion.h1 {...fadeUp(0.2)} style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(3.5rem,9vw,8rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: -4, color: '#fff', marginBottom: 8 }}>
          <span style={{ background: 'linear-gradient(135deg,var(--c1) 0%,var(--c2) 50%,var(--c4) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Ankita
          </span>
          <br />Kadam
        </motion.h1>

        {/* Typed role */}
        <motion.div {...fadeUp(0.35)} style={{ fontSize: 'clamp(1rem,2.5vw,1.5rem)', color: 'var(--muted)', fontWeight: 500, letterSpacing: -0.3, marginBottom: 24, minHeight: 40 }}>
          I build&nbsp;
          <span style={{ color: '#fff', fontWeight: 700 }}>{typed}</span>
          <span style={{ color: 'var(--c1)', animation: 'blink 1s infinite' }}>|</span>
        </motion.div>

        {/* Desc */}
        <motion.p {...fadeUp(0.5)} style={{ maxWidth: 560, margin: '0 auto 44px', color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
          {portfolioData.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.65)} style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 64, flexWrap: 'wrap' }}>
          <a href="#projects" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,var(--c1),var(--c2))', color: '#fff', padding: '16px 36px', borderRadius: 16, fontWeight: 800, fontSize: '1rem', boxShadow: '0 8px 40px rgba(123,47,255,0.4)', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 16px 60px rgba(123,47,255,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 40px rgba(123,47,255,0.4)'; }}
          >✦ &nbsp;View My Work</a>
          <a href="#contact" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: '#fff', padding: '16px 36px', borderRadius: 16, fontWeight: 700, fontSize: '1rem', backdropFilter: 'blur(10px)', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.5)'; e.currentTarget.style.background = 'rgba(123,47,255,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = ''; }}
          >Say Hello →</a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.8)} style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['LLMs', 'Specialty'], ['RAG', 'Architecture'], ['GenAI', 'Focus Area'], ['OSS', 'Contributor']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', padding: '14px 28px', borderRadius: 16, backdropFilter: 'blur(20px)', textAlign: 'center', transition: 'all 0.3s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,47,255,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = ''; }}
            >
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(135deg,var(--c1),var(--c2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{val}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: '0.72rem', letterSpacing: 2, textTransform: 'uppercase' }}>
        <div style={{ width: 1, height: 50, background: 'linear-gradient(var(--c1),transparent)', animation: 'scrollPulse 2s ease infinite' }} />
        scroll
      </div>

      <style>{`
        @keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(0,255,157,0.4)} 100%{box-shadow:0 0 0 10px transparent} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollPulse { 0%,100%{opacity:0.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.2)} }
      `}</style>
    </section>
  );
}
