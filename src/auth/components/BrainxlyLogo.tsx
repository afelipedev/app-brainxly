/**
 * Logo Brainxly — Logomark baseado no design system
 * Formas losango/diamante em Primary/500 e Primary/700
 */
interface BrainxlyLogoProps {
  size?: number;
  className?: string;
}

export function BrainxlyLogo({ size = 48, className = "" }: BrainxlyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Forma inferior/direita - Primary/500 */}
      <path
        d="M28 8L40 24L28 40L16 24L28 8Z"
        fill="#9E77ED"
        stroke="none"
      />
      {/* Forma superior/esquerda - Primary/700 */}
      <path
        d="M20 12L32 24L20 36L8 24L20 12Z"
        fill="#6941C6"
        stroke="none"
      />
    </svg>
  );
}
