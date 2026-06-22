import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Loader2 } from 'lucide-react';
import MarketingLayout from '../components/MarketingLayout';
import { getPublishedLook, getPublishedLooks, type CuratedLook, type CuratedLookSummary } from '../services/api';

export default function FindThatFitPage() {
  const [looks, setLooks] = useState<CuratedLookSummary[]>([]);
  const [selectedLook, setSelectedLook] = useState<CuratedLook | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublishedLooks()
      .then(setLooks)
      .catch(() => setError('Failed to load curated looks'))
      .finally(() => setLoading(false));
  }, []);

  const openLook = async (lookId: string) => {
    try {
      setDetailLoading(true);
      setSelectedLook(await getPublishedLook(lookId));
      setError(null);
    } catch {
      setError('Failed to load look details');
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <MarketingLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FindThatFit</h1>
          <p className="text-gray-600 max-w-2xl">
            Curated outfit looks with shoppable affiliate links. Browse styled outfits and shop each piece.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
          </div>
        ) : looks.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
            No curated looks published yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {looks.map((look) => (
              <button
                key={look.id}
                type="button"
                onClick={() => openLook(look.id)}
                className="text-left bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-[3/4] bg-gray-100">
                  <img
                    src={`data:${look.imageMimeType};base64,${look.imageBase64}`}
                    alt={look.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-gray-900">{look.title}</h2>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{look.caption || 'Tap to shop this look'}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {(selectedLook || detailLoading) && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {detailLoading || !selectedLook ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
                </div>
              ) : (
                <div>
                  <img
                    src={`data:${selectedLook.imageMimeType};base64,${selectedLook.imageBase64}`}
                    alt={selectedLook.title}
                    className="w-full max-h-[60vh] object-contain bg-gray-100"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLook.title}</h2>
                    {selectedLook.caption && (
                      <p className="text-gray-600 mb-6 whitespace-pre-line">{selectedLook.caption}</p>
                    )}
                    {selectedLook.links.length > 0 ? (
                      <div className="space-y-3">
                        {selectedLook.links.map((link) => (
                          <a
                            key={`${link.label}-${link.url}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:border-gray-900 hover:bg-gray-50"
                          >
                            <span className="font-medium text-gray-900">{link.label}</span>
                            <ExternalLink size={16} className="text-gray-500" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No shop links added yet.</p>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedLook(null)}
                      className="btn-secondary mt-6"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

        <p className="text-sm text-gray-500 mt-10">
          Want to analyze your own outfit? <Link to="/app" className="text-gray-900 font-medium hover:underline">Try the analyzer</Link>
        </p>
      </div>
    </MarketingLayout>
  );
}
