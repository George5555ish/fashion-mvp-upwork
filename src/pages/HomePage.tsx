import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Camera,
} from 'lucide-react';
import LandingHeader from '../components/landing/LandingHeader';
import LandingFooter from '../components/landing/LandingFooter';
import PublishedLooksSection from '../components/landing/PublishedLooksSection';

const heroSlides = [
  {
    src: '/hero-dress.png',
    alt: 'Evening look with floral black dress',
  },
  {
    src: '/hero-casual.png',
    alt: 'Casual street style at night',
  },
  {
    src: '/hero-evening.png',
    alt: 'Formal evening dresses with embellished clutches',
  },
  {
    src: '/hero-accessory.png',
    alt: 'Espresso martini beaded handbag',
  },
];

const HERO_INTERVAL_MS = 5000;

// const styleCategories = [
//   { icon: ShoppingBag, label: 'Old Money' },
//   ...
// ];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  // const [activeCategory, setActiveCategory] = useState('Old Money');

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

        {/* Carousel indicator — left */}
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

        {/* Hero headline — left */}
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

        {/* Find This Look — glass circle right */}
        <Link
          to="/app"
          className="absolute right-6 sm:right-12 lg:right-20 bottom-28 sm:bottom-36 z-20 glass rounded-full w-32 h-32 sm:w-36 sm:h-36 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/40 transition-all group"
        >
          <Camera size={24} className="text-white group-hover:scale-110 transition-transform" />
          <span className="text-sm sm:text-base font-medium text-white leading-tight px-3">
            Find This Look
          </span>
        </Link>

        {/* Style category bar — hidden for now
        <div className="absolute bottom-6 sm:bottom-8 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 z-20">
          ...
        </div>
        */}
      </section>

      {/* New Live Style — hidden for now
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
        ...
      </section>
      */}

      <PublishedLooksSection />

      <LandingFooter />
    </div>
  );
}
