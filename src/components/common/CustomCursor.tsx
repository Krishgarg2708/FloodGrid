import React, { useEffect, useState } from 'react';
import { useFloodGrid } from '../../context/FloodGridContext';

export const CustomCursor: React.FC = () => {
  const { customCursorEnabled, theme } = useFloodGrid();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth trailing animation loop
    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailingPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (!customCursorEnabled || isTouchDevice) return null;

  const isLight = theme === 'light';

  return (
    <>
      {/* Primary sharp dot */}
      <div
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '8px' : '6px',
          height: isHovered ? '8px' : '6px',
          backgroundColor: isLight ? (isHovered ? '#0284C7' : '#0F172A') : (isHovered ? '#38BDF8' : '#22D3EE'),
          boxShadow: isLight ? '0 0 8px rgba(2, 132, 199, 0.4)' : '0 0 10px rgba(34, 211, 238, 0.8)',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`
        }}
      />
      {/* Subtle geospatial radar reticle trailing ring */}
      <div
        className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '38px' : '24px',
          height: isHovered ? '38px' : '24px',
          borderColor: isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(56, 189, 248, 0.4)',
          borderWidth: '1px',
          borderStyle: 'solid',
          backgroundColor: isHovered 
            ? (isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.08)')
            : 'transparent',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`
        }}
      />
    </>
  );
};
