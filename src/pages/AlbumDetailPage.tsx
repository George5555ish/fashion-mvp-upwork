import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink, Loader2, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { useAlbum } from '../hooks/useAlbums';
import { queryKeys } from '../lib/queryKeys';
import { removeAlbumItem } from '../services/api';

function AlbumDetailPageContent() {
  const { albumId } = useParams<{ albumId: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const albumQuery = useAlbum(albumId);
  const album = albumQuery.data ?? null;
  const loading = albumQuery.isLoading && !albumQuery.data;

  const [error, setError] = useState<string | null>(null);

  const refreshAlbum = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.album(user?.id, albumId!) });
    queryClient.invalidateQueries({ queryKey: queryKeys.albums(user?.id) });
  };

  const handleRemove = async (itemId: string) => {
    if (!albumId) return;

    try {
      await removeAlbumItem(albumId, itemId);
      refreshAlbum();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/albums" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft size={16} />
          Back to albums
        </Link>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : album ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{album.name}</h1>
            <p className="text-gray-600 mb-8">{album.items.length} saved items</p>

            {album.items.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
                This album is empty.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {album.items.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 line-clamp-2">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">${item.product.price.toFixed(2)}</p>
                      {(item.detectedCategory || item.detectedColor) && (
                        <p className="text-xs text-gray-400 mt-1 capitalize">
                          Saved from {item.detectedColor} {item.detectedCategory}
                        </p>
                      )}
                      <div className="flex gap-2 mt-4">
                        <a
                          href={item.product.shopUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-1"
                        >
                          Shop
                          <ExternalLink size={14} />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="rounded-lg border border-gray-300 px-3 py-2 text-gray-500 hover:text-red-600 hover:border-red-200"
                          aria-label="Remove from album"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        {albumQuery.error && !error && (
          <p className="text-sm text-red-600 mt-4">Failed to load album</p>
        )}
      </div>
    </div>
  );
}

export default function AlbumDetailPage() {
  return (
    <ProtectedRoute>
      <AlbumDetailPageContent />
    </ProtectedRoute>
  );
}
