import { Link, useLocation } from 'react-router-dom';

const adminTabs = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/looks', label: 'Curated Looks' },
];

export default function AdminSubNav() {
  const location = useLocation();

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {adminTabs.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname === tab.to
              ? 'bg-gray-900 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
