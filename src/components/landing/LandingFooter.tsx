import { Link } from 'react-router-dom';
import { Sparkles, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { siteConfig } from '../../config/site';

const productLinks = [
  { to: '/app', label: 'Outfit Analyzer' },
  { to: '/findthatfit', label: 'FindThatFit' },
  { to: '/closet', label: 'Closet Bestie' },
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
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-gray-400 hover:text-sky-light transition-colors"
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
    <footer className="bg-[#1A1D21] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-sky" strokeWidth={1.5} />
              <span className="text-xl font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sky hover:bg-sky/20 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Products" links={productLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-md">
            Amazon Associates participant. We may earn fees from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
