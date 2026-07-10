import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';
import BrandLogo from '../BrandLogo';
import { useAuth } from '../../contexts/AuthContext';

const navLinks = [
  { to: '/findthatfit', label: 'Shop' },
  { to: '/app', label: 'Try App' },
  { to: '/about', label: 'About us' },
  { to: '/contact', label: 'Contact' },
];

export default function LandingHeader() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 pt-4">
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <BrandLogo heightClass="h-14 sm:h-16" />

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 lg:px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-white/40 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 glass-pill px-3 py-2">
              <Search size={16} className="text-gray-500" />
              <input
                type="search"
                placeholder="Search styles..."
                className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-24 lg:w-36"
              />
            </div>

            <Link
              to={user ? '/closet' : '/login'}
              className="neuro-btn w-9 h-9 flex items-center justify-center text-gray-700"
              aria-label={user ? 'Closet' : 'Log in'}
            >
              <User size={18} />
            </Link>

            <Link
              to="/albums"
              className="neuro-btn w-9 h-9 flex items-center justify-center text-gray-700"
              aria-label="Albums"
            >
              <ShoppingBag size={18} />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="neuro-btn w-9 h-9 flex items-center justify-center text-gray-700 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
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
            <BrandLogo heightClass="h-14" />
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
            {navLinks.map((link, index) => (
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

            {user && (
              <>
                <Link
                  to="/albums"
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-4 border-b border-white/10"
                >
                  <span className="font-serif text-3xl sm:text-4xl text-white group-hover:text-brand-light transition-colors">
                    Albums
                  </span>
                  <ArrowRight size={22} className="text-white/40 group-hover:text-brand-light group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  to="/closet"
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-4 border-b border-white/10"
                >
                  <span className="font-serif text-3xl sm:text-4xl text-white group-hover:text-brand-light transition-colors">
                    Closet
                  </span>
                  <ArrowRight size={22} className="text-white/40 group-hover:text-brand-light group-hover:translate-x-1 transition-all" />
                </Link>
              </>
            )}

            {user?.role === 'admin' && (
              <Link
                to="/admin/looks"
                onClick={closeMenu}
                className="group flex items-center justify-between py-4 border-b border-white/10"
              >
                <span className="font-serif text-3xl sm:text-4xl text-white group-hover:text-brand-light transition-colors">
                  Admin
                </span>
                <ArrowRight size={22} className="text-white/40 group-hover:text-brand-light group-hover:translate-x-1 transition-all" />
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
            {!user && (
              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-3 flex items-center justify-center w-full py-4 rounded-2xl border border-white/25 text-white/90 hover:bg-white/10 transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
