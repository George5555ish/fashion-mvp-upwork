import { useState } from 'react';
import { Product } from '../services/api';
import { ExternalLink, Heart, Image, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SaveToAlbumModal from './SaveToAlbumModal';

interface ProductCardProps {
  product: Product;
  isCheapest?: boolean;
  savedFromUploadId?: string;
  detectedCategory?: string;
  detectedColor?: string;
}

export default function ProductCard({
  product,
  isCheapest = false,
  savedFromUploadId,
  detectedCategory,
  detectedColor,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative ${isCheapest ? 'ring-2 ring-pink-500' : ''}`}>
        {isCheapest && (
          <div className="absolute top-2 right-2 z-10 bg-pink-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 text-xs font-semibold shadow-lg">
            <Tag size={12} />
            <span>Cheapest</span>
          </div>
        )}

        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-400">
              <Image size={48} className="mb-2" />
              <span className="text-xs text-center px-2">No Image</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
            {product.name}
          </h3>
        <p className="text-gray-500 text-xs mb-2">
          {product.brand}
          {product.source === 'ebay' && (
            <span className="ml-1 text-gray-400">· via eBay</span>
          )}
          {product.source === 'shopping' && (
            <span className="ml-1 text-gray-400">· Google Shopping</span>
          )}
        </p>
          <p className={`text-lg font-bold mb-3 ${isCheapest ? 'text-pink-600' : 'text-gray-900'}`}>
            ${product.price.toFixed(2)}
          </p>

          <div className="space-y-2">
            <a
              href={product.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center space-x-2 text-sm py-2 rounded-lg font-medium transition-colors ${
                isCheapest
                  ? 'bg-pink-500 text-white hover:bg-pink-600'
                  : 'btn-primary'
              }`}
            >
              <span>Shop Now</span>
              <ExternalLink size={14} />
            </a>

            {user && (
              <button
                type="button"
                onClick={() => setShowSaveModal(true)}
                className="w-full flex items-center justify-center space-x-2 text-sm py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Heart size={14} />
                <span>Save to Album</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showSaveModal && (
        <SaveToAlbumModal
          productId={product._id}
          productName={product.name}
          savedFromUploadId={savedFromUploadId}
          detectedCategory={detectedCategory}
          detectedColor={detectedColor}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </>
  );
}
