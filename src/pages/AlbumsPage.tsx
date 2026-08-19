import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { FolderPlus, Loader2, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import UsageLimitIndicator from '../components/UsageLimitIndicator';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { useAlbums } from '../hooks/useAlbums';
import { queryKeys } from '../lib/queryKeys';
import { createAlbum, deleteAlbum } from '../services/api';
import { ALBUM_LIMIT, isAtLimit } from '../constants/limits';
import { getErrorMessage } from '../utils/errors';

function AlbumsPageContent() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const albumsQuery = useAlbums();
  const albums = albumsQuery.data?.albums ?? [];
  const albumLimits = albumsQuery.data?.limits ?? { current: albums.length, max: ALBUM_LIMIT };
  const albumsAtLimit = isAtLimit(albumLimits);
  const loading = albumsQuery.isLoading && !albumsQuery.data;

  const [error, setError] = useState<string | null>(null);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [creating, setCreating] = useState(false);

  const refreshAlbums = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.albums(user?.id) });
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    const name = newAlbumName.trim();
    if (!name) return;

    try {
      setCreating(true);
      await createAlbum(name);
      setNewAlbumName('');
      refreshAlbums();
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create album'));
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (albumId: string) => {
    if (!window.confirm('Delete this album and all saved items inside it?')) return;

    try {
      await deleteAlbum(albumId);
      refreshAlbums();
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to delete album'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Albums</h1>
            <p className="text-gray-600">Organize saved products into custom collections.</p>
          </div>
          <UsageLimitIndicator
            label="Albums used"
            limits={albumLimits}
            unit="albums"
            atLimitMessage="Album limit reached. Delete an album to create a new one."
          />
        </div>

        <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-200 p-5 mb-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newAlbumName}
            onChange={(e) => setNewAlbumName(e.target.value)}
            placeholder="New album name, e.g. Buy Later"
            disabled={albumsAtLimit}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:bg-gray-50 disabled:text-gray-400"
          />
          <button
            type="submit"
            disabled={creating || albumsAtLimit}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <FolderPlus size={18} />
            Create Album
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : albums.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            No albums yet. Save products from your analysis results to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {albums.map((album) => (
              <div key={album.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4">
                <div>
                  <Link to={`/albums/${album.id}`} className="text-lg font-semibold text-gray-900 hover:underline">
                    {album.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{album.itemCount} saved items</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(album.id)}
                  className="rounded-lg p-2 text-gray-400 hover:text-red-600 hover:bg-red-50"
                  aria-label={`Delete ${album.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        {albumsQuery.error && !error && (
          <p className="text-sm text-red-600 mt-4">Failed to load albums</p>
        )}
      </div>
    </div>
  );
}

export default function AlbumsPage() {
  return (
    <ProtectedRoute>
      <AlbumsPageContent />
    </ProtectedRoute>
  );
}
