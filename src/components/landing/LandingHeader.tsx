import { Link } from 'react-router-dom';
import {
  Search,
  User,
  ShoppingBag,
  Menu,
} from 'lucide-react';
import BrandLogo from '../BrandLogo';
import { useAuth } from '../../contexts/AuthContext';

const navLinks = [
  { to: '/findthatfit', label: 'Shop' },
  { to: '/app', label: 'Try App' },
  { to: '/about', label: 'About us' },
];

export default function LandingHeader() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 pt-4">
      <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
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
            className="neuro-btn w-9 h-9 flex items-center justify-center text-gray-700 md:hidden"
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
