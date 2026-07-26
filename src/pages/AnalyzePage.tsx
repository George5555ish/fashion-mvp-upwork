import Header from '../components/Header';
import AnalyzerSection from '../components/landing/AnalyzerSection';
import ImageUpload from '../components/ImageUpload';
import FloatingBalls from '../components/FloatingBalls';

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <FloatingBalls />
      <Header />
      <AnalyzerSection showCta={false} plainBackground />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-1 animate-fade-in-up">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
              <ImageUpload onUpload={() => {}} disabled comingSoon />
            </div>
          </div>

          <div className="lg:col-span-1 flex justify-center">
            <div className="text-center lg:text-left">
              <div className="mb-6 animate-fade-in-up">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-2 animate-slide-in-left">
                  OUT
                </h1>
                <h2 className="text-4xl lg:text-6xl font-light text-gray-500 animate-slide-in-right">
                  FIND
                </h2>
              </div>

              <p className="text-gray-600 mb-4 max-w-md mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                Upload an outfit photo and our AI will detect each piece, then suggest
                similar styles and affordable dupes you can shop right away.
              </p>

              <p className="text-brand font-display italic text-lg mb-6 animate-fade-in-up animation-delay-300">
                Coming soon
              </p>

              <button
                type="button"
                disabled
                className="btn-primary opacity-50 cursor-not-allowed animate-fade-in-up animation-delay-400"
              >
                Upload Outfit — Coming soon
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 animate-fade-in-up animation-delay-300">
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 animate-fade-in-up">
                <p className="text-sm font-medium text-gray-700 mb-2">What we detect</p>
                <p className="text-sm text-gray-600">
                  Tops, bottoms, dresses, shoes, bags, jackets, and accessories —
                  with color and style details for better matches.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 animate-fade-in-up animation-delay-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Find dupes</p>
                <p className="text-sm text-gray-600">
                  See similar products for each item, including budget-friendly
                  alternatives marked as the best value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
