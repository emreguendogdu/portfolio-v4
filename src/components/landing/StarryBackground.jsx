import { useEffect, useRef } from "react";

const starCount = 600;

export default function StarryBackground() {
  const canvasRef = useRef(null);
  let stars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    const generateStars = () => {
      stars.current = Array.from({ length: starCount }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.1,
        speed: 0.175, // Slow-moving effect
      }));
    };

    const animateStars = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.current.forEach((star) => {
        star.x -= star.speed;
        if (star.x < 0) star.x = canvas.width; // Reset star when it moves out

        ctx.fillStyle = `rgba(200, 200, 200, ${Math.random() * 1 + 0.75})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();
      });

      requestAnimationFrame(animateStars);
    };

    resizeCanvas();
    animateStars();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div
      className="absolute w-full h-screen bg-black -z-10 overflow-hidden"
      id="starry-bg"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0" />
    </div>
  );
}
