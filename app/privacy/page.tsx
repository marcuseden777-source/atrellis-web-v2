import { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/app/components/SiteNav';
import SiteFooter from '@/app/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy | Atrellis Design & Build Singapore',
  description:
    'Read the Atrellis Pte Ltd privacy policy — how we collect, use, and protect your personal data in compliance with Singapore law.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <SiteNav breadcrumb="privacy" />

      <article className="pt-44 pb-24 px-8 max-w-3xl mx-auto prose prose-invert prose-sm prose-headings:font-black prose-headings:tracking-tight prose-p:text-white/60 prose-li:text-white/60 prose-a:text-blue-500 prose-strong:text-white/80">
        <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-6 not-prose">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl mb-12">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">
          Last updated: 1 May 2026
        </p>

        <h2>1. Who We Are</h2>
        <p>
          Atrellis Pte Ltd (&quot;Atrellis&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a Singapore-registered
          design-and-build company. Our registered office address is available upon request. For data protection
          enquiries, contact us at{' '}
          <a href="mailto:hello@atrellis.business">hello@atrellis.business</a>.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We collect personal data that you voluntarily provide when you:</p>
        <ul>
          <li>Complete our online assessment / quotation form (name, email, phone number)</li>
          <li>Contact us via WhatsApp, email, or phone</li>
          <li>Visit our website (cookies, IP address, browsing behaviour via analytics)</li>
          <li>Engage us for a project (address, property details, project requirements)</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>We use your personal data to:</p>
        <ul>
          <li>Respond to your enquiries and provide quotations</li>
          <li>Schedule site visits and manage renovation projects</li>
          <li>Send project updates and relevant communications</li>
          <li>Improve our website and services through analytics</li>
          <li>Comply with regulatory and legal obligations (e.g. BCA, HDB submissions)</li>
        </ul>

        <h2>4. Data Sharing</h2>
        <p>
          We do not sell your personal data. We may share your data with trusted third parties only as needed
          to deliver our services:
        </p>
        <ul>
          <li><strong>Regulatory bodies</strong> — BCA, URA, HDB for permit submissions</li>
          <li><strong>Professional partners</strong> — Licensed PEs, architects, and subcontractors involved in your project</li>
          <li><strong>Technology providers</strong> — Hosting (Vercel), analytics (Vercel Analytics), and communication platforms</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>
          We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy,
          or as required by law. Project-related data is typically retained for a minimum of 7 years in accordance
          with construction industry regulations in Singapore.
        </p>

        <h2>6. Cookies &amp; Analytics</h2>
        <p>
          Our website uses Vercel Analytics and Speed Insights to collect anonymised, aggregate usage data.
          These tools do not use third-party cookies and are privacy-focused by design. No personally
          identifiable information is collected through these analytics services.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          Under the Personal Data Protection Act 2012 (PDPA), you have the right to:
        </p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Withdraw consent for data collection and use</li>
          <li>Request deletion of your data (subject to legal retention requirements)</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{' '}
          <a href="mailto:hello@atrellis.business">hello@atrellis.business</a>.
        </p>

        <h2>8. Security</h2>
        <p>
          We implement appropriate technical and organisational measures to protect your personal data against
          unauthorised access, alteration, disclosure, or destruction. Our website is served over HTTPS and
          hosted on Vercel&apos;s secure infrastructure.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top of this page
          reflects the most recent revision. Continued use of our website after any changes constitutes
          acceptance of the updated policy.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our data practices, please contact:
        </p>
        <ul>
          <li>Email: <a href="mailto:hello@atrellis.business">hello@atrellis.business</a></li>
          <li>WhatsApp: <a href="https://wa.me/6592223333">+65 9222 3333</a></li>
        </ul>

        <div className="not-prose mt-16 pt-8 border-t border-white/10">
          <Link href="/pdpa" className="text-blue-500 text-sm hover:underline">
            View our PDPA Notice →
          </Link>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
