import type { User } from '../services/api';

export interface NavItem {
  to: string;
  label: string;
}

// Canonical, left-to-right order of the primary nav links, shared across every
// header so ordering stays consistent app-wide. Closet/Albums require auth and
// Admin requires the admin role, but their relative position is preserved.
export function getNavItems(user: User | null): NavItem[] {
  const items: NavItem[] = [
    { to: '/', label: 'Home' },
    { to: '/findthatfit', label: 'FindThatFit' },
  ];

  if (user) {
    items.push({ to: '/closet', label: 'Closet' });
  }

  items.push({ to: '/app', label: 'Analyzer' });

  if (user) {
    items.push({ to: '/albums', label: 'Albums' });
  }

  items.push({ to: '/contact', label: 'Contact' });

  if (user?.role === 'admin') {
    items.push({ to: '/admin/looks', label: 'Admin' });
  }

  return items;
}
