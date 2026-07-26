import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { getAlbum, getAlbums } from '../services/api';
import { queryKeys } from '../lib/queryKeys';

export function useAlbums() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.albums(user?.id),
    queryFn: getAlbums,
    enabled: Boolean(user),
  });
}

export function useAlbum(albumId?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.album(user?.id, albumId!),
    queryFn: () => getAlbum(albumId!),
    enabled: Boolean(user && albumId),
  });
}
