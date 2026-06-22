import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AppNav() {
  const { user, logout } = useAuth();

  return (
    <nav className="hidden md:flex items-center space-x-2">
      <Link to="/" className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300">
        Home
      </Link>
      <Link to="/app" className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300">
        Analyzer
      </Link>
      <Link to="/findthatfit" className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300">
        FindThatFit
      </Link>
      {user && (
        <>
          <Link to="/albums" className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300">
            Albums
          </Link>
          <Link to="/closet" className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300">
            Closet
          </Link>
        </>
      )}
      {user?.role === 'admin' && (
        <Link to="/admin/looks" className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300">
          Admin
        </Link>
      )}
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
