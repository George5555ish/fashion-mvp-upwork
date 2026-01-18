import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            GRAPESLAB
          </Link>

          {/* Navigation - Hidden on mobile, shown on desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
            >
              New Arrival
            </Link>
            <Link 
              to="/" 
              className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
            >
              Women
            </Link>
            <Link 
              to="/" 
              className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
            >
              Men
            </Link>
            <Link 
              to="/" 
              className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
            >
              Collections
            </Link>
            <Link 
              to="/" 
              className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
            >
              Sale
            </Link>
            <Link 
              to="/" 
              className="glassmorphic-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
            >
              About Us
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-2">
            <button className="glassmorphic-nav p-2 text-gray-700 hover:text-gray-900 transition-all duration-300">
              <Heart size={20} />
            </button>
            <button className="glassmorphic-nav p-2 text-gray-700 hover:text-gray-900 transition-all duration-300">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
