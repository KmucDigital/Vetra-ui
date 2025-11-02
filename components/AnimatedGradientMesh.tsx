"use client";

import { useEffect, useRef } from "react";

/**
 * Animated gradient mesh background
 * Creates beautiful, flowing color gradients
 */
export function AnimatedGradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Gradient colors
    const colors = [
      { r: 126, g: 34, b: 206 },  // Purple
      { r: 209, g: 9, b: 76 },    // Pink
      { r: 47, g: 109, b: 255 },  // Blue
      { r: 139, g: 92, b: 246 },  // Light Purple
    ];

    const drawGradient = () => {
      time += 0.002;

      // Create gradient mesh
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

      colors.forEach((color, i) => {
        const offset = (Math.sin(time + i) + 1) / 2;
        const r = color.r + Math.sin(time + i) * 20;
        const g = color.g + Math.sin(time + i + 1) * 20;
        const b = color.b + Math.sin(time + i + 2) * 20;

        gradient.addColorStop(offset, `rgba(${r}, ${g}, ${b}, 0.15)`);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add noise/grain effect
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10;
        data[i] = Math.max(0, Math.min(255, data[i]! + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1]! + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2]! + noise));
      }

      ctx.putImageData(imageData, 0, 0);

      animationFrameId = requestAnimationFrame(drawGradient);
    };

    drawGradient();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
