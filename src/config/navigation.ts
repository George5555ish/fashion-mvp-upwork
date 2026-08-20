import type { User } from '../services/api';

export interface NavItem {
  to: string;
  label: string;
}

// Canonical, left-to-right order of the primary nav links, shared across every
// header so ordering stays consistent app-wide. Closet and Albums are always
// visible (logged-out users are redirected to login by ProtectedRoute); only
// Admin is gated, on the admin role.
export function getNavItems(user: User | null): NavItem[] {
  const items: NavItem[] = [
    { to: '/', label: 'Home' },
    { to: '/findthatfit', label: 'FindThatFit' },
    { to: '/closet', label: 'Closet' },
    { to: '/app', label: 'Analyzer' },
    { to: '/albums', label: 'Albums' },
    { to: '/contact', label: 'Contact' },
  ];

  if (user?.role === 'admin') {
    items.push({ to: '/admin/dashboard', label: 'Dashboard' });
    items.push({ to: '/admin/looks', label: 'Curated Looks' });
  }

  return items;
}
