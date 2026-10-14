import type { PointerEvent } from 'react';

export function updatePointerTilt(event: PointerEvent<HTMLElement>) {
  const element = event.currentTarget;
  if (
    event.pointerType !== 'mouse' ||
    !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
  ) return;

  const bounds = element.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;

  element.style.setProperty('--tilt-x', `${(x - 0.5) * 4}deg`);
  element.style.setProperty('--tilt-y', `${(0.5 - y) * 4}deg`);
  element.style.setProperty('--glow-x', `${x * 100}%`);
  element.style.setProperty('--glow-y', `${y * 100}%`);
  element.style.setProperty('--glow-alpha', '0.14');
}

export function resetPointerTilt(event: PointerEvent<HTMLElement>) {
  const element = event.currentTarget;
  element.style.removeProperty('--tilt-x');
  element.style.removeProperty('--tilt-y');
  element.style.removeProperty('--glow-x');
  element.style.removeProperty('--glow-y');
  element.style.removeProperty('--glow-alpha');
}
