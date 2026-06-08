import LegalPageLayout from '../components/LegalPageLayout';
import { siteConfig } from '../config/site';

export default function AffiliateDisclosurePage() {
  return (
    <LegalPageLayout title="Affiliate Disclosure">
      <p className="font-medium text-gray-900">
        {siteConfig.name} is a participant in the Amazon Services LLC Associates Program,
        an affiliate advertising program designed to provide a means for sites to earn
        advertising fees by advertising and linking to Amazon.com.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">What This Means</h2>
      <p>
        Some links on this website are affiliate links. This means that if you click on
        a link and make a purchase, we may earn a commission at no additional cost to you.
        We only recommend products and services we believe may be relevant and useful to our users.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Amazon Associates</h2>
      <p>
        As an Amazon Associate, {siteConfig.name} earns from qualifying purchases. Product
        recommendations displayed in our outfit analyzer, shopping features, and curated
        looks may include links to Amazon.com and other retailers.
      </p>
      <p>
        Prices and availability of products on Amazon are subject to change. We do not
        guarantee the accuracy of pricing information displayed on our Site. Always verify
        the current price on the retailer&apos;s website before making a purchase.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Other Affiliate Programs</h2>
      <p>
        In addition to Amazon, we may participate in other affiliate or partner programs
        with fashion retailers and brands. Any such relationships will be disclosed on
        this page or near the relevant content.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Editorial Independence</h2>
      <p>
        Affiliate relationships do not influence our AI analysis results. Clothing item
        detection is performed by our image recognition technology based on the content
        of uploaded photos. Product recommendations are generated to help you find similar
        items and affordable alternatives.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Questions</h2>
      <p>
        If you have questions about our affiliate relationships, please contact us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-gray-900 underline">
          {siteConfig.contactEmail}
        </a>.
      </p>
    </LegalPageLayout>
  );
}
