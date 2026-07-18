import { useState } from 'react';
import { Menu } from 'lucide-react';
import BrandLogo from './BrandLogo';
import AppNav from './AppNav';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <BrandLogo heightClass="h-20 sm:h-24" />
            <AppNav />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors md:hidden shrink-0"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
