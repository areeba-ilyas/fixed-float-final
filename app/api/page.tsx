export default function APIPage() {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/exchange/rates',
      description: 'Get current exchange rates',
      parameters: '?from=BTC&to=ETH&amount=1.0'
    },
    {
      method: 'POST',
      path: '/api/exchange/create-order',
      description: 'Create a new exchange order',
      parameters: '{"fromCurrency": "BTC", "toCurrency": "ETH", "fromAmount": 0.1, "toAddress": "0x..."}'
    },
    {
      method: 'GET',
      path: '/api/exchange/track-order',
      description: 'Track order status',
      parameters: '?id=FF123456'
    },
    {
      method: 'POST',
      path: '/api/auth/signup',
      description: 'User registration',
      parameters: '{"email": "user@example.com", "password": "securepassword"}'
    },
    {
      method: 'POST',
      path: '/api/auth/signin',
      description: 'User authentication',
      parameters: '{"email": "user@example.com", "password": "securepassword"}'
    }
  ];

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">API Documentation</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Integrate Fixed Float exchange functionality into your application
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            To use our API, you'll need an API key. Contact our support team to get your API credentials.
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              Base URL: https://fixedfloat.com/api/v1
            </code>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Endpoints</h2>
        
        <div className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {endpoint.method}
                  </span>
                  <span className="ml-3 font-mono text-lg text-gray-900 dark:text-white">
                    {endpoint.path}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {endpoint.description}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <code className="text-sm text-gray-800 dark:text-gray-200 break-all">
                  {endpoint.parameters}
                </code>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Need Help?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Our support team is available to help you with API integration.
          </p>
          <a 
            href="/support" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}