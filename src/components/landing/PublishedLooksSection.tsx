import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import CuratedLooksGallery from '../CuratedLooksGallery';
import { usePublishedCollections } from '../../hooks/usePublishedCollections';

export default function PublishedLooksSection() {
  const { data, isPending } = usePublishedCollections();

  if (isPending) {
    return (
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex justify-center py-12">
          <Loader2 className="animate-spin h-8 w-8 text-brand" />
        </div>
      </section>
    );
  }

  const hasContent =
    (data?.collections.length || 0) > 0 || (data?.uncategorizedLooks.length || 0) > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
            Curated Looks
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Styled outfit albums from our team — tap a look to shop each piece.
          </p>
        </div>

        <div className="space-y-14">
          {data?.collections.map((collection) => (
            <div key={collection.id}>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                {collection.name}
              </h3>
              <CuratedLooksGallery looks={collection.looks} />
            </div>
          ))}

          {(data?.uncategorizedLooks.length || 0) > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                More Looks
              </h3>
              <CuratedLooksGallery looks={data?.uncategorizedLooks || []} />
            </div>
          )}
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
  );
}
