import React, { useRef, useEffect } from 'react';

export const GravityStarsBackground = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    let isVisible = true;
    
    const mouse = { x: -1000, y: -1000 };

    // Pause animation when offscreen to save CPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);
    
    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    const createParticle = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseX: x,
        baseY: y,
        size: Math.random() * 1.5 + 0.5,
      };
    };

    const drawParticle = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.5)'; // slate-900 with opacity
      ctx.fill();
    };

    const updateParticle = (particle) => {
      const maxDistance = 150;
      let dx = mouse.x - particle.x;
      let dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      let force = (maxDistance - distance) / maxDistance;
      if (force < 0) force = 0;

      if (distance < maxDistance) {
        particle.x -= forceDirectionX * force * 3;
        particle.y -= forceDirectionY * force * 3;
      } else {
        if (particle.x !== particle.baseX) {
          dx = particle.x - particle.baseX;
          particle.x -= dx / 20;
        }
        if (particle.y !== particle.baseY) {
          dy = particle.y - particle.baseY;
          particle.y -= dy / 20;
        }
      }

      particle.baseX += particle.vx;
      particle.baseY += particle.vy;

      if (particle.baseX < 0 || particle.baseX > canvas.width) particle.vx = -particle.vx;
      if (particle.baseY < 0 || particle.baseY > canvas.height) particle.vy = -particle.vy;

      drawParticle(particle);
    };

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 12000; // density
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(createParticle());
      }
    };

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
          updateParticle(particles[i]);
        }
        
        // Connect particles
        connect();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = dx * dx + dy * dy;
          
          if (distance < 12000) {
            let opacityValue = 1 - (distance / 12000);
            ctx.strokeStyle = `rgba(15, 23, 42, ${opacityValue * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    window.addEventListener('resize', resize);
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    resize();
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
