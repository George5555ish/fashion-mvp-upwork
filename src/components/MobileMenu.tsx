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

  const navLinkClassName =
    'group flex items-center justify-between py-4 border-b border-white/15';

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative h-full flex flex-col p-3 transition-transform duration-500 ease-out ${
          open ? 'translate-y-0' : '-translate-y-4'
        }`}
      >
        <div className="glass-menu rounded-3xl flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/15">
            <div className="rounded-2xl glass-white px-3 py-2">
              <BrandLogo heightClass="h-14" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-6 sm:px-10 gap-1 overflow-y-auto">
            {navItems.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={navLinkClassName}
              >
                <span className="font-serif text-3xl sm:text-4xl text-white group-hover:text-white/90 transition-colors">
                  {link.label}
                </span>
                <ArrowRight
                  size={22}
                  className="text-white group-hover:translate-x-1 transition-all"
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
                className={`${navLinkClassName} text-left`}
              >
                <span className="font-serif text-3xl sm:text-4xl text-white group-hover:text-white/90 transition-colors">
                  Log out
                </span>
                <ArrowRight
                  size={22}
                  className="text-white group-hover:translate-x-1 transition-all"
                />
              </button>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className={navLinkClassName}
              >
                <span className="font-serif text-3xl sm:text-4xl text-white group-hover:text-white/90 transition-colors">
                  Log in
                </span>
                <ArrowRight
                  size={22}
                  className="text-white group-hover:translate-x-1 transition-all"
                />
              </Link>
            )}
          </nav>

          <div className="px-6 sm:px-10 pb-8 pt-4 border-t border-white/15">
            <Link
              to="/app"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-white/35 bg-white/10 text-white font-medium text-lg hover:bg-white/20 transition-colors"
            >
              Try OutFind
              <ArrowRight size={20} className="text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
