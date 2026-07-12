import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';

interface BrandLogoProps {
  className?: string;
  heightClass?: string;
  variant?: 'default' | 'white';
}

export default function BrandLogo({
  className = '',
  heightClass = 'h-16 sm:h-20',
  variant = 'default',
}: BrandLogoProps) {
  const logoSrc = variant === 'white' ? siteConfig.logoUrlWhite : siteConfig.logoUrl;

  return (
    <Link to="/" className={`inline-flex items-center shrink-0 ${className}`}>
      <img
        src={logoSrc}
        alt={siteConfig.name}
        className={`${heightClass} w-auto object-contain`}
      />
    </Link>
  );
}
