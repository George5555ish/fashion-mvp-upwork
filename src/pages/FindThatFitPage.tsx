import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import CuratedLooksGallery from '../components/CuratedLooksGallery';
import { usePublishedCollections } from '../hooks/usePublishedCollections';
import {
  type CuratedCollection,
  type CuratedLookSummary,
} from '../services/api';

export default function FindThatFitPage() {
  const { data, isPending, error: queryError } = usePublishedCollections();
  const [activeCollectionId, setActiveCollectionId] = useState<string>('all');

  const error = queryError ? 'Failed to load curated looks' : null;
  const loading = isPending;

  const allLooks: CuratedLookSummary[] = [
    ...(data?.collections.flatMap((collection) => collection.looks) || []),
    ...(data?.uncategorizedLooks || []),
  ];

  const activeLooks = (() => {
    if (!data) return [];
    if (activeCollectionId === 'all') return allLooks;
    if (activeCollectionId === 'uncategorized') return data.uncategorizedLooks;
    const collection = data.collections.find((item) => item.id === activeCollectionId);
    return collection?.looks || [];
  })();

  const tabs: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: allLooks.length },
    ...(data?.collections.map((collection: CuratedCollection) => ({
      id: collection.id,
      label: collection.name,
      count: collection.looks.length,
    })) || []),
  ];

  if ((data?.uncategorizedLooks.length || 0) > 0) {
    tabs.push({
      id: 'uncategorized',
      label: 'More Looks',
      count: data?.uncategorizedLooks.length || 0,
    });
  }

  return (
    <MarketingLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FindThatFit</h1>
          <p className="text-gray-600 max-w-2xl">
            Browse outfit albums with shoppable links. Tap a look to shop each piece.
          </p>
          <p className="text-gray-500 max-w-2xl mt-2">
            Updated weekly according to trends, sales and your desires.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : allLooks.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            No curated looks published yet. Check back soon.
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs
                .filter((tab) => tab.id === 'all' || tab.count > 0)
                .map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCollectionId(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCollectionId === tab.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                    <span className="ml-1.5 opacity-70">({tab.count})</span>
                  </button>
                ))}
            </div>

            <CuratedLooksGallery
              looks={activeLooks}
              emptyMessage="No looks in this album yet."
            />
          </>
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
