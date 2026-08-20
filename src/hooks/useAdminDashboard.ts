import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { getAdminDashboard } from '../services/api';
import { queryKeys } from '../lib/queryKeys';

export function useAdminDashboard() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.adminDashboard(user?.id),
    queryFn: getAdminDashboard,
    enabled: user?.role === 'admin',
    staleTime: 60 * 1000,
  });
}
