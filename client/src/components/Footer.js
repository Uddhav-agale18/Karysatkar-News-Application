import React from "react";
import Logo from '../images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 mt-8 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* News Logo and Company Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <img src={Logo} alt="News Logo" className="h-12 w-16 mr-2" />
            <h1 className="text-2xl font-semibold ml-4">karysatkar</h1>
          </div>
          <p className="text-gray-400">
            We provide the latest and most reliable news updates from around the world.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Most Viewed News */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Most Viewed News</h2>
          <ul className="space-y-2">
            <li>
              <a href="/news/1" className="text-gray-400 hover:text-white">
                Earthquake in City A, magnitude 6.5
              </a>
            </li>
            <li>
              <a href="/news/2" className="text-gray-400 hover:text-white">
                Local team wins championship
              </a>
            </li>
            <li>
              <a href="/news/3" className="text-gray-400 hover:text-white">
                Economic updates: Stock market rises
              </a>
            </li>
            <li>
              <a href="/news/4" className="text-gray-400 hover:text-white">
                Weather forecast: Sunny days ahead
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <p className="text-gray-400 mb-4">
            Join our subscribers list to get the latest news, updates and special offers directly in your inbox.
          </p>
          <form className="w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-2 text-gray-800 rounded-md"
              required
            />
            <button className="bg-blue-600 w-full py-2 rounded-md hover:bg-blue-700 transition duration-200">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} karysatkar.in. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
