export function getLogoSize(aspect: number, isMobile = false) {
  const area = 11000;
  const height = Math.sqrt(area / aspect);
  const width = height * aspect;
  const scale = Math.min(1, 190 / width, 74 / height);
  const mobileScale = isMobile ? 0.82 : 1;

  return {
    width: Math.round(width * scale * mobileScale),
    height: Math.round(height * scale * mobileScale),
  };
}
