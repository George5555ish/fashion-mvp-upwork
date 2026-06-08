import LegalPageLayout from '../components/LegalPageLayout';
import { siteConfig } from '../config/site';

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>
        {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates {siteConfig.url}
        (the &quot;Site&quot;). This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you visit our website and use our services.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Information We Collect</h2>
      <p>We may collect information about you in the following ways:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Uploaded images:</strong> When you use our outfit analyzer, you may upload
          photos. These images are processed to detect clothing items and are stored to
          provide analysis results.
        </li>
        <li>
          <strong>Usage data:</strong> We may automatically collect information such as your
          IP address, browser type, operating system, access times, and pages viewed.
        </li>
        <li>
          <strong>Contact information:</strong> If you contact us, we may collect your name,
          email address, and the content of your message.
        </li>
        <li>
          <strong>Cookies and similar technologies:</strong> We may use cookies and similar
          tracking technologies to improve your experience and analyze site traffic.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide, operate, and maintain our outfit analysis and shopping recommendation services</li>
        <li>Process uploaded images using AI image recognition technology</li>
        <li>Improve, personalize, and expand our website and services</li>
        <li>Respond to your comments, questions, and support requests</li>
        <li>Monitor and analyze usage and trends</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Third-Party Services</h2>
      <p>
        We use third-party services to operate our platform, including cloud hosting,
        database services, and AI image analysis providers. These services may process
        your data on our behalf in accordance with their own privacy policies.
      </p>
      <p>
        Our Site may contain links to third-party websites, including affiliate retailer
        sites such as Amazon.com. We are not responsible for the privacy practices of
        those third-party sites. We encourage you to review their privacy policies.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Data Retention</h2>
      <p>
        We retain uploaded images and analysis results for as long as necessary to provide
        our services and fulfill the purposes described in this policy, unless a longer
        retention period is required by law.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Your Rights</h2>
      <p>
        Depending on your location, you may have rights regarding your personal data,
        including the right to access, correct, delete, or restrict processing of your
        information. To exercise these rights, contact us at {siteConfig.contactEmail}.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Children&apos;s Privacy</h2>
      <p>
        Our services are not directed to individuals under the age of 13. We do not
        knowingly collect personal information from children under 13.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will post the updated
        policy on this page and update the &quot;Last updated&quot; date.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 pt-4">Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-gray-900 underline">
          {siteConfig.contactEmail}
        </a>.
      </p>
    </LegalPageLayout>
  );
}
