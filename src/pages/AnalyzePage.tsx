import Header from '../components/Header';
import AnalyzerSection from '../components/landing/AnalyzerSection';
import FloatingBalls from '../components/FloatingBalls';

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <FloatingBalls />
      <Header />
      <AnalyzerSection showCta={false} plainBackground />

      <section className="relative z-10 flex flex-col items-center justify-center px-4 pb-24 text-center">
        <p className="text-3xl sm:text-4xl font-display italic text-green-700">
          Coming soon
        </p>
        <p className="mt-4 text-gray-600 max-w-md text-base sm:text-lg leading-relaxed">
          The outfit analyzer isn&apos;t ready yet — check back soon.
        </p>
      </section>
    </div>
  );
}
