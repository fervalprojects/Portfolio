'use client';

import { useEffect, useRef } from 'react';

const TILE_SIZE = 96;
const CELL_SIZE = 4;
const CELL_POSITIONS = [
  { x: 10, y: 10 },
  { x: 34, y: 10 },
  { x: 58, y: 10 },
  { x: 82, y: 10 },
  { x: 10, y: 34 },
  { x: 34, y: 34 },
  { x: 58, y: 34 },
  { x: 82, y: 34 },
  { x: 10, y: 58 },
  { x: 34, y: 58 },
  { x: 58, y: 58 },
  { x: 82, y: 58 },
  { x: 10, y: 82 },
  { x: 34, y: 82 },
  { x: 58, y: 82 },
  { x: 82, y: 82 },
] as const;

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hexToRgbChannels(color: string) {
  const normalized = color.trim();
  const hex = normalized.startsWith('#') ? normalized.slice(1) : normalized;

  if (hex.length !== 6) {
    return null;
  }

  const value = Number.parseInt(hex, 16);
  if (Number.isNaN(value)) {
    return null;
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function getThemeOpacityRange() {
  const currentTheme = document.documentElement.dataset.theme;

  if (currentTheme === 'dark') {
    return { min: 11, max: 13 };
  }

  return { min: 50, max: 60 };
}

export function AmbientMatrixGlow() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    const host = container.parentElement;
    if (!(host instanceof HTMLElement)) {
      return;
    }

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) {
      return;
    }

    let flickerTimeout: ReturnType<typeof setTimeout> | null = null;
    let resizeFrameId = 0;
    let layout = { width: 0, height: 0, columns: 0, rows: 0, dpr: 1 };
    let majorColorChannels = { r: 128, g: 255, b: 128 };

    const syncMajorColor = () => {
      const cssValue = getComputedStyle(document.documentElement).getPropertyValue('--color-major');
      const parsed = hexToRgbChannels(cssValue);

      if (parsed) {
        majorColorChannels = parsed;
      }
    };

    const resizeCanvas = () => {
      const width = Math.max(host.clientWidth, host.scrollWidth, host.offsetWidth, 1);
      const height = Math.max(host.clientHeight, host.scrollHeight, host.offsetHeight, 1);
      const dpr = window.devicePixelRatio || 1;

      container.style.width = `${width}px`;
      container.style.height = `${height}px`;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);

      layout = {
        width,
        height,
        columns: Math.ceil(width / TILE_SIZE) + 1,
        rows: Math.ceil(height / TILE_SIZE) + 1,
        dpr,
      };
    };

    const drawPattern = () => {
      if (flickerTimeout) {
        clearTimeout(flickerTimeout);
      }

      syncMajorColor();
      context.clearRect(0, 0, layout.width, layout.height);
      const opacityRange = getThemeOpacityRange();

      for (let row = 0; row < layout.rows; row += 1) {
        for (let column = 0; column < layout.columns; column += 1) {
          for (const { x, y } of CELL_POSITIONS) {
            if (Math.random() >= 0.05) {
              continue;
            }

            context.fillStyle = `rgba(${majorColorChannels.r}, ${majorColorChannels.g}, ${majorColorChannels.b}, ${randomBetween(opacityRange.min, opacityRange.max) / 100})`;
            context.fillRect(column * TILE_SIZE + x, row * TILE_SIZE + y, CELL_SIZE, CELL_SIZE);
          }
        }
      }

      flickerTimeout = setTimeout(
        () => {
          drawPattern();
        },
        randomBetween(500, 1000)
      );
    };

    const resizeObserver = new ResizeObserver(() => {
      if (resizeFrameId) {
        cancelAnimationFrame(resizeFrameId);
      }

      resizeFrameId = requestAnimationFrame(() => {
        resizeCanvas();
        drawPattern();
      });
    });

    resizeCanvas();
    drawPattern();
    resizeObserver.observe(host);

    return () => {
      if (resizeFrameId) {
        cancelAnimationFrame(resizeFrameId);
      }

      if (flickerTimeout) {
        clearTimeout(flickerTimeout);
      }

      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="ambient-matrix-glow" aria-hidden="true">
      <canvas ref={canvasRef} className="ambient-matrix-glow-canvas" />
    </div>
  );
}
