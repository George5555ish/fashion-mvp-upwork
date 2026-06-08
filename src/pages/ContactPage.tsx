import MarketingLayout from '../components/MarketingLayout';
import { siteConfig } from '../config/site';
import { Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <MarketingLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-600 mb-10">
          Have a question, partnership inquiry, or feedback? We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <Mail size={24} className="text-gray-900 mb-3" />
            <h2 className="font-semibold text-gray-900 mb-1">Email</h2>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <MessageCircle size={24} className="text-gray-900 mb-3" />
            <h2 className="font-semibold text-gray-900 mb-1">Response time</h2>
            <p className="text-gray-600 text-sm">
              We typically respond within 1–2 business days.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-2">For Amazon Associates inquiries</h2>
          <p className="text-sm text-gray-600">
            This website ({siteConfig.name}) is the official platform where our affiliate
            links are displayed. Product recommendations shown in our outfit analyzer
            and shopping features may include links to Amazon and other retailers.
          </p>
        </div>
      </div>
    </MarketingLayout>
  );
}
