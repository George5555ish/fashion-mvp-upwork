import { Link } from 'react-router-dom';
import MarketingLayout from '../components/MarketingLayout';
import { siteConfig } from '../config/site';
import { Camera, Search, Tag, Sparkles, Shirt, ShoppingBag } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Upload Any Outfit',
    description:
      'Snap or upload a photo of any look you love. Our AI analyzes tops, bottoms, shoes, bags, and accessories.',
  },
  {
    icon: Search,
    title: 'AI Item Detection',
    description:
      'We identify each clothing piece with category, color, and style details so you know exactly what to shop for.',
  },
  {
    icon: Tag,
    title: 'Find Affordable Dupes',
    description:
      'Discover budget-friendly alternatives for every detected item without sacrificing your personal style.',
  },
  {
    icon: ShoppingBag,
    title: 'Shop With Confidence',
    description:
      'Browse curated product recommendations and shop through trusted affiliate links, including Amazon.',
  },
];

const steps = [
  { number: '01', title: 'Upload a photo', text: 'Share an outfit image from your camera roll or desktop.' },
  { number: '02', title: 'AI identifies items', text: 'Our vision model detects each clothing piece in seconds.' },
  { number: '03', title: 'Browse & shop', text: 'View similar products and affordable dupes with direct shop links.' },
];

export default function HomePage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <Sparkles size={14} />
              {siteConfig.tagline}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Turn any outfit photo into a{' '}
              <span className="text-gray-500">shopping list</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              {siteConfig.name} uses AI image recognition to detect clothing in your photos,
              recommend similar products, and help you find affordable dupes — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/app" className="btn-primary text-center">
                Try the Outfit Analyzer
              </Link>
              <Link to="/about" className="btn-secondary text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From inspiration to shopping links in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step) => (
              <div key={step.number} className="text-center p-6">
                <div className="text-4xl font-bold text-gray-200 mb-3">{step.number}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-900 text-white flex items-center justify-center mb-4">
                  <feature.icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon teaser */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">More coming soon</h2>
              <p className="text-gray-300 mb-6">
                We&apos;re building saved albums, a digital closet, outfit combinations,
                and curated looks from your favorite creators.
              </p>
              <Link to="/contact" className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Get in touch
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Save to Albums', 'Closet Bestie', 'Outfit Builder', 'Shop My Looks'].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/10"
                >
                  <Shirt size={18} className="text-gray-300 flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to analyze your first look?</h2>
          <p className="text-gray-600 mb-8">
            Upload an outfit photo and let AI find the pieces for you.
          </p>
          <Link to="/app" className="btn-primary">
            Open Outfit Analyzer
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
