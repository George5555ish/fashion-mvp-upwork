import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import BrandLogo from '../BrandLogo';
import { siteConfig } from '../../config/site';

const productLinks = [
  { to: '/app', label: 'Outfit Analyzer' },
  { to: '/findthatfit', label: 'FindThatFit' },
  { to: '/closet', label: "Cher's Closet" },
  { to: '/albums', label: 'Albums' },
];

const companyLinks = [
  { to: '/about', label: 'About us' },
  { to: '/contact', label: 'Contact' },
  { to: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
];

const supportLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/contact', label: 'Help Center' },
];

const socialLinks = [
  {
    label: 'Instagram',
    handle: 'theoutfind',
    href: 'https://instagram.com/theoutfind',
    icon: 'instagram' as const,
  },
  {
    label: 'TikTok',
    handle: '@theoutfind',
    href: 'https://www.tiktok.com/@theoutfind',
    icon: 'tiktok' as const,
  },
];

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-gray-400 hover:text-brand-light transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LandingFooter() {
  return (
    <footer className="bg-[#2C1810] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <BrandLogo variant="white" />
            </div>
            <p className="text-sm text-gray-400 max-w-sm mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label}: ${social.handle}`}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-light hover:bg-brand/20 transition-colors"
                >
                  {social.icon === 'instagram' ? <Instagram size={18} /> : <TikTokIcon size={18} />}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Products" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
