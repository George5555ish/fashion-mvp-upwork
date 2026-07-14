import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getNavItems } from '../config/navigation';

export default function AppNav() {
  const { user, logout } = useAuth();
  const navItems = getNavItems(user);

  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
        >
          {item.label}
        </Link>
      ))}
      {user ? (
        <button
          type="button"
          onClick={logout}
          className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
        >
          Log out
        </button>
      ) : (
        <Link to="/login" className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300">
          Log in
        </Link>
      )}
    </nav>
  );
}
