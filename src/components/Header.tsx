import BrandLogo from './BrandLogo';
import AppNav from './AppNav';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <BrandLogo heightClass="h-20 sm:h-24" />
          <AppNav />
        </div>
      </div>
    </header>
  );
}
