import { Product } from '../services/api';
import { ExternalLink, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isCheapest?: boolean;
}

export default function ProductCard({ product, isCheapest = false }: ProductCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative ${isCheapest ? 'ring-2 ring-green-500' : ''}`}>
      {isCheapest && (
        <div className="absolute top-2 right-2 z-10 bg-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 text-xs font-semibold shadow-lg">
          <Tag size={12} />
          <span>Cheapest</span>
        </div>
      )}
      
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image';
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mb-2">{product.brand}</p>
        <p className={`text-lg font-bold mb-3 ${isCheapest ? 'text-green-600' : 'text-gray-900'}`}>
          ${product.price.toFixed(2)}
        </p>
        
        <a
          href={product.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center space-x-2 text-sm py-2 rounded-lg font-medium transition-colors ${
            isCheapest 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'btn-primary'
          }`}
        >
          <span>Shop Now</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
