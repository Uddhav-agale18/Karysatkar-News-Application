import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

const Settings = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      {/* Horizontal Navigation Links */}
      <nav className="mb-4">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/admin/settings/language"
              className="text-blue-600 hover:bg-blue-100 rounded-lg p-2 transition duration-300 font-semibold text-lg no-underline"
            >
              Language
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings/logo"
              className="text-blue-600 hover:bg-blue-100 rounded-lg p-2 transition duration-300 font-semibold text-lg no-underline"
            >
             Update Logo
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings/contact"
              className="text-blue-600 hover:bg-blue-100 rounded-lg p-2 transition duration-300 font-semibold text-lg no-underline"
            >
              Contact Settings
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings/social-media"
              className="text-blue-600 hover:bg-blue-100 rounded-lg p-2 transition duration-300 font-semibold text-lg no-underline"
            >
              Social Media Settings
            </Link>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default Settings;
