import { useEffect, useRef } from 'react';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

export default function FloatingBalls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create balls with different colors
    const colors = [
      'rgba(59, 130, 246, 0.3)', // blue
      'rgba(6, 182, 212, 0.3)',  // teal/cyan
      'rgba(168, 85, 247, 0.3)', // purple
      'rgba(236, 72, 153, 0.3)', // pink
      'rgba(34, 197, 94, 0.3)',  // green
    ];

    const balls: Ball[] = [];
    const ballCount = 8;

    for (let i = 0; i < ballCount; i++) {
      balls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 30 + Math.random() * 60,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.2 + Math.random() * 0.3,
      });
    }

    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball) => {
        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce off edges
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
          ball.vx *= -1;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.vy *= -1;
        }

        // Keep balls in bounds
        ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));

        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          ball.x,
          ball.y,
          0,
          ball.x,
          ball.y,
          ball.radius
        );
        gradient.addColorStop(0, ball.color.replace('0.3', ball.opacity.toString()));
        gradient.addColorStop(0.5, ball.color.replace('0.3', (ball.opacity * 0.5).toString()));
        gradient.addColorStop(1, ball.color.replace('0.3', '0'));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
