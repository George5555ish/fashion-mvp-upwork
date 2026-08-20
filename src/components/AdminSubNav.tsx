import { Link, useLocation } from 'react-router-dom';

const adminTabs = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/looks', label: 'Curated Looks' },
];

export default function AdminSubNav() {
  const location = useLocation();

  return (
    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">
        Admin section
      </p>
      <div className="flex flex-wrap gap-2">
        {adminTabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === tab.to || location.pathname.startsWith(`${tab.to}/`)
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
