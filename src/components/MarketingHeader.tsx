import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/app', label: 'Try the App' },
  { to: '/contact', label: 'Contact' },
];

export default function MarketingHeader() {
  const location = useLocation();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
            {siteConfig.name.toUpperCase()}
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link to="/app" className="btn-primary text-sm py-2 px-4 md:hidden">
            Try App
          </Link>
        </div>
      </div>
    </header>
  );
}
