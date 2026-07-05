import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';

interface BrandLogoProps {
  className?: string;
  heightClass?: string;
}

export default function BrandLogo({ className = '', heightClass = 'h-9 sm:h-10' }: BrandLogoProps) {
  return (
    <Link to="/" className={`inline-flex items-center shrink-0 ${className}`}>
      <img
        src={siteConfig.logoUrl}
        alt={siteConfig.name}
        className={`${heightClass} w-auto object-contain`}
      />
    </Link>
  );
}
