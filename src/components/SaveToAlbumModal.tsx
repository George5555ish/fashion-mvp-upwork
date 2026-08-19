import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAlbums } from '../hooks/useAlbums';
import { queryKeys } from '../lib/queryKeys';
import { createAlbum, addProductToAlbum } from '../services/api';
import { ALBUM_LIMIT, isAtLimit } from '../constants/limits';
import { getErrorMessage } from '../utils/errors';
import UsageLimitIndicator from './UsageLimitIndicator';

interface SaveToAlbumModalProps {
  productId: string;
  productName: string;
  savedFromUploadId?: string;
  detectedCategory?: string;
  detectedColor?: string;
  onClose: () => void;
  onSaved?: () => void;
}

export default function SaveToAlbumModal({
  productId,
  productName,
  savedFromUploadId,
  detectedCategory,
  detectedColor,
  onClose,
  onSaved,
}: SaveToAlbumModalProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const albumsQuery = useAlbums();
  const albums = albumsQuery.data?.albums ?? [];
  const albumLimits = albumsQuery.data?.limits ?? { current: albums.length, max: ALBUM_LIMIT };
  const albumsAtLimit = isAtLimit(albumLimits);
  const loading = albumsQuery.isLoading && !albumsQuery.data;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [creating, setCreating] = useState(false);

  const refreshAlbums = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.albums(user?.id) });
  };

  const handleSave = async (albumId: string, albumName: string) => {
    try {
      setSaving(true);
      setError(null);
      await addProductToAlbum(albumId, {
        productId,
        savedFromUploadId,
        detectedCategory,
        detectedColor,
      });
      refreshAlbums();
      setSuccess(`Saved to "${albumName}"`);
      onSaved?.();
      setTimeout(onClose, 900);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to save product'));
    } finally {
      setSaving(false);
    }
  };

  const handleCreateAndSave = async () => {
    const name = newAlbumName.trim();
    if (!name) {
      setError('Album name is required');
      return;
    }

    try {
      setCreating(true);
      setError(null);
      const album = await createAlbum(name);
      refreshAlbums();
      setNewAlbumName('');
      await handleSave(album.id, album.name);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create album'));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Save to album</h3>
            <p className="text-sm text-gray-500 line-clamp-1">{productName}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
            </div>
          ) : (
            <>
              <UsageLimitIndicator
                label="Albums used"
                limits={albumLimits}
                unit="albums"
                atLimitMessage="Album limit reached. Delete an album from the Albums page to create a new one."
              />

              {albums.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {albums.map((album) => (
                    <button
                      key={album.id}
                      type="button"
                      disabled={saving || creating}
                      onClick={() => handleSave(album.id, album.name)}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left hover:border-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-60"
                    >
                      <div className="font-medium text-gray-900">{album.name}</div>
                      <div className="text-xs text-gray-500">{album.itemCount} saved items</div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No albums yet. Create your first one below.</p>
              )}

              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Create new album</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAlbumName}
                    onChange={(e) => setNewAlbumName(e.target.value)}
                    placeholder="e.g. Summer dresses"
                    disabled={albumsAtLimit}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={handleCreateAndSave}
                    disabled={creating || saving || albumsAtLimit}
                    className="btn-primary px-3 py-2 flex items-center gap-1 text-sm disabled:opacity-60"
                  >
                    <Plus size={16} />
                    Save
                  </button>
                </div>
              </div>
            </>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
          {albumsQuery.error && !error && (
            <p className="text-sm text-red-600">Failed to load albums</p>
          )}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </div>
      </div>
    </div>
  );
}
