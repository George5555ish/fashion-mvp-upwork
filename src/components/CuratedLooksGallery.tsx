import { useState } from 'react';

import { ExternalLink } from 'lucide-react';

import LoadingImage from './LoadingImage';

import type { CuratedLookSummary } from '../services/api';

import { getCuratedLookImageSrc } from '../utils/imageUrls';



interface CuratedLooksGalleryProps {

  looks: CuratedLookSummary[];

  emptyMessage?: string;

}



export default function CuratedLooksGallery({

  looks,

  emptyMessage = 'No looks in this album yet.',

}: CuratedLooksGalleryProps) {

  const [selectedLookId, setSelectedLookId] = useState<string | null>(null);

  const selectedLook = looks.find((look) => look.id === selectedLookId) ?? null;



  if (looks.length === 0) {

    return <p className="text-sm text-gray-500 text-center py-8">{emptyMessage}</p>;

  }



  return (

    <>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {looks.map((look) => (

          <button

            key={look.id}

            type="button"

            onClick={() => setSelectedLookId(look.id)}

            className="text-left neuro-surface overflow-hidden group hover:shadow-lg transition-shadow"

          >

            <LoadingImage

              src={getCuratedLookImageSrc(look)}

              alt={look.title}

              loading="lazy"

              containerClassName="aspect-[3/4] bg-surface-dark"

              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"

            />

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



      {selectedLook && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">

            <LoadingImage

              src={getCuratedLookImageSrc(selectedLook)}

              alt={selectedLook.title}

              containerClassName="w-full max-h-[60vh] bg-surface-light"

              className="w-full max-h-[60vh] object-contain"

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

                onClick={() => setSelectedLookId(null)}

                className="mt-6 w-full sm:w-auto bg-surface-dark hover:bg-surface text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors"

              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );

}

