import LegalPageLayout from '../components/LegalPageLayout';
import { siteConfig } from '../config/site';

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service">
      <p>
        Welcome to {siteConfig.name}. By accessing or using our website and services
        (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do
        not agree, please do not use the Service.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Use of the Service</h2>
      <p>
        {siteConfig.name} provides an AI-powered outfit analysis tool that identifies
        clothing items in uploaded photos and suggests similar products and shopping links.
        You may use the Service for personal, non-commercial purposes unless otherwise agreed.
      </p>
      <p>You agree not to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Upload content that is illegal, harmful, or infringes on others&apos; rights</li>
        <li>Attempt to reverse engineer, disrupt, or misuse the Service</li>
        <li>Use automated systems to access the Service without permission</li>
        <li>Upload images you do not have the right to use</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Uploaded Content</h2>
      <p>
        You retain ownership of images you upload. By uploading content, you grant us a
        limited license to process, store, and display that content solely to provide
        the Service. You represent that you have the right to upload and share any
        images you submit.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">AI Analysis &amp; Recommendations</h2>
      <p>
        Our AI detection and product recommendations are provided for informational and
        inspiration purposes only. We do not guarantee the accuracy of item detection,
        product matches, or pricing. You are responsible for verifying product details
        before making any purchase.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Affiliate Links</h2>
      <p>
        The Service may include affiliate links to third-party retailers. See our{' '}
        <a href="/affiliate-disclosure" className="text-gray-900 underline">
          Affiliate Disclosure
        </a>{' '}
        for more information. We are not responsible for third-party products, services,
        or transactions.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Disclaimer of Warranties</h2>
      <p>
        The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any
        kind, whether express or implied. We do not warrant that the Service will be
        uninterrupted, error-free, or completely accurate.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.name} shall not be liable
        for any indirect, incidental, special, or consequential damages arising from your
        use of the Service.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Changes to Terms</h2>
      <p>
        We may modify these Terms at any time. Continued use of the Service after changes
        constitutes acceptance of the updated Terms.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Contact</h2>
      <p>
        Questions about these Terms? Contact us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-gray-900 underline">
          {siteConfig.contactEmail}
        </a>.
      </p>
    </LegalPageLayout>
  );
}
