import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getAnalysis, AnalysisResponse, DetectedItem, Product } from '../services/api';
import { Loader2, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function ResultsPage() {
  const { uploadId } = useParams<{ uploadId: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uploadId) {
      navigate('/');
      return;
    }

    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const result = await getAnalysis(uploadId);
        setAnalysis(result);
        
        // If still processing, poll for updates
        if (result.status === 'processing') {
          const interval = setInterval(async () => {
            try {
              const updated = await getAnalysis(uploadId);
              setAnalysis(updated);
              if (updated.status === 'completed' || updated.status === 'failed') {
                clearInterval(interval);
                setLoading(false);
              }
            } catch (err) {
              clearInterval(interval);
              setError(err instanceof Error ? err.message : 'Failed to fetch analysis');
              setLoading(false);
            }
          }, 2000);

          return () => clearInterval(interval);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analysis');
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [uploadId, navigate]);

  // Generate detection summary message (must be before conditional returns)
  const detectionMessage = useMemo(() => {
    if (!analysis?.detectedItems || analysis.detectedItems.length === 0) {
      return "We couldn't detect any clothing items in this image.";
    }

    const items = analysis.detectedItems;
    if (items.length === 1) {
      const item = items[0];
      return `We think your ${item.category} is a ${item.description.toLowerCase()}.`;
    } else {
      const categories = items.map(item => item.category).join(', ');
      return `We detected ${items.length} items: ${categories}.`;
    }
  }, [analysis?.detectedItems]);

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
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = analysis ? `data:${analysis.imageMimeType};base64,${analysis.imageBase64}` : '';

  // Find cheapest product for each detected item
  const getCheapestProduct = (products: Product[]): Product | null => {
    if (!products || products.length === 0) return null;
    return products.reduce((cheapest, current) => 
      current.price < cheapest.price ? current : cheapest
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Detection Summary Message */}
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

        {/* Main Content: Image and Products Side by Side */}
        {analysis.detectedItems && analysis.detectedItems.length > 0 ? (
          <div className="space-y-12">
            {analysis.detectedItems.map((item: DetectedItem) => {
              const cheapestProduct = item.matchedProducts && item.matchedProducts.length > 0
                ? getCheapestProduct(item.matchedProducts)
                : null;

              return (
                <div key={item.itemId} className="bg-white rounded-lg shadow-sm p-6 animate-fade-in-up">
                  {/* Item Header */}
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

                  {/* Image and Products Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Uploaded Image - Left Side */}
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

                    {/* Similar Products - Right Side */}
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        Similar Products
                        {cheapestProduct && (
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            (Cheapest: ${cheapestProduct.price.toFixed(2)})
                          </span>
                        )}
                      </h4>
                      
                      {item.matchedProducts && item.matchedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {item.matchedProducts.map((product) => (
                            <ProductCard
                              key={product._id}
                              product={product}
                              isCheapest={cheapestProduct?._id === product._id}
                            />
                          ))}
                        </div>
                      ) : (
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

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Analyze Another Outfit
          </button>
        </div>
      </div>
    </div>
  );
}
