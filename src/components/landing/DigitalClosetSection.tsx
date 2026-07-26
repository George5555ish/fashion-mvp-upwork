import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DigitalClosetSectionProps {
  showCta?: boolean;
}

export default function DigitalClosetSection({ showCta = true }: DigitalClosetSectionProps) {
  return (
    <section className="relative landing-bg py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="max-w-xl lg:max-w-none order-2 lg:order-1">
          <p className="text-xs sm:text-sm font-medium tracking-[0.25em] text-rose-400 uppercase mb-4 sm:mb-6">
            Organize
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-tight">
            Digital Closet
          </h2>

          <p className="feature-headline mt-3 sm:mt-4 text-sky-dark">
            Chaos out. Style in.
          </p>

          <hr className="my-6 sm:my-8 border-gray-300 max-w-md" />

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Turn your wardrobe into a digital closet. Organize every piece you own, create and
            save outfits you&apos;ll actually wear, and never forget a look you loved. Send your
            saved outfits to friends when they ask &ldquo;What are you wearing tonight?&rdquo;,
            pack for every trip without the stress, and get dressed with confidence—every single
            time.
          </p>

          {showCta && (
            <Link
              to="/closet"
              className="btn-landing-cta mt-8 sm:mt-10"
            >
              OPEN YOUR CLOSET
              <ArrowRight size={18} />
            </Link>
          )}
        </div>

        <div className="w-full order-1 lg:order-2">
          <div className="rounded-3xl bg-[#FDE2E4]/60 p-3 sm:p-4 shadow-glass">
            <img
              src="/digital-closet-hero.png"
              alt="Woman organizing outfits in a colorful digital closet collage"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
