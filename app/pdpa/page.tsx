import { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/app/components/SiteNav';
import SiteFooter from '@/app/components/SiteFooter';

export const metadata: Metadata = {
  title: 'PDPA Notice | Atrellis Design & Build Singapore',
  description:
    'Atrellis Pte Ltd PDPA (Personal Data Protection Act) notice — your data protection rights under Singapore law.',
};

export default function PdpaNoticePage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <SiteNav breadcrumb="pdpa" />

      <article className="pt-44 pb-24 px-8 max-w-3xl mx-auto prose prose-invert prose-sm prose-headings:font-black prose-headings:tracking-tight prose-p:text-white/60 prose-li:text-white/60 prose-a:text-blue-500 prose-strong:text-white/80">
        <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-6 not-prose">
          Legal
        </span>
        <h1 className="text-4xl md:text-5xl mb-12">PDPA Notice</h1>
        <p className="text-white/40 text-sm mb-12">
          Personal Data Protection Act 2012 — Data Protection Notice
        </p>

        <h2>Purpose</h2>
        <p>
          This Data Protection Notice (&quot;Notice&quot;) sets out the basis upon which Atrellis Pte Ltd
          (&quot;Atrellis&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) may collect, use, disclose, or
          otherwise process personal data of our customers in accordance with the Personal Data Protection
          Act 2012 (&quot;PDPA&quot;). This Notice applies to personal data in our possession or under our
          control, including personal data in the possession of organisations which we have engaged to
          collect, use, disclose, or process personal data for our purposes.
        </p>

        <h2>Personal Data We Collect</h2>
        <p>
          &quot;Personal data&quot; refers to data, whether true or not, about an individual who can be identified
          from that data, or from that data and other information to which the organisation has or is likely
          to have access. We may collect the following personal data from you:
        </p>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Mobile / telephone number</li>
          <li>Residential or property address (for site visits and project delivery)</li>
          <li>Property type and renovation requirements</li>
          <li>Photographs of your property (for assessment purposes)</li>
          <li>Payment and billing information (for contracted projects)</li>
        </ul>

        <h2>Purposes for Collection, Use &amp; Disclosure</h2>
        <p>We collect, use, and/or disclose your personal data for the following purposes:</p>
        <ol>
          <li>To respond to your enquiries, requests, and complaints</li>
          <li>To provide quotations and cost estimates for renovation services</li>
          <li>To manage and deliver renovation and construction projects</li>
          <li>To submit applications to regulatory authorities (BCA, URA, HDB) on your behalf</li>
          <li>To process payments and issue invoices</li>
          <li>To send you updates about your project progress</li>
          <li>To improve our services, website, and customer experience</li>
          <li>To comply with applicable laws and regulations</li>
        </ol>

        <h2>Consent</h2>
        <p>
          By submitting your personal data through our website, WhatsApp, email, or other channels, you
          consent to the collection, use, and disclosure of your personal data as set out in this Notice.
        </p>
        <p>
          You may withdraw your consent at any time by contacting our Data Protection Officer at{' '}
          <a href="mailto:hello@atrellis.business">hello@atrellis.business</a>. Please note that withdrawal
          of consent may affect our ability to provide our services to you.
        </p>

        <h2>Access &amp; Correction</h2>
        <p>
          You may request access to or correction of your personal data held by us. We will respond to your
          request within 30 business days. A reasonable fee may be charged for processing access requests.
        </p>

        <h2>Protection of Personal Data</h2>
        <p>
          We protect your personal data by implementing reasonable security arrangements to prevent
          unauthorised access, collection, use, disclosure, copying, modification, disposal, or similar risks.
          All data is transmitted via encrypted connections (HTTPS) and stored on secure, access-controlled
          systems.
        </p>

        <h2>Retention</h2>
        <p>
          We will cease to retain personal data, or remove the means by which the data can be associated
          with you, as soon as it is reasonable to assume that retention is no longer necessary for the
          purposes for which the personal data was collected, and is no longer required for legal or
          business purposes.
        </p>

        <h2>Transfers Outside Singapore</h2>
        <p>
          Your personal data may be stored on servers located outside Singapore (e.g. cloud hosting providers).
          In such cases, we ensure that the receiving party provides a comparable standard of protection to the
          PDPA.
        </p>

        <h2>Data Protection Officer</h2>
        <p>
          If you have any questions, concerns, or complaints regarding our data protection practices, please
          contact:
        </p>
        <ul>
          <li><strong>Data Protection Officer</strong></li>
          <li>Atrellis Pte Ltd</li>
          <li>Email: <a href="mailto:hello@atrellis.business">hello@atrellis.business</a></li>
          <li>WhatsApp: <a href="https://wa.me/6592223333">+65 9222 3333</a></li>
        </ul>

        <div className="not-prose mt-16 pt-8 border-t border-white/10">
          <Link href="/privacy" className="text-blue-500 text-sm hover:underline">
            ← View our full Privacy Policy
          </Link>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
