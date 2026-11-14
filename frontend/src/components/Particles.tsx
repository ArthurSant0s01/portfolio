import { useEffect, useRef } from "react";

// Draw a light, static particle texture once. Avoids a permanent animation loop.
export default function Particles({ density = 34, color = "255,255,255" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const count = Math.min(density, Math.floor((width * height) / 26000));
      for (let index = 0; index < count; index += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 1.2 + 0.35;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color},${Math.random() * 0.25 + 0.12})`;
        context.fill();
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [density, color]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />;
}
