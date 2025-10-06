export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">FIXED FLOAT</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/signin" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Sign in</a>
              <a href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">Sign up</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Fixed Float</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Fixed Float is a leading cryptocurrency exchange platform that enables instant, secure, 
            and reliable trading between 150+ digital assets.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            To make cryptocurrency trading accessible, secure, and efficient for everyone, 
            from beginners to professional traders.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What We Offer</h2>
          <ul className="text-gray-600 dark:text-gray-300 list-disc list-inside space-y-2 mb-6">
            <li>Instant cryptocurrency exchanges</li>
            <li>150+ supported digital assets</li>
            <li>Competitive exchange rates</li>
            <li>Advanced security measures</li>
            <li>24/7 customer support</li>
            <li>User-friendly interface</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Security First</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We prioritize the security of your funds and personal information. 
            Our platform implements industry-leading security measures including 
            cold storage, two-factor authentication, and advanced encryption.
          </p>
        </div>
      </div>
    </div>
  );
}