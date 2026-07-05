import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Loader2 } from 'lucide-react';
import {
  getPublishedLook,
  getPublishedLooks,
  type CuratedLook,
  type CuratedLookSummary,
} from '../../services/api';

export default function PublishedLooksSection() {
  const [looks, setLooks] = useState<CuratedLookSummary[]>([]);
  const [selectedLook, setSelectedLook] = useState<CuratedLook | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    getPublishedLooks()
      .then(setLooks)
      .catch(() => setLooks([]))
      .finally(() => setLoading(false));
  }, []);

  const openLook = async (lookId: string) => {
    try {
      setDetailLoading(true);
      setSelectedLook(await getPublishedLook(lookId));
    } catch {
      setSelectedLook(null);
    } finally {
      setDetailLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex justify-center py-12">
          <Loader2 className="animate-spin h-8 w-8 text-brand" />
        </div>
      </section>
    );
  }

  if (looks.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
              Curated Looks
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Styled outfits from our team — tap a look to shop each piece.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {looks.map((look) => (
              <button
                key={look.id}
                type="button"
                onClick={() => openLook(look.id)}
                className="text-left neuro-surface overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/4] overflow-hidden bg-surface-dark">
                  <img
                    src={`data:${look.imageMimeType};base64,${look.imageBase64}`}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{look.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {look.caption || 'Tap to shop this look'}
                  </p>
                  {look.links.length > 0 && (
                    <p className="text-xs text-brand mt-2 font-medium">
                      {look.links.length} shop link{look.links.length === 1 ? '' : 's'}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/findthatfit"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium py-3 px-6 rounded-2xl transition-colors"
            >
              View all looks
            </Link>
          </div>
        </div>
      </section>

      {(selectedLook || detailLoading) && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            {detailLoading || !selectedLook ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin h-10 w-10 text-brand" />
              </div>
            ) : (
              <div>
                <img
                  src={`data:${selectedLook.imageMimeType};base64,${selectedLook.imageBase64}`}
                  alt={selectedLook.title}
                  className="w-full max-h-[60vh] object-contain bg-surface-light"
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
                          className="flex items-center justify-between rounded-xl border border-surface-dark px-4 py-3 hover:border-brand hover:bg-surface-light transition-colors"
                        >
                          <span className="font-medium text-gray-900">{link.label}</span>
                          <ExternalLink size={16} className="text-brand" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No shop links added yet.</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedLook(null)}
                    className="mt-6 w-full sm:w-auto bg-surface-dark hover:bg-surface text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
