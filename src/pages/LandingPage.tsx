import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import FloatingBalls from '../components/FloatingBalls';
import { uploadImage, pollAnalysis } from '../services/api';
import { Loader2 } from 'lucide-react';

export default function LandingPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const navigate = useNavigate();

  const handleUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadProgress('Uploading image...');

    try {
      // Upload image
      const uploadResponse = await uploadImage(file);
      setUploadProgress('Analyzing outfit with AI...');

      // Poll for results
      await pollAnalysis(
        uploadResponse.uploadId,
        (status) => {
          if (status === 'processing') {
            setUploadProgress('Processing image...');
          }
        }
      );

      // Navigate to results page
      navigate(`/results/${uploadResponse.uploadId}`);
    } catch (error) {
      console.error('Upload/analysis error:', error);
      setUploadProgress(`Error: ${error instanceof Error ? error.message : 'Failed to process image'}`);
      setIsUploading(false);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <FloatingBalls />
      <Header />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Panel - Upload Area */}
          <div className="lg:col-span-1 animate-fade-in-up">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <ImageUpload onUpload={handleUpload} disabled={isUploading} />
              {isUploading && (
                <div className="mt-4 flex items-center justify-center space-x-2 text-gray-600">
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span className="text-sm">{uploadProgress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Center - Image/Content Area */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="text-center lg:text-left">
              <div className="mb-6 animate-fade-in-up">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-2 animate-slide-in-left">
                  FASHION
                </h1>
                <h2 className="text-4xl lg:text-6xl font-light text-gray-500 animate-slide-in-right">
                  DEFINES YOU
                </h2>
              </div>
              
              <p className="text-gray-600 mb-6 max-w-md mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                Discover trendy collections crafted for confidence, comfort, and flair. 
                Be the first to wear what's trending.
              </p>

              <button
                onClick={() => {
                  const input = document.querySelector('input[type="file"]') as HTMLInputElement | null;
                  input?.click();
                }}
                disabled={isUploading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in-up animation-delay-400 hover:scale-105 transition-transform duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Right Panel - Info */}
          <div className="lg:col-span-1 animate-fade-in-up animation-delay-300">
            <div className="space-y-6">
              {/* Rating Section */}
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 animate-fade-in-up">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-400">☆</span>
                  <span className="text-sm font-medium text-gray-700">
                    4.9 Average people ratings
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                    />
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 animate-fade-in-up animation-delay-100">
                <p className="text-sm font-medium text-gray-700 mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  <a href="#" className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400">
                    <span className="text-xs">IG</span>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400">
                    <span className="text-xs">FB</span>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400">
                    <span className="text-xs">TW</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <span className="text-xs mb-2">SCROLL DOWN</span>
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
