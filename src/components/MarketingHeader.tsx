import { Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/app', label: 'Try the App' },
  { to: '/findthatfit', label: 'FindThatFit' },
  { to: '/contact', label: 'Contact' },
];

export default function MarketingHeader() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <BrandLogo />

          <nav className="hidden lg:flex items-center gap-1">
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
            {user && (
              <>
                <Link to="/albums" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  Albums
                </Link>
                <Link to="/closet" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  Closet
                </Link>
              </>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin/looks" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <button type="button" onClick={logout} className="btn-secondary text-sm py-2 px-4 hidden md:inline-block">
                Log out
              </button>
            ) : (
              <Link to="/login" className="btn-secondary text-sm py-2 px-4 hidden md:inline-block">
                Log in
              </Link>
            )}
            <Link to="/app" className="btn-primary text-sm py-2 px-4">
              Try App
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
