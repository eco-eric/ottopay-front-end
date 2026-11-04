import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-[800px] px-5 prose prose-lg text-muted-foreground dark:prose-invert">
          <p className="text-sm text-muted-foreground mb-8">Last Updated: February 19, 2026</p>

          <p>Otto Pay ("we," "us," or "our"), a subsidiary of and wholly owned by EcosourceIQ, DBA WorkEdge Pro, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our invoicing platform and related services.</p>

          <div className="bg-primary/5 border-l-4 border-primary p-4 my-8 rounded-r-lg">
            <strong>Summary:</strong> We collect only what we need to run your invoicing. We never sell your data. Payments are processed securely through Stripe. You can export or delete your data at any time from your account settings.
          </div>

          <h2 className="text-2xl font-bold text-foreground mt-10">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Information You Provide</h3>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, phone number, password, and profile photo when you create an account</li>
            <li><strong>Business Information:</strong> Business name, address, phone, logo, tax ID, license number, trade/industry, and other details you enter in your business profile</li>
            <li><strong>Customer Data:</strong> Names, email addresses, phone numbers, and addresses of your customers that you add to Otto Pay</li>
            <li><strong>Invoice & Estimate Data:</strong> Line items, amounts, notes, terms, conditions, and attachments (including photos) you include on invoices and estimates</li>
            <li><strong>Payment Information:</strong> When you connect Stripe, your banking details are collected directly by Stripe — Otto Pay does not store your bank account or card numbers</li>
            <li><strong>Equipment Records:</strong> Equipment type, brand, model, serial numbers, install dates, warranty info, and photos you log for customers</li>
            <li><strong>Communication Preferences:</strong> Your notification settings, email templates, reminder schedules, and quiet hours configuration</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Information Collected Automatically</h3>
          <ul>
            <li><strong>Usage Data:</strong> Pages viewed, features used, clicks, time spent, and navigation patterns within Otto Pay</li>
            <li><strong>Device Information:</strong> Browser type, operating system, device type, screen resolution, and language preferences</li>
            <li><strong>Log Data:</strong> IP addresses, access times, referring URLs, and error logs</li>
            <li><strong>Cookies & Local Storage:</strong> Session tokens, authentication state, theme preferences, and UI settings</li>
          </ul>

           <h3 className="text-xl font-semibold text-foreground/80 mt-6">Information from Third Parties</h3>
          <ul>
            <li><strong>Stripe:</strong> Transaction status, payment confirmations, payout details, and account verification status</li>
            <li><strong>Google OAuth:</strong> If you sign in with Google, we receive your name, email address, and profile picture through Google's OAuth 2.0 authentication flow. This data is used solely to create or link your Otto Pay account</li>
            
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li><strong>Provide Our Services:</strong> Create and send invoices, process payments, manage customers, generate estimates, and track equipment</li>
            <li><strong>Communicate With You:</strong> Send transactional emails (invoice receipts, payment confirmations), reminders, and account updates</li>
            <li><strong>Process Payments:</strong> Facilitate payment collection through Stripe Connect, calculate fees, and generate receipts</li>
            <li><strong>Improve Otto Pay:</strong> Analyze usage patterns to fix bugs, develop new features, and optimize performance</li>
            <li><strong>Ensure Security:</strong> Detect fraud, prevent unauthorized access, and protect against abuse</li>
            <li><strong>Provide Support:</strong> Respond to your questions, troubleshoot issues, and provide technical assistance</li>
            <li><strong>Legal Compliance:</strong> Comply with applicable laws, regulations, and legal processes</li>
          </ul>

          <div className="bg-success/10 border-l-4 border-success p-4 my-8 rounded-r-lg">
            <strong>We never sell your data.</strong> We do not sell, rent, or trade your personal information or your customers' information to third parties for marketing purposes. Period.
          </div>

          <h2 className="text-2xl font-bold text-foreground mt-10">3. How We Share Your Information</h2>
          <p>We share your information only in the following circumstances:</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Service Providers</h3>
          <ul>
            <li><strong>Stripe:</strong> Payment processing, identity verification, and fund disbursement. Stripe's use of your data is governed by the <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary">Stripe Privacy Policy</a></li>
            <li><strong>Cloud Infrastructure:</strong> Data hosting and storage through secure, SOC 2-compliant providers</li>
            
            <li><strong>Email Delivery:</strong> Transactional email delivery for invoices, reminders, and notifications</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Your Customers</h3>
          <p>When you send an invoice or estimate, your customers can see:</p>
          <ul>
            <li>Your business name, logo, address, phone, and email</li>
            <li>Invoice/estimate details including line items, amounts, and terms</li>
            <li>Attached photos or documents you include</li>
            <li>Your license number and tax ID (if you've enabled those in settings)</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Legal Requirements</h3>
          <p>We may disclose your information when required by law, subpoena, court order, or government request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Business Transfers</h3>
          <p>If Otto Pay is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any change in ownership or use of your data.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data:</p>
          <ul>
            <li><strong>Encryption:</strong> All data is encrypted in transit (TLS 1.2+) and at rest (AES-256)</li>
            <li><strong>Authentication:</strong> Secure password hashing, optional two-factor authentication, and session management</li>
            <li><strong>Access Controls:</strong> Row-level security policies ensure you can only access your own data</li>
            <li><strong>PCI Compliance:</strong> Payment card data is handled exclusively by Stripe, which is PCI-DSS Level 1 certified — the highest level of certification</li>
            <li><strong>Regular Monitoring:</strong> Automated security scanning and monitoring for unauthorized access</li>
            <li><strong>Secure Infrastructure:</strong> Hosted on SOC 2-compliant cloud infrastructure with redundant backups</li>
          </ul>
          <p>While we strive to protect your data, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">5. Data Retention</h2>
          <ul>
            <li><strong>Active Account:</strong> We retain your data for as long as your account is active and as needed to provide services</li>
            <li><strong>After Deletion:</strong> When you delete your account, we remove your personal data within 30 days. Some data may be retained longer for legal, tax, or regulatory compliance (e.g., transaction records may be retained for up to 7 years for tax purposes)</li>
            <li><strong>Backups:</strong> Deleted data may persist in encrypted backups for up to 90 days before being permanently removed</li>
            <li><strong>Aggregated Data:</strong> We may retain anonymized, aggregated data indefinitely for analytics and service improvement</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10">6. Your Rights and Choices</h2>
          <p>You have the following rights regarding your data:</p>
          <ul>
            <li><strong>Access:</strong> View all data we hold about you through your account dashboard</li>
            <li><strong>Export:</strong> Download a copy of your data (invoices, customers, settings) at any time from Settings → Account & Security → Export My Data</li>
            <li><strong>Correction:</strong> Update or correct your personal information through your account settings</li>
            <li><strong>Deletion:</strong> Delete your account and all associated data from Settings → Account & Security → Delete Account</li>
            <li><strong>Restrict Processing:</strong> You can disable specific features (e.g., email reminders) through your notification settings</li>
            <li><strong>Withdraw Consent:</strong> Where processing is based on consent, you can withdraw it at any time</li>
            <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
          </ul>
          <p>To exercise these rights, use the self-service tools in your account settings or contact us at <a href="mailto:privacy@ottopay.com" className="text-primary">privacy@ottopay.com</a>.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">7. Cookies and Tracking</h2>
          <p>Otto Pay uses the following types of cookies and local storage:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for authentication, session management, and security. These cannot be disabled</li>
            <li><strong>Preference Cookies:</strong> Store your settings like theme (light/dark mode), date format, and language preferences</li>
            <li><strong>Analytics:</strong> We collect anonymized usage data to understand how features are used and to improve the product. No third-party tracking scripts are used</li>
          </ul>
          <p>We do not use advertising cookies or share data with ad networks. We do not participate in cross-site tracking.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">8. Children's Privacy</h2>
          <p>Otto Pay is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">9. International Data Transfers</h2>
          <p>Otto Pay is based in the United States. If you access our services from outside the United States, your information may be transferred to, stored, and processed in the United States. By using Otto Pay, you consent to the transfer of your data to the United States.</p>
          <p>We ensure that any international data transfers comply with applicable data protection laws, including the use of standard contractual clauses where required.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">10. California Privacy Rights (CCPA)</h2>
          <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
          <ul>
            <li><strong>Right to Know:</strong> You can request the categories and specific pieces of personal information we have collected about you</li>
            <li><strong>Right to Delete:</strong> You can request deletion of your personal information, subject to certain exceptions</li>
            <li><strong>Right to Opt-Out:</strong> We do not sell personal information, so this right does not apply</li>
            <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights</li>
          </ul>
          <p>To make a CCPA request, email <a href="mailto:privacy@ottopay.com" className="text-primary">privacy@ottopay.com</a> or use the self-service tools in your account settings.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">11. Third-Party Services</h2>
          <p>Otto Pay integrates with the following third-party services. Their use of your data is governed by their own privacy policies:</p>
          <ul>
            <li><strong>Stripe:</strong> Payment processing — <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary">Stripe Privacy Policy</a></li>
            <li><strong>Google:</strong> OAuth sign-in — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary">Google Privacy Policy</a></li>
            
          </ul>
          <p>We are not responsible for the privacy practices of third-party services. We encourage you to review their policies.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. When we make material changes, we will:</p>
          <ul>
            <li>Update the "Last Updated" date at the top of this page</li>
            <li>Send you an email notification</li>
            <li>Display a notice within Otto Pay</li>
          </ul>
          <p>Your continued use of Otto Pay after changes take effect constitutes acceptance of the updated Privacy Policy.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">13. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, want to exercise your data rights, or have concerns about how we handle your information, contact us:</p>
          <p>
            <strong>Privacy Inquiries:</strong> <a href="mailto:privacy@ottopay.com" className="text-primary">privacy@ottopay.com</a><br />
            <strong>General Support:</strong> <a href="mailto:support@ottopay.com" className="text-primary">support@ottopay.com</a><br />
            <strong>Website:</strong> <a href="https://ottopay.com" target="_blank" rel="noopener noreferrer" className="text-primary">ottopay.com</a>
          </p>

          <hr className="my-12 border-t border-border" />
          <p className="text-center text-sm text-muted-foreground">© 2026 Otto Pay, a subsidiary of EcosourceIQ, DBA WorkEdge Pro. All rights reserved.</p>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
