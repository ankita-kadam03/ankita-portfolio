import { useState, useEffect } from 'react';

const links = ['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Blog', 'Contact'];

export default function Navbar() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '20px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(4,5,13,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.4s',
    }}>
      <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '1.4rem', fontWeight: 700, background: 'linear-gradient(135deg, var(--c1), var(--c2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
        AK.
      </div>

      <ul style={{ display: 'flex', gap: 32, listStyle: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '10px 28px', borderRadius: 100, backdropFilter: 'blur(20px)' }}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{ color: active === l.toLowerCase() ? '#fff' : 'var(--muted)', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s', letterSpacing: '0.3px' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = active === l.toLowerCase() ? '#fff' : 'var(--muted)'}
            >{l}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" style={{ background: 'linear-gradient(135deg, var(--c1), var(--c2))', color: '#fff', padding: '10px 24px', borderRadius: 100, fontSize: '0.85rem', fontWeight: 700, boxShadow: '0 0 30px rgba(123,47,255,0.3)', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 0 50px rgba(123,47,255,0.5)'; }}
        onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 0 30px rgba(123,47,255,0.3)'; }}
      >Let's Talk ✦</a>
    </nav>
  );
}
