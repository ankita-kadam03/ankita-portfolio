import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef();
  const ringRef = useRef();
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', move);

    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => {
      if (dotRef.current) { dotRef.current.style.width = '20px'; dotRef.current.style.height = '20px'; }
      if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px'; ringRef.current.style.borderColor = 'rgba(0,212,255,0.6)'; }
    };
    const shrink = () => {
      if (dotRef.current) { dotRef.current.style.width = '12px'; dotRef.current.style.height = '12px'; }
      if (ringRef.current) { ringRef.current.style.width = '38px'; ringRef.current.style.height = '38px'; ringRef.current.style.borderColor = 'rgba(123,47,255,0.5)'; }
    };
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position: 'fixed', width: 12, height: 12, borderRadius: '50%', background: 'var(--c1)', pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%,-50%)', mixBlendMode: 'screen', transition: 'width .2s, height .2s', boxShadow: '0 0 12px var(--c1)' }} />
      <div ref={ringRef} style={{ position: 'fixed', width: 38, height: 38, borderRadius: '50%', border: '1.5px solid rgba(123,47,255,0.5)', pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%,-50%)', transition: 'width .2s, height .2s, border-color .2s' }} />
    </>
  );
}
