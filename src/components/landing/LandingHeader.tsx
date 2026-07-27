import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import BrandLogo from '../BrandLogo';
import MobileMenu from '../MobileMenu';
import { useAuth } from '../../contexts/AuthContext';
import { getNavItems } from '../../config/navigation';

export default function LandingHeader() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = getNavItems(user);

  const linkClassName =
    'px-2 lg:px-3 py-2 rounded-xl text-sm font-medium text-gray-800 hover:bg-white/40 transition-colors whitespace-nowrap';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-3 lg:px-4 pt-3">
        <div className="glass-white rounded-2xl px-2 sm:px-3 py-2.5 flex items-center justify-between gap-3">
          <BrandLogo heightClass="h-20 sm:h-24" />

          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((link) => (
              <Link key={link.to} to={link.to} className={linkClassName}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <button type="button" onClick={logout} className={linkClassName}>
                Log out
              </button>
            ) : (
              <Link to="/login" className={linkClassName}>
                Log in
              </Link>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-800 hover:bg-white/40 transition-colors lg:hidden shrink-0"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
