import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { getAdminCollections, getAdminLooks } from '../services/api';
import { queryKeys } from '../lib/queryKeys';

export function useAdminCollections() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.adminCollections(user?.id),
    queryFn: getAdminCollections,
    enabled: Boolean(user),
  });
}

export function useAdminLooks() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.adminLooks(user?.id),
    queryFn: getAdminLooks,
    enabled: Boolean(user),
  });
}
