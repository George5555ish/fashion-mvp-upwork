import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useAuth } from '../contexts/AuthContext';
import { getNavItems } from '../config/navigation';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

// Full-screen mobile nav overlay shared by every header so phones always
// have access to the same links as desktop.
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { user, logout } = useAuth();
  const navItems = getNavItems(user);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-[#2C1810]/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative h-full flex flex-col transition-transform duration-500 ease-out ${
          open ? 'translate-y-0' : '-translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <BrandLogo heightClass="h-16" />
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-full border border-white/25 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-2 overflow-y-auto">
          {navItems.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="group flex items-center justify-between py-4 border-b border-white/10"
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
                onClose();
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
              onClick={onClose}
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
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-brand hover:bg-brand-dark text-white font-medium text-lg transition-colors"
          >
            Try OutFind
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
