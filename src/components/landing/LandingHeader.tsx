import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import BrandLogo from '../BrandLogo';
import { useAuth } from '../../contexts/AuthContext';
import { getNavItems } from '../../config/navigation';

export default function LandingHeader() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = useMemo(() => getNavItems(user), [user]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const linkClassName =
    'px-2 lg:px-3 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/15 transition-colors whitespace-nowrap';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-3 lg:px-4 pt-3">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-2 sm:px-3 py-2.5 flex items-center justify-between gap-3">
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
            className="w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-white/15 transition-colors lg:hidden shrink-0"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className="absolute inset-0 bg-[#2C1810]/85 backdrop-blur-md"
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div
          className={`relative h-full flex flex-col transition-transform duration-500 ease-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <BrandLogo heightClass="h-16" />
            <button
              type="button"
              onClick={closeMenu}
              className="w-11 h-11 rounded-full border border-white/25 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-2">
            {navItems.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="group flex items-center justify-between py-4 border-b border-white/10"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span className="font-serif text-3xl sm:text-4xl text-white group-hover:text-brand-light transition-colors">
                  {link.label}
                </span>
                <ArrowRight
                  size={22}
                  className="text-white/40 group-hover:text-brand-light group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}

            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="group flex items-center justify-between py-4 border-b border-white/10 text-left"
              >
                <span className="font-serif text-3xl sm:text-4xl text-white group-hover:text-brand-light transition-colors">
                  Log out
                </span>
                <ArrowRight
                  size={22}
                  className="text-white/40 group-hover:text-brand-light group-hover:translate-x-1 transition-all"
                />
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="group flex items-center justify-between py-4 border-b border-white/10"
              >
                <span className="font-serif text-3xl sm:text-4xl text-white group-hover:text-brand-light transition-colors">
                  Log in
                </span>
                <ArrowRight
                  size={22}
                  className="text-white/40 group-hover:text-brand-light group-hover:translate-x-1 transition-all"
                />
              </Link>
            )}
          </nav>

          <div className="px-8 sm:px-12 pb-10 pt-4">
            <Link
              to="/app"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-brand hover:bg-brand-dark text-white font-medium text-lg transition-colors"
            >
              Try OutFind
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
