import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-[800px] px-5 prose prose-lg text-muted-foreground dark:prose-invert">
          <p className="text-sm text-muted-foreground mb-8">Last Updated: February 19, 2026</p>

          <p>Welcome to Otto Pay! These Terms of Service ("Terms") govern your access to and use of Otto Pay's invoicing platform and services. By using Otto Pay, you agree to these Terms.</p>

          <div className="bg-primary/5 border-l-4 border-primary p-4 my-8 rounded-r-lg">
            <strong>Corporate Ownership:</strong> Otto Pay is a subsidiary of and wholly owned by EcosourceIQ, DBA WorkEdge Pro.
          </div>

          <p><strong>Payment Facilitator Platform:</strong> Otto Pay operates as a payment facilitator platform using Stripe Connect. This means Otto Pay provides the software platform while Stripe processes payments. When you use payment processing features, you enter into agreements with both Otto Pay (for the platform) and Stripe (for payment processing).</p>

          <div className="bg-warning/10 border-l-4 border-warning p-4 my-8 rounded-r-lg">
            <strong>Important:</strong> Please read these Terms carefully. They include important information about your legal rights, remedies, and obligations, including mandatory arbitration and class action waiver provisions. The payment processing section describes fees charged by both Stripe and Otto Pay.
          </div>

          <h2 className="text-2xl font-bold text-foreground mt-10">1. Acceptance of Terms</h2>
          <p>By creating an account, accessing, or using Otto Pay, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use Otto Pay.</p>
          <p>You must be at least 18 years old and able to form a binding contract to use Otto Pay. If you are using Otto Pay on behalf of a business, you represent that you have authority to bind that business to these Terms.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">2. Description of Service</h2>
          <p>Otto Pay is an AI-powered invoicing platform designed for field service professionals. Our services include:</p>
          <ul>
            <li>Invoice creation, management, and tracking</li>
            <li>Estimate creation and customer approval workflows</li>
            <li>Payment processing and collection through Stripe Connect (Otto Pay acts as a payment facilitator platform)</li>
            <li>Email notifications for invoices, estimates, payments, and account updates</li>
            <li>Email notifications for invoices, estimates, and account updates</li>
            <li>Client management tools</li>
            <li>Integration with the WorkEdge Pro suite of applications</li>
            <li>AI-assisted features for automated invoicing</li>
            <li>Reporting and analytics</li>
          </ul>
          <p><strong>Payment Facilitator Model:</strong> Otto Pay facilitates payment processing but does not directly hold, process, or control funds. All payment processing is performed by Stripe, a third-party payment processor. Otto Pay earns revenue from subscription plans and does not take a fee from the payments you collect.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">3. Account Registration and Security</h2>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Account Creation</h3>
          <p>To use Otto Pay, you must create an account by providing accurate, complete, and current information. You may register using an email address and password, or by signing in with a supported third-party provider such as Google OAuth. When you sign in with Google, we receive your name, email, and profile picture to create or link your account. You agree to:</p>
          <ul>
            <li>Provide truthful and accurate information</li>
            <li>Maintain and update your information to keep it current</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Account Security</h3>
          <p>You are responsible for maintaining the confidentiality of your account login information. Otto Pay cannot and will not be liable for any loss or damage from your failure to maintain account security.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">4. Acceptable Use</h2>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Permitted Uses</h3>
          <p>You may use Otto Pay only for lawful business purposes and in accordance with these Terms.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Prohibited Uses</h3>
          <p>You agree not to:</p>
          <ul>
            <li>Use Otto Pay for any illegal, fraudulent, or unauthorized purpose</li>
            <li>Create invoices for fraudulent transactions or services not rendered</li>
            <li>Violate any applicable laws, regulations, or third-party rights</li>
            <li>Transmit any viruses, malware, or harmful code</li>
            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
            <li>Interfere with or disrupt the integrity or performance of Otto Pay</li>
            <li>Scrape, data mine, or use automated tools to access Otto Pay without permission</li>
            <li>Reverse engineer, decompile, or attempt to derive source code from Otto Pay</li>
            <li>Use Otto Pay to send spam or unsolicited communications</li>
            <li>Impersonate another person or entity</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10">5. Subscriptions, Payment Processing & Fees</h2>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Subscription Plans</h3>
          <p>Otto Pay offers a Free plan and paid Pro and Team plans billed monthly or yearly. Paid plans renew automatically until cancelled. If you cancel, your plan stays active until the end of the paid period and then moves to Free. Current plan prices and limits are shown on our <a href="/pricing" className="text-primary">pricing page</a>.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Your Stripe Account</h3>
          <p>Online card payments are processed by Stripe, a third-party payment processor, through a Stripe account that you own and connect to Otto Pay. By connecting your account you agree to <a href="https://stripe.com/legal/ssa" target="_blank" rel="noopener noreferrer" className="text-primary">Stripe's Services Agreement</a>. Payments are made directly to your Stripe account, and Stripe pays out to your bank on its own schedule.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">No Platform Fee</h3>
          <p>Otto Pay does not charge a platform fee or take any part of the payments you collect. Stripe charges its own processing fees (for example, international cards, currency conversion and disputes) directly to your Stripe account under your agreement with Stripe. Otto Pay is not responsible for those fees.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Optional Card Fee</h3>
          <p>You may choose to add a card fee of up to 3% to payments made by card. When turned on, it appears as a separate line before your customer pays. You are responsible for making sure any card fee you charge follows the laws of your state and your customer's state and the card network rules, including any limits, bans or required notices.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Fee Changes</h3>
          <p>Otto Pay reserves the right to change subscription prices with 30 days' written notice to active account holders via the email address on file.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Billing</h3>
          <p>Subscription fees are billed in advance on a monthly or annual basis, depending on your plan. You authorize us to charge your payment method on file for applicable subscription fees.</p>
          <p>Stripe's processing fees are charged by Stripe to your own Stripe account.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Refunds</h3>
          <p>Subscription fees are non-refundable except as required by law or as otherwise specified in these Terms. Payment processing fees are set and refunded by Stripe under its own terms.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Payment Flow and Deposits</h3>
          <p>When your customer pays an invoice:</p>
          <ol>
            <li>Payment is processed through Stripe</li>
            <li>Stripe's processing fees are deducted by Stripe</li>
            <li>Net funds are paid out from your Stripe account to your bank according to your Stripe payout schedule</li>
          </ol>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Connected Account Requirements</h3>
          <p>To process payments through Otto Pay, you must:</p>
          <ul>
            <li>Provide accurate business and banking information to Stripe</li>
            <li>Complete any required identity verification</li>
            <li>Comply with Stripe's terms of service and acceptable use policies</li>
            <li>Maintain a bank account in a supported country</li>
            <li>Ensure your business activities comply with applicable laws and regulations</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Account Holds and Reserves</h3>
          <p>Stripe may hold funds or establish reserves on your account based on risk assessment, chargeback rates, or other factors. Otto Pay has no control over Stripe's hold or reserve policies.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Your Responsibilities</h3>
          <p>You are responsible for:</p>
          <ul>
            <li>The accuracy of invoice amounts and descriptions</li>
            <li>Compliance with applicable tax laws and regulations</li>
            <li>Providing goods or services as described in your invoices</li>
            <li>Resolving disputes with your customers in good faith</li>
            <li>Maintaining adequate records for accounting and tax purposes</li>
            <li>Not engaging in prohibited business activities as defined by Stripe</li>
            <li>Promptly responding to customer inquiries and disputes</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Chargebacks and Disputes</h3>
          <p>You are responsible for handling customer disputes and chargebacks. When a chargeback occurs:</p>
          <ul>
            <li>The disputed amount (plus any chargeback fees) will be deducted from your account balance or future payments</li>
            <li>You will have an opportunity to submit evidence to contest the chargeback</li>
            <li>Excessive chargebacks may result in higher fees, account holds, or suspension of payment processing</li>
          </ul>
          <p>We may suspend or terminate your payment processing capabilities if you have excessive chargebacks, disputes, or fraudulent activity.</p>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Refunds</h3>
          <p>You may issue full or partial refunds to your customers through Otto Pay. When you issue a refund:</p>
          <ul>
            <li>The refund amount is returned to your customer</li>
            <li>Stripe's original processing fee is not refunded</li>
                        <li>The refund is deducted from your available balance or future payments</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Prohibited Transactions</h3>
          <p>You may not use Otto Pay to process payments for <a href="https://stripe.com/legal/restricted-businesses" target="_blank" rel="noopener noreferrer" className="text-primary">Stripe's restricted or prohibited businesses</a>, including but not limited to:</p>
          <ul>
            <li>Illegal products or services</li>
            <li>Adult content or services</li>
            <li>Multi-level marketing schemes</li>
            <li>Cryptocurrency or virtual currency services</li>
            <li>Any activities prohibited by applicable laws</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Tax Reporting</h3>
          <p>Stripe will issue tax forms (1099-K in the United States) if you meet certain payment volume thresholds. You are responsible for reporting all income and paying applicable taxes.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">7. Intellectual Property</h2>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Our Rights</h3>
          <p>Otto Pay and all related trademarks, logos, and content are owned by us or our licensors. You may not use our intellectual property without our written permission.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Your Content</h3>
          <p>You retain ownership of all content you submit to Otto Pay (invoices, client data, etc.). By using Otto Pay, you grant us a limited license to use your content to provide and improve our services.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Feedback</h3>
          <p>If you provide us with feedback or suggestions, we may use them without any obligation to you.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">8. Communications and Notifications</h2>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Email Notifications</h3>
          <p>Otto Pay sends email notifications on your behalf to your customers, including invoice delivery, payment reminders, and receipts. By using these features, you acknowledge and agree that:</p>
          <ul>
            <li>You have obtained proper consent from your customers to receive email communications before sending them notifications through Otto Pay</li>
            <li>You are solely responsible for complying with all applicable laws regarding email communications, including the CAN-SPAM Act and any state-level regulations</li>
            <li>Otto Pay does not guarantee delivery of all emails — delivery depends on recipient email settings, spam filters, and email infrastructure</li>
            <li>You will not use Otto Pay's email features to send unsolicited, promotional, or spam messages</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Quiet Hours</h3>
          <p>Otto Pay provides configurable "Quiet Hours" to prevent automated reminders from being sent during off-hours. You are responsible for configuring quiet hours appropriately for your customers' time zones and local regulations.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Notification Content</h3>
          <p>Notifications sent through Otto Pay may include your business name, invoice numbers, payment amounts, and payment links. You are responsible for the accuracy of all information included in messages sent to your customers.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">9. Data and Privacy</h2>
          <p>Our collection and use of personal information is described in our <a href="/privacy" className="text-primary">Privacy Policy</a>. By using Otto Pay, you consent to our data practices as described in the Privacy Policy.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Data Backup</h3>
          <p>While we maintain regular backups, you are responsible for maintaining your own backup copies of important data.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">10. Termination</h2>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">By You</h3>
          <p>You may terminate your account at any time through your account settings or by contacting support. Termination does not relieve you of any obligations to pay accrued fees.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">By Us</h3>
          <p>We may suspend or terminate your account if:</p>
          <ul>
            <li>You violate these Terms</li>
            <li>Your account shows suspicious or fraudulent activity</li>
            <li>You fail to pay applicable fees</li>
            <li>We are required to do so by law</li>
            <li>We cease providing Otto Pay services</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Effect of Termination</h3>
          <p>Upon termination:</p>
          <ul>
            <li>Your access to Otto Pay will be immediately disabled</li>
            <li>You may request a final export of your data within 30 days</li>
            <li>We may delete your data after 30 days, subject to legal retention requirements</li>
            <li>Outstanding fees remain due</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10">11. Disclaimers and Limitations of Liability</h2>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Service "As Is"</h3>
          <p className="uppercase font-semibold text-sm">Otto Pay is provided "as is" and "as available" without warranties of any kind, express or implied. We disclaim all warranties, including merchantability, fitness for a particular purpose, and non-infringement.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">No Guarantee</h3>
          <p>We do not guarantee that:</p>
          <ul>
            <li>Otto Pay will be uninterrupted, secure, or error-free</li>
            <li>All bugs or errors will be corrected</li>
            <li>Otto Pay will meet your specific requirements</li>
            <li>Your invoices will always be delivered or paid</li>
            <li>Payment processing through Stripe will be uninterrupted or error-free</li>
            <li>Funds will be available immediately or according to any specific timeline</li>
            <li>Stripe will not hold, reserve, or freeze your funds</li>
            
          </ul>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Third-Party Payment Processor</h3>
          <p>Otto Pay acts solely as a platform facilitator for payment processing. All payment processing is performed by Stripe. Otto Pay is not responsible for:</p>
          <ul>
            <li>Stripe's processing decisions, account holds, or fund delays</li>
            <li>Failed transactions, declined payments, or processing errors</li>
            <li>Stripe's compliance requirements or verification processes</li>
            <li>Changes to Stripe's fees, terms, or service availability</li>
            <li>Disputes between you and Stripe</li>
          </ul>
          <p>For payment processing issues, you may need to contact Stripe directly. Otto Pay will assist where possible but cannot override Stripe's decisions.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Limitation of Liability</h3>
          <p className="uppercase font-semibold text-sm">To the maximum extent permitted by law, Otto Pay shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or business opportunities.</p>
          <p className="uppercase font-semibold text-sm">Our total liability for any claims arising from or related to Otto Pay shall not exceed the amount you paid us in the 12 months prior to the event giving rise to liability, or $100, whichever is greater.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">12. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless Otto Pay and its affiliates from any claims, damages, losses, liabilities, and expenses (including attorneys' fees) arising from:</p>
          <ul>
            <li>Your use of Otto Pay</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another party</li>
            <li>Your invoices, transactions, or business activities</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10">13. Dispute Resolution</h2>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Informal Resolution</h3>
          <p>If you have a dispute with us, please contact us first at <a href="mailto:legal@ottopay.com" className="text-primary">legal@ottopay.com</a> to attempt an informal resolution.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Arbitration</h3>
          <p>If we cannot resolve a dispute informally, any dispute will be resolved through binding arbitration rather than in court, except that you may assert claims in small claims court if they qualify.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Class Action Waiver</h3>
          <p className="uppercase font-semibold text-sm">You and Otto Pay agree that each may bring claims against the other only in your or its individual capacity and not as a class member in any purported class or representative proceeding.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">14. Changes to Terms</h2>
          <p>We may modify these Terms at any time. We will notify you of material changes by:</p>
          <ul>
            <li>Posting the updated Terms with a new "Last Updated" date</li>
            <li>Sending you an email notification</li>
            <li>Displaying a notice in Otto Pay</li>
          </ul>
          <p>Your continued use of Otto Pay after changes take effect constitutes acceptance of the updated Terms.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">15. General Provisions</h2>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Entire Agreement</h3>
          <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Otto Pay, a subsidiary of EcosourceIQ, DBA WorkEdge Pro.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Severability</h3>
          <p>If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Waiver</h3>
          <p>Our failure to enforce any provision of these Terms does not waive our right to enforce it later.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Assignment</h3>
          <p>You may not assign or transfer these Terms without our written consent. We may assign these Terms without restriction.</p>
          <h3 className="text-xl font-semibold text-foreground/80 mt-6">Governing Law</h3>
          <p>These Terms are governed by the laws of the United States, without regard to conflict of law principles.</p>

          <h2 className="text-2xl font-bold text-foreground mt-10">16. Contact Information</h2>
          <p>For questions about these Terms or to report violations, contact us:</p>
          <p>
            <strong>Email:</strong> <a href="mailto:legal@ottopay.com" className="text-primary">legal@ottopay.com</a><br />
            <strong>Support:</strong> <a href="mailto:support@ottopay.com" className="text-primary">support@ottopay.com</a>
          </p>

          <hr className="my-12 border-t border-border" />
          <p className="text-center text-sm text-muted-foreground">© 2026 Otto Pay, a subsidiary of EcosourceIQ, DBA WorkEdge Pro. All rights reserved.</p>
        </div>
      </section>
      <MarketingFooter />
    </div>
  );
}
