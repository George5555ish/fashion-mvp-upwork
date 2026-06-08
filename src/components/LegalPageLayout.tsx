import { ReactNode } from 'react';
import MarketingLayout from './MarketingLayout';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated = 'June 8, 2026',
  children,
}: LegalPageLayoutProps) {
  return (
    <MarketingLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {lastUpdated}</p>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </MarketingLayout>
  );
}
