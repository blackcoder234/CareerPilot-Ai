export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p>
              At CareerPilot AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our application.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect via the Application includes:
            </p>
            <ul>
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Application, such as your IP address, your browser type, your operating system.</li>
              <li><strong>Resume Data:</strong> When you use our Resume Analyzer, we temporarily process your resume PDF to extract relevant career data for your profile.</li>
            </ul>

            <h2>2. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
            </p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Deliver targeted AI career advice and resume feedback.</li>
              <li>Improve our AI models (only with anonymized data).</li>
              <li>Notify you of updates to the Application.</li>
            </ul>

            <h2>3. Disclosure of Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website.
            </p>

            <h2>4. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@careerpilot.ai">privacy@careerpilot.ai</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
