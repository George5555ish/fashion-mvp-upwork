import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import CuratedLooksGallery from '../components/CuratedLooksGallery';
import AlbumCollageCard from '../components/AlbumCollageCard';
import { usePublishedCollections } from '../hooks/usePublishedCollections';
import type { CuratedLookSummary } from '../services/api';

type AlbumCard = {
  id: string;
  title: string;
  looks: CuratedLookSummary[];
};

export default function FindThatFitPage() {
  const { data, isPending, error: queryError } = usePublishedCollections();
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);

  const error = queryError ? 'Failed to load curated looks' : null;
  const loading = isPending;

  const albumCards: AlbumCard[] = [
    ...(data?.collections
      .filter((collection) => collection.looks.length > 0)
      .map((collection) => ({
        id: collection.id,
        title: collection.name,
        looks: collection.looks,
      })) || []),
  ];

  if ((data?.uncategorizedLooks.length || 0) > 0) {
    albumCards.push({
      id: 'uncategorized',
      title: 'More Looks',
      looks: data?.uncategorizedLooks || [],
    });
  }

  const activeAlbum = activeCollectionId
    ? albumCards.find((album) => album.id === activeCollectionId) ?? null
    : null;

  const totalLooks =
    albumCards.reduce((sum, album) => sum + album.looks.length, 0);

  return (
    <MarketingLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          {activeAlbum ? (
            <>
              <button
                type="button"
                onClick={() => setActiveCollectionId(null)}
                className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={16} />
                All albums
              </button>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{activeAlbum.title}</h1>
              <p className="text-gray-600">
                {activeAlbum.looks.length} look
                {activeAlbum.looks.length === 1 ? '' : 's'} · tap a look to shop each piece
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">FindThatFit</h1>
              <p className="text-gray-600 max-w-2xl">
                Browse outfit albums with shoppable links. Tap an album to explore the looks inside.
              </p>
              <p className="text-gray-500 max-w-2xl mt-2">
                Updated weekly according to trends, sales and your desires.
              </p>
            </>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : totalLooks === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            No curated looks published yet. Check back soon.
          </div>
        ) : activeAlbum ? (
          <CuratedLooksGallery
            looks={activeAlbum.looks}
            emptyMessage="No looks in this album yet."
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
            {albumCards.map((album) => (
              <AlbumCollageCard
                key={album.id}
                title={album.title}
                looks={album.looks}
                onClick={() => setActiveCollectionId(album.id)}
              />
            ))}
          </div>
        )}

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

        <p className="text-sm text-gray-500 mt-10">
          Want to analyze your own outfit?{' '}
          <Link to="/app" className="text-gray-900 font-medium hover:underline">
            Try the analyzer
          </Link>
        </p>
      </div>
    </MarketingLayout>
  );
}
