import { useParams } from 'react-router-dom';
import { Loader2, Shirt } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import { useSharedOutfit } from '../hooks/useSharedOutfit';

export default function SharedOutfitPage() {
  const { shareId } = useParams<{ shareId: string }>();
  const outfitQuery = useSharedOutfit(shareId);
  const outfit = outfitQuery.data ?? null;
  const loading = outfitQuery.isLoading && !outfitQuery.data;
  const error = !shareId
    ? 'Invalid share link'
    : outfitQuery.error
      ? 'This outfit link is invalid or no longer available'
      : null;

  return (
    <MarketingLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
            <p className="text-gray-600">{error}</p>
          </div>
        ) : outfit ? (
          <>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-600 mb-4">
                <Shirt size={16} />
                Outfit share
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{outfit.name}</h1>
              <p className="text-gray-600">
                {outfit.creatorName} is planning to wear this look
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {outfit.items.map((item) => (
                  <div key={item.id} className="rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={`data:${item.imageMimeType};base64,${item.imageBase64}`}
                      alt={item.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500 capitalize mt-1">
                        {item.color} {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </MarketingLayout>
  );
}
