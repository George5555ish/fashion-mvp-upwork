import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Camera,
  ChevronLeft,
  ChevronRight,
  Heart,
  Music,
  Palmtree,
  ShoppingBag,
  Sparkles,
  Sun,
} from 'lucide-react';
import LandingHeader from '../components/landing/LandingHeader';
import LandingFooter from '../components/landing/LandingFooter';
import PublishedLooksSection from '../components/landing/PublishedLooksSection';
import { siteConfig } from '../config/site';

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

const styleCategories = [
  { icon: ShoppingBag, label: 'Old Money' },
  { icon: Music, label: 'Minimal' },
  { icon: Sun, label: 'Summer' },
  { icon: Briefcase, label: 'Office' },
  { icon: Palmtree, label: 'Vacation' },
  { icon: Heart, label: 'Date Night' },
];

const sizes = ['S', 'Medium', 'L', 'XL', '2XL'] as const;
const colors = [
  { name: 'Black', hex: '#1A1A1A' },
  { name: 'Pink', hex: '#F4A4C0' },
  { name: 'Brown', hex: '#8B5E3C' },
  { name: 'Grey', hex: '#9CA3AF' },
  { name: 'Navy', hex: '#1E3A5F' },
];

const collections = [
  {
    name: 'Violet Puff Coat',
    price: 300,
    image: '/collection-violet-coat.jpg',
  },
  {
    name: 'Leather Edge Jacket',
    price: 420,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=700&fit=crop',
  },
  {
    name: 'Emerald Silk Dress',
    price: 280,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=700&fit=crop',
  },
  {
    name: 'Cloud Puffer',
    price: 350,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=700&fit=crop',
  },
  {
    name: 'Urban Layer Coat',
    price: 390,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=700&fit=crop',
  },
];

const galleryImages = {
  hero: '/gallery-editorial.jpg',
  portrait1: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=650&fit=crop',
  portrait2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=650&fit=crop',
  cinematic: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&h=500&fit=crop',
};

export default function HomePage() {
  const [selectedSize, setSelectedSize] = useState<(typeof sizes)[number]>('Medium');
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState(styleCategories[0].label);
  const collectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, []);

  const scrollCollections = (direction: 'left' | 'right') => {
    collectionsRef.current?.scrollBy({
      left: direction === 'left' ? -280 : 280,
      behavior: 'smooth',
    });
  };

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

        {/* Style category bar */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 right-4 sm:left-8 sm:right-8 lg:left-12 lg:right-12 z-20">
          <div className="glass-brown w-full overflow-x-auto scrollbar-hide px-3 sm:px-5 py-2.5 sm:py-3">
            <div className="flex w-max mx-auto items-center justify-center gap-1 sm:gap-2">
            {styleCategories.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveCategory(label)}
                className={`shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all ${
                  activeCategory === label
                    ? 'bg-brand-light/80 text-white shadow-sm'
                    : 'text-white/90 border border-white/30 hover:bg-white/10'
                }`}
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </button>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Live Style */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-12">
            New Live Style
          </h2>

          <div className="neuro-surface p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Size selector */}
              <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`neuro-btn w-12 h-12 sm:w-14 sm:h-14 text-xs sm:text-sm font-medium ${
                      selectedSize === size ? 'neuro-btn-active' : 'text-gray-600'
                    }`}
                  >
                    {size === 'Medium' ? 'M' : size}
                  </button>
                ))}
              </div>

              {/* Product image */}
              <div className="flex-1 flex flex-col items-center order-1 lg:order-2">
                <div className="w-48 sm:w-56 lg:w-64 aspect-square rounded-3xl overflow-hidden shadow-neuro-sm bg-white mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
                    alt="Minimalism Shirt"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Minimalism Shirt</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedColor} · {selectedSize}
                </p>
              </div>

              {/* Color selector */}
              <div className="flex lg:flex-col gap-3 order-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`neuro-btn w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center ${
                      selectedColor === color.name ? 'ring-2 ring-brand ring-offset-2' : ''
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-white/50"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-10 gap-4">
              <div className="flex gap-3">
                <button type="button" className="neuro-btn w-11 h-11 flex items-center justify-center text-gray-600">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" className="neuro-btn w-11 h-11 flex items-center justify-center text-gray-600">
                  <ChevronRight size={20} />
                </button>
              </div>

              <Link
                to="/app"
                className="flex-1 max-w-md flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium py-4 px-6 rounded-2xl transition-colors shadow-lg shadow-brand/30"
              >
                <ShoppingBag size={20} />
                Add to cart — $199
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublishedLooksSection />

      {/* Our Collections */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-12">
            Our Collections
          </h2>

          <div
            ref={collectionsRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {collections.map((item) => (
              <div
                key={item.name}
                className="snap-center shrink-0 w-56 sm:w-64 neuro-surface overflow-hidden group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="glass-pill px-3 py-1.5 text-xs font-semibold text-gray-800">
                      By ${item.price}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between gap-2">
                  <p className="font-medium text-gray-800 text-sm truncate">{item.name}</p>
                  <Link
                    to="/findthatfit"
                    className="shrink-0 neuro-btn px-4 py-2 text-xs font-medium text-gray-700 hover:text-brand"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => scrollCollections('left')}
              className="neuro-btn w-11 h-11 flex items-center justify-center text-gray-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollCollections('right')}
              className="neuro-btn w-11 h-11 flex items-center justify-center text-gray-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Fashion Gallery */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-12">
            Fashion Gallery
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-neuro aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
              <img
                src={galleryImages.hero}
                alt="Fashion editorial"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-row lg:flex-col gap-4 sm:gap-6">
              <div className="flex-1 rounded-3xl overflow-hidden shadow-neuro aspect-[3/4]">
                <img
                  src={galleryImages.portrait1}
                  alt="Street style portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden shadow-neuro aspect-[3/4]">
                <img
                  src={galleryImages.portrait2}
                  alt="Runway look"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="relative mt-4 sm:mt-6 rounded-3xl overflow-hidden shadow-neuro aspect-[21/9] min-h-[200px] sm:min-h-[280px]">
            <img
              src={galleryImages.cinematic}
              alt="Urban fashion walk"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-7 h-7 text-brand-light" strokeWidth={1.5} />
                <span className="text-2xl sm:text-3xl font-semibold text-white">{siteConfig.name}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-200 max-w-md">
                Take your style to the next level with us
              </p>
              <Link
                to="/app"
                className="mt-6 glass-pill px-6 py-3 text-sm font-medium text-white hover:bg-white/30 transition-colors"
              >
                Try the Outfit Analyzer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
