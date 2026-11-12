type BrandLogoProps = {
  className?: string;
  id: string;
  tone?: 'light' | 'dark';
};

export function BrandLogo({ className = '', id, tone = 'light' }: BrandLogoProps) {
  const wordmark = tone === 'light' ? '#f5f2ee' : '#1a1814';
  const orbit = tone === 'light' ? '#f5f2ee' : '#111111';

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 440 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-orb`} x1="10" y1="50" x2="76" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#55D2D2" />
          <stop offset="1" stopColor="#1264B3" />
        </linearGradient>
        <path id={`${id}-tagline`} d="M 8 47 C 4 10, 79 4, 81 47" />
      </defs>
      <g>
        <circle cx="44" cy="53" r="29" fill={`url(#${id}-orb)`} stroke="#10212D" strokeWidth="1.4" />
        <ellipse cx="44" cy="53" rx="43" ry="17" transform="rotate(-31 44 53)" stroke={orbit} strokeWidth="4.2" />
        <ellipse cx="44" cy="53" rx="38" ry="13.5" transform="rotate(-31 44 53)" stroke="#111111" strokeWidth="1.4" />
        <text x="44" y="60" textAnchor="middle" fill="#05080B" fontFamily="Arial, Helvetica, sans-serif" fontSize="23" fontWeight="800" letterSpacing="-1.2">FK</text>
        <text fill={wordmark} fontFamily="Arial, Helvetica, sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="0.18">
          <textPath href={`#${id}-tagline`} startOffset="50%" textAnchor="middle">We Design Your Dreams</textPath>
        </text>
      </g>
      <text x="105" y="62" fill={wordmark} fontFamily="Arial, Helvetica, sans-serif" fontSize="31" fontWeight="700" letterSpacing="-1.2">Fashion Knits</text>
    </svg>
  );
}
