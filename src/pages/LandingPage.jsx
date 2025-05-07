import { Link } from 'react-router-dom';

import Max3 from "../images/istockphoto-1394449576-612x612.jpg";
import Max2 from "../images/istockphoto-1477858506-612x612.jpg";
import Max1 from "../images/240_F_1128339397_JyLTvmVDKIjZas52LS2GMcdWnzTAwHpD.jpg";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">BlogSphere</h1>
            <div className="space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gradient-to-r   from-blue-500 to-indigo-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              Welcome to BlogSphere
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Discover inspiring stories, share your thoughts, and connect with a vibrant community of writers and readers.
            </p>
            <Link
              to="/login"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Exploring
            </Link>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Post Card 1 */}
              <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
                <img
                  src={Max1}
                  alt="Post 1"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    The Art of Storytelling
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn how to captivate your audience with compelling narratives.
                  </p>
                  <Link to="/post/1" className="text-blue-600 hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
              {/* Post Card 2 */}
              <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
                <img
                  src={Max2}
                  alt="Post 2"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Tech Trends 2025
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Stay ahead with the latest innovations shaping the future.
                  </p>
                  <Link to="/post/2" className="text-blue-600 hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
              {/* Post Card 3 */}
              <div className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
                <img
                  src={Max3}
                  alt="Post 3"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Mindful Living
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Simple practices to bring peace and balance to your daily life.
                  </p>
                  <Link to="/post/3" className="text-blue-600 hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BlogSphere</h3>
              <p className="text-gray-400">
                Your go-to platform for sharing and discovering amazing stories.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © 2025 BlogSphere. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}