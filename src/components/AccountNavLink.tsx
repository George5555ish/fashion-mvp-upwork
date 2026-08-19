import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AccountNavLinkProps {
  className?: string;
  iconSize?: number;
  showLabel?: boolean;
  onClick?: () => void;
}

export default function AccountNavLink({
  className = '',
  iconSize = 20,
  showLabel = false,
  onClick,
}: AccountNavLinkProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Link
      to="/account"
      onClick={onClick}
      className={className}
      aria-label="My account"
      title="My account"
    >
      <UserCircle size={iconSize} aria-hidden="true" />
      {showLabel && <span>Account</span>}
    </Link>
  );
}
