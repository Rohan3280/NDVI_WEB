'use client';

import { useEffect } from 'react';

export default function BackgroundFX() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg';
    document.body.appendChild(canvas);

    const c = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: any[] = Array(120).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));

    function draw() {
      c.clearRect(0, 0, w, h);
      particles.forEach(p => {
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle = '#00ff88';
        c.fill();
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    return () => {
      canvas.remove();
    };
  }, []);

  return (
    <canvas
      id="bg"
      className="fixed top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none"
    />
  );
}
