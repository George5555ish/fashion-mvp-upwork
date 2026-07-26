import { useQuery } from '@tanstack/react-query';
import { getClosetItems, getOutfits } from '../services/api';
import { queryKeys } from '../lib/queryKeys';
import { useAuth } from '../contexts/AuthContext';

export function useClosetItems() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.closetItems(user?.id),
    queryFn: getClosetItems,
    enabled: Boolean(user),
  });
}

export function useOutfits() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.outfits(user?.id),
    queryFn: getOutfits,
    enabled: Boolean(user),
  });
}
