import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import BrandLogo from './BrandLogo';
import MobileMenu from './MobileMenu';
import AccountNavLink from './AccountNavLink';
import { useAuth } from '../contexts/AuthContext';
import { getNavItems } from '../config/navigation';

export default function MarketingHeader() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navItems = getNavItems(user);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <BrandLogo heightClass="h-20 sm:h-24" />

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((link) => (
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

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <AccountNavLink
                  className="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                  iconSize={22}
                />
                <button type="button" onClick={logout} className="btn-secondary text-sm py-2 px-4 hidden md:inline-block">
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-secondary text-sm py-2 px-4 hidden md:inline-block">
                Log in
              </Link>
            )}
            <Link to="/app" className="btn-primary text-sm py-2 px-4">
              Try App
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors lg:hidden shrink-0"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>
    </header>

    <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
