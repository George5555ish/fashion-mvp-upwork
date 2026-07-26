import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { DetectedItem, Product } from '../services/api';
import { useAnalysis } from '../hooks/useAnalysis';
import { Loader2, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function ResultsPage() {
  const { uploadId } = useParams<{ uploadId: string }>();
  const navigate = useNavigate();
  const analysisQuery = useAnalysis(uploadId);
  const analysis = analysisQuery.data ?? null;
  const loading = analysisQuery.isLoading || analysis?.status === 'processing';
  const error = analysisQuery.error
    ? (analysisQuery.error instanceof Error ? analysisQuery.error.message : 'Failed to load analysis')
    : null;

  const getItemLabel = (item: DetectedItem) => {
    const color = item.color?.trim();
    const category = item.category?.trim();
    if (color && category) {
      return `${color} ${category}`;
    }
    return category || 'this item';
  };

  const detectionMessage = useMemo(() => {
    if (!analysis?.detectedItems || analysis.detectedItems.length === 0) {
      return "We couldn't detect any clothing items in this image.";
    }

    const items = analysis.detectedItems;
    if (items.length === 1) {
      const item = items[0];
      return `We think your ${item.category} is a ${item.description.toLowerCase()}.`;
    }

    const categories = items.map((item) => item.category).join(', ');
    return `We detected ${items.length} items: ${categories}.`;
  }, [analysis?.detectedItems]);

  if (!uploadId) {
    navigate('/app');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600">Analyzing your outfit...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analysis || analysis.status === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">
              {error || analysis?.error || 'Failed to analyze outfit'}
            </p>
            <button
              onClick={() => navigate('/app')}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = `data:${analysis.imageMimeType};base64,${analysis.imageBase64}`;

  const getCheapestProduct = (products: Product[]): Product | null => {
    if (!products || products.length === 0) return null;
    return products.reduce((cheapest, current) =>
      current.price < cheapest.price ? current : cheapest
    );
  };

  const groupProductsBySource = (products: Product[] = []) => ({
    ebay: products.filter((product) => product.source === 'ebay'),
    shopping: products.filter((product) => product.source === 'shopping'),
    seed: products.filter((product) => !product.source || product.source === 'seed'),
  });

  const renderProductGrid = (
    products: Product[],
    cheapestProduct: Product | null,
    item: DetectedItem
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isCheapest={cheapestProduct?._id === product._id}
          savedFromUploadId={uploadId}
          detectedCategory={item.category}
          detectedColor={item.color}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6 animate-fade-in-up">
          <div className="flex items-start space-x-3">
            <ShoppingBag size={24} className="text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Analysis Results
              </h3>
              <p className="text-gray-700 text-lg">{detectionMessage}</p>
            </div>
          </div>
        </div>

        {analysis.detectedItems && analysis.detectedItems.length > 0 ? (
          <div className="space-y-12">
            {analysis.detectedItems.map((item: DetectedItem) => {
              const groupedProducts = groupProductsBySource(item.matchedProducts);
              const retailerProducts = [...groupedProducts.ebay, ...groupedProducts.shopping];
              const displayProducts = retailerProducts.length > 0
                ? retailerProducts
                : groupedProducts.seed;
              const cheapestProduct = displayProducts.length > 0
                ? getCheapestProduct(displayProducts)
                : null;
              const hasEbay = groupedProducts.ebay.length > 0;
              const hasShopping = groupedProducts.shopping.length > 0;
              const usingSeedFallback = item.matchSource === 'seed' && groupedProducts.seed.length > 0;

              return (
                <div key={item.itemId} className="bg-white rounded-lg shadow-sm p-6 animate-fade-in-up">
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                      {item.category}
                    </h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.color && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          Color: {item.color}
                        </span>
                      )}
                      {item.style && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          Style: {item.style}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Your Outfit</h4>
                      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={imageUrl}
                          alt="Uploaded outfit"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      {usingSeedFallback && (
                        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                          {`0 products for ${getItemLabel(item)}. Here are some alternatives from our catalog.`}
                        </div>
                      )}

                      {displayProducts.length > 0 && (
                        <h4 className="text-lg font-medium text-gray-900 mb-4">
                          Similar Products
                          {cheapestProduct && (
                            <span className="ml-2 text-sm font-normal text-gray-500">
                              (Cheapest: ${cheapestProduct.price.toFixed(2)})
                            </span>
                          )}
                        </h4>
                      )}

                      {hasEbay && (
                        <div className="mb-8">
                          <h5 className="text-sm font-semibold text-gray-800 mb-3">
                            On eBay ({groupedProducts.ebay.length})
                          </h5>
                          {renderProductGrid(groupedProducts.ebay, cheapestProduct, item)}
                        </div>
                      )}

                      {hasShopping && (
                        <div className={hasEbay ? 'mb-8' : 'mb-4'}>
                          <h5 className="text-sm font-semibold text-gray-800 mb-3">
                            More stores ({groupedProducts.shopping.length})
                          </h5>
                          {renderProductGrid(groupedProducts.shopping, cheapestProduct, item)}
                        </div>
                      )}

                      {usingSeedFallback && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-800 mb-3">
                            Catalog alternatives ({groupedProducts.seed.length})
                          </h5>
                          {renderProductGrid(groupedProducts.seed, cheapestProduct, item)}
                        </div>
                      )}

                      {displayProducts.length === 0 && (
                        <p className="text-gray-500 text-sm">No similar products found</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">No clothing items detected in this image.</p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => navigate('/app')}
            className="btn-primary"
          >
            Analyze Another Outfit
          </button>
        </div>
      </div>
    </div>
  );
}
