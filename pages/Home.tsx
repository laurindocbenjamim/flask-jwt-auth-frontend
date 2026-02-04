import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Users, Zap, Database, Cloud } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gradient-to-r from-white to-slate-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Enterprise-Grade</span>{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 xl:inline">Data & IT Solutions</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Secure authentication and access control for modern engineering and data services. Build with confidence using our enterprise-ready platform with JWT security, role-based controls, and OAuth integration.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <div className="rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <Link to="/register" className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-colors">
                    <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center">
          <div className="relative h-56 w-full sm:h-72 md:h-96 lg:h-full lg:w-full">
            {/* Gradient overlay for tech aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl"></div>
            <svg className="w-full h-full text-blue-100" fill="currentColor" viewBox="0 0 1200 600">
              <rect width="1200" height="600" fill="white"/>
              <circle cx="200" cy="150" r="80" fill="#0ea5e9" opacity="0.1"/>
              <circle cx="1000" cy="450" r="120" fill="#0284c7" opacity="0.1"/>
              <path d="M 300 300 L 600 150 L 900 300 L 600 450 Z" fill="none" stroke="#0284c7" strokeWidth="2" opacity="0.2"/>
              <text x="600" y="300" textAnchor="middle" fontSize="24" fill="#0284c7" opacity="0.3" fontWeight="bold">
                Data Processing & IT Infrastructure
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Core Features</h2>
            <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Enterprise Security for Data Services
            </p>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 lg:mx-auto">
              Built for IT professionals and engineering teams who demand reliability, security, and scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="relative group hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 p-8 rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200">
              <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                <Lock className="h-8 w-8" />
              </div>
              <h3 className="ml-20 text-xl font-bold text-gray-900">JWT Authentication</h3>
              <p className="mt-4 ml-0 text-gray-600">
                Enterprise-grade JWT-based authentication with secure token management, automatic expiration, and token refresh mechanisms. Perfect for API-driven architecture.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative group hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 p-8 rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-green-200">
              <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="ml-20 text-xl font-bold text-gray-900">Role-Based Access Control</h3>
              <p className="mt-4 ml-0 text-gray-600">
                Granular permission management with customizable roles. Control access to sensitive data operations and administrative functions with precision.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative group hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 p-8 rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200">
              <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <Database className="h-8 w-8" />
              </div>
              <h3 className="ml-20 text-xl font-bold text-gray-900">Data Management</h3>
              <p className="mt-4 ml-0 text-gray-600">
                Seamless integration with modern databases. Built-in support for data validation, secure operations, and comprehensive audit logging.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="relative group hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 p-8 rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 text-white">
                <Cloud className="h-8 w-8" />
              </div>
              <h3 className="ml-20 text-xl font-bold text-gray-900">Cloud-Ready Architecture</h3>
              <p className="mt-4 ml-0 text-gray-600">
                Containerized with Docker. Deploy to any cloud platform—AWS, Azure, GCP—with confidence and ease.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="relative group hover:bg-gradient-to-br hover:from-indigo-50 hover:to-blue-50 p-8 rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200">
              <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="ml-20 text-xl font-bold text-gray-900">User Management</h3>
              <p className="mt-4 ml-0 text-gray-600">
                Complete user lifecycle management. Profile updates, account management, and team collaboration features out of the box.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="relative group hover:bg-gradient-to-br hover:from-cyan-50 hover:to-teal-50 p-8 rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-cyan-200">
              <div className="absolute flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 text-white">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="ml-20 text-xl font-bold text-gray-900">OAuth Integration</h3>
              <p className="mt-4 ml-0 text-gray-600">
                Social authentication via Google and GitHub. Reduce friction and support modern login expectations from your users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-20 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Technology Stack</h2>
            <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Built with Modern Tools
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React 18', icon: '⚛️' },
              { name: 'TypeScript', icon: '📘' },
              { name: 'Flask', icon: '🐍' },
              { name: 'JWT Auth', icon: '🔐' },
              { name: 'Docker', icon: '🐳' },
              { name: 'PostgreSQL', icon: '🗄️' },
              { name: 'OAuth 2.0', icon: '🔑' },
              { name: 'Nginx', icon: '🌐' },
            ].map((tech) => (
              <div key={tech.name} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-2">{tech.icon}</div>
                <p className="font-semibold text-gray-900">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Ready to Secure Your Services?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of engineering teams using our platform for secure, scalable authentication.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-blue-600 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
};
