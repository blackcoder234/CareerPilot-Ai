export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p>
              Welcome to CareerPilot AI! These Terms of Service ("Terms") govern your use of the CareerPilot AI website and application.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you do not have permission to access the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              CareerPilot AI provides an AI-powered career coaching platform, including resume analysis, interview preparation, and job matching tools. Our service is constantly evolving, and we may change or discontinue features at any time without notice.
            </p>

            <h2>3. Accounts</h2>
            <p>
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of CareerPilot AI and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>

            <h2>5. Disclaimer regarding AI Advice</h2>
            <p>
              CareerPilot AI utilizes large language models to generate advice. While we strive for accuracy, the advice provided is for informational purposes only. We do not guarantee employment, interviews, or specific career outcomes based on the use of our service.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at: <a href="mailto:legal@careerpilot.ai">legal@careerpilot.ai</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
