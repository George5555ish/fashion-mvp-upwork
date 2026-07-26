import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AnalyzerSectionProps {
  showCta?: boolean;
  plainBackground?: boolean;
}

export default function AnalyzerSection({ showCta = true, plainBackground = false }: AnalyzerSectionProps) {
  return (
    <section className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-10${plainBackground ? '' : ' landing-bg'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="w-full">
          <div className="rounded-3xl bg-[#FDE2E4]/60 p-3 sm:p-4 shadow-glass">
            <img
              src="/analyzer-hero.png"
              alt="OutFind Analyzer detecting outfit pieces and finding similar styles to shop"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs sm:text-sm font-medium tracking-[0.25em] text-rose-400 uppercase mb-4 sm:mb-6">
            Shop smart
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-tight">
            The Analyzer
          </h2>

          <p className="feature-headline mt-3 sm:mt-4 text-brand">
            The look you want. The price you&apos;ll love.
          </p>

          <hr className="my-6 sm:my-8 border-gray-300 max-w-md" />

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Find beautiful alternatives to the pieces you love without compromising your style.
            Discover affordable options that look just as good, compare prices instantly, and shop
            smarter—not harder.
          </p>

          {showCta && (
            <Link
              to="/app"
              className="mt-8 sm:mt-10 inline-flex items-center gap-3 rounded-full bg-gray-900 text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors"
            >
              TRY THE ANALYZER
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
