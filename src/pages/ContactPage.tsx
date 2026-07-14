import MarketingLayout from '../components/MarketingLayout';
import { siteConfig } from '../config/site';
import { Instagram, Mail, MessageCircle } from 'lucide-react';

const socialLinks = [
  {
    label: 'Instagram',
    handle: '@theoutfind',
    href: 'https://instagram.com/theoutfind',
    icon: 'instagram' as const,
  },
  {
    label: 'TikTok',
    handle: '@theoutfind',
    href: 'https://www.tiktok.com/@theoutfind',
    icon: 'tiktok' as const,
  },
];

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  );
}

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

        <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-1">Follow us</h2>
          <p className="text-gray-600 text-sm mb-4">
            Keep up with the latest looks and drops.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label}: ${social.handle}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {social.icon === 'instagram' ? <Instagram size={20} /> : <TikTokIcon size={20} />}
                <span className="text-sm font-medium">{social.label}</span>
                <span className="text-sm text-gray-500">{social.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
