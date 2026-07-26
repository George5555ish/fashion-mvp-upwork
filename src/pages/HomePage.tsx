import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera } from 'lucide-react';
import LandingHeader from '../components/landing/LandingHeader';
import LandingFooter from '../components/landing/LandingFooter';
import DigitalClosetSection from '../components/landing/DigitalClosetSection';
// import PublishedLooksSection from '../components/landing/PublishedLooksSection';

const heroSlides = [
  {
    src: '/hero-casual.png',
    alt: 'Casual street style at night',
  },
  {
    src: '/hero-evening.png',
    alt: 'Formal evening dresses with embellished clutches',
  },
];

const HERO_INTERVAL_MS = 5000;

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="landing-bg min-h-screen">
      <LandingHeader />

      {/* Hero — full-bleed carousel */}
      <section className="relative h-screen w-full overflow-hidden landing-bg">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover object-[center_70%] transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20 pointer-events-none" />

        <div className="absolute left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2">
          <div className="flex flex-col gap-2 p-2 rounded-full glass-dark">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="group flex items-center justify-center"
              >
                <span
                  className={`block w-1 rounded-full transition-all duration-500 ${
                    index === activeSlide
                      ? 'h-14 bg-brand shadow-[0_0_12px_rgba(139,94,60,0.8)]'
                      : 'h-6 bg-white/35 group-hover:bg-white/55'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="absolute left-12 sm:left-20 lg:left-28 top-1/2 -translate-y-1/2 z-20 max-w-md lg:max-w-xl">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight drop-shadow-lg">
            Your personal stylist.
            <br />
            <span className="italic text-brand-light">Your digital Closet.</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed drop-shadow max-w-md">
            Find outfits, discover dupes, organize your wardrobe, and shop every look—all in one place.
          </p>
          <Link
            to="/app"
            className="mt-6 sm:mt-8 inline-flex items-center gap-2 glass-pill-dark px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-medium hover:bg-black/70 transition-colors"
          >
            Try OutFind
            <ArrowRight size={20} />
          </Link>
        </div>

        <Link
          to="/app"
          className="absolute right-6 sm:right-12 lg:right-20 bottom-28 sm:bottom-36 z-20 glass rounded-full w-32 h-32 sm:w-36 sm:h-36 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/40 transition-all group"
        >
          <Camera size={24} className="text-white group-hover:scale-110 transition-transform" />
          <span className="text-sm sm:text-base font-medium text-white leading-tight px-3">
            Find This Look
          </span>
        </Link>
      </section>

      {/* FindThatFit — split layout */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="w-full">
            <div className="rounded-3xl bg-[#FDE2E4]/60 p-3 sm:p-4 shadow-glass">
              <img
                src="/findthatfit-hero.png"
                alt="Curated beach outfit with shoppable pieces in a digital closet layout"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>

          <div className="max-w-xl lg:max-w-none">
            <p className="text-xs sm:text-sm font-medium tracking-[0.25em] text-rose-400 uppercase mb-4 sm:mb-6">
              Discover
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-tight">
              FindThatFit
            </h2>

            <p className="feature-headline mt-3 sm:mt-4 text-sky-dark">
              Inspiration, made shoppable.
            </p>

            <hr className="my-6 sm:my-8 border-gray-300 max-w-md" />

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Discover curated looks for every occasion, each instantly shoppable. Every week,
              explore the latest trends, the best sales, and handpicked pieces worth buying—all
              in one place, without the endless searching.
            </p>

            <Link
              to="/findthatfit"
              className="mt-8 sm:mt-10 inline-flex items-center gap-3 rounded-full bg-gray-900 text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors"
            >
              EXPLORE LOOKS
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <DigitalClosetSection />

      {/* Curated looks on homepage — hidden for now
      <PublishedLooksSection />
      */}

      <LandingFooter />
    </div>
  );
}
