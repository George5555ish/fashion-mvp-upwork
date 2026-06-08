import MarketingLayout from '../components/MarketingLayout';
import { siteConfig } from '../config/site';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <MarketingLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About {siteConfig.name}</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            {siteConfig.name} is a fashion-focused web app that helps you turn outfit inspiration
            into actionable shopping recommendations. Upload a photo of any look you admire,
            and our AI-powered image recognition identifies the clothing pieces — from tops
            and jeans to shoes and bags.
          </p>

          <p>
            Once items are detected, we surface similar products and affordable dupes so you
            can shop the look without the guesswork. Whether you spotted a style on social
            media or want to recreate an outfit from a photo, {siteConfig.name} makes it easy
            to find what you&apos;re looking for.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 pt-4">What we&apos;re building</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI outfit analysis with item-by-item product recommendations</li>
            <li>Affordable dupe suggestions for every detected piece</li>
            <li>Saved albums to organize your favorite finds</li>
            <li>A digital closet for building outfit combinations</li>
            <li>Curated &quot;Shop My Looks&quot; from fashion creators</li>
          </ul>

          <p>
            We participate in affiliate programs, including the Amazon Associates Program,
            which allows us to earn commissions on qualifying purchases at no extra cost to you.
            Read our{' '}
            <Link to="/affiliate-disclosure" className="text-gray-900 underline">
              Affiliate Disclosure
            </Link>{' '}
            for more details.
          </p>

          <div className="pt-4">
            <Link to="/app" className="btn-primary">
              Try the Outfit Analyzer
            </Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
