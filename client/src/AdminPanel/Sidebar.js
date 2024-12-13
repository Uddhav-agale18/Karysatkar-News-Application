import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen,toggleSidebar  }) => {

  const [showProfileLink, setShowProfileLink] = useState(false);
 
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  }
  // Function to handle "Settings" link click
  const handleSettingsClick = () => {
    setShowProfileLink(!showProfileLink); // Toggle the profile link visibility
  };

  return (
    <div
      className={`bg-gray-900  h-screen p-6 fixed top-0 left-0 ${isSidebarOpen ? 'w-64'  : 'w-0'} transition-width duration-300`}
    >
      <div className="overflow-y-auto h-full">
        <h2 className="text-2xl font-bold text-yellow-200 mb-8 text-center">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin"
                onClick={handleLinkClick}
                className="flex text-white items-center p-2 hover:bg-gray-800 rounded-lg transition duration-300 text-sm  no-underline"
              >
                <span className="material-icons text-white align-middle mr-2">home</span> Home
              </Link>
            </li>

            <li>
              <Link
                to="/admin/navigation"
                onClick={handleLinkClick}
                className="flex items-center text-white p-2 hover:bg-gray-800 rounded-lg transition duration-300 text-sm  no-underline"
              >
                <span className="material-icons text-white align-middle mr-2">settings</span> Navigation
              </Link>
            </li>

            <li>
              <Link
                to="/admin/themes"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 hover:bg-gray-800 rounded-lg transition duration-300 text-sm"
              >
                <span className="material-icons text-white align-middle mr-2">palette</span> Themes
              </Link>
            </li>
            <li>
              <Link
                to="/admin/pages"
                onClick={handleLinkClick}
                className="flex items-center text-white  no-underline p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons text-white align-middle mr-2">description</span> Pages
              </Link>
            </li>
            <li>
              <Link
                to="/admin/add-post"
                onClick={handleLinkClick}
                className="flex  no-underline text-white items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons text-white align-middle mr-2">add</span> Add Post
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bulk-post-upload"
                onClick={handleLinkClick}
                className="flex  no-underline text-white items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">cloud_upload</span> Bulk Posts Upload
              </Link>
            </li>
            <li>
              <Link
                to="/admin/allpost"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">assignment</span> All Posts
              </Link>
            </li>
            <li>
              <Link
                to="/admin/polls"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">poll</span> Polls
              </Link>
            </li>
            <li>
              <Link
                to="/admin/epaper"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">description</span>
                UploadEpaper
              </Link>
            </li>

            <li>
              <Link
                to="/admin/categories"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">label</span> Categories
              </Link>
            </li>
            <li>
              <Link
                to="/admin/widgets"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">widgets</span> Widgets
              </Link>
            </li>
            <li>
              <Link
                to="/admin/gallery"
                onClick={handleLinkClick}
                className="flex text-white  no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">photo</span> Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/admin/contact"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">contact_mail</span> Contact
              </Link>
            </li>
            <li>
              <Link
                to="/admin/messages"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">message</span> Messages
              </Link>
            </li>
            <li>
              <Link
                to="/admin/comments"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">comment</span> Comments
              </Link>
            </li>
            <li>
              <Link
                to="/admin/newsletter"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">email</span> Newsletter
              </Link>
            </li>

            <li>
              <Link
                to="/admin/reward-system"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">stars</span> Reward System
              </Link>
            </li>
            <li>
              <Link
                to="/admin/ad-spaces"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">people</span> Ad Spaces
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">supervised_user_circle</span> Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/roles-permissions"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">security</span> Roles & Permissions
              </Link>
            </li>
            <li>
              <Link
                to="/admin/seo-tools"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">bar_chart</span> SEO Tools
              </Link>
            </li>
            <li>
              <Link
                to="/admin/storage"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">cloud</span> Storage
              </Link>
            </li>
            <li>
              <Link
                to="/admin/cache-system"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">settings_system_daydream</span> Cache System
              </Link>
            </li>
            <li>
              <Link
                to="/admin/google-news"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">article</span> Google News
              </Link>
            </li>

            <li>
              <Link
                to="/admin/settings"
                onClick={handleLinkClick}
                className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
              >
                <span className="material-icons align-middle mr-2">settings</span> Settings
              </Link>
            </li>

            {/* Conditionally render the Change Profile link */}
            {showProfileLink && (
              <li>
                <Link
                  to="/admin/change-profile"
                  className="flex text-white no-underline items-center p-2 text-sm hover:bg-gray-800 rounded-lg transition duration-300"
                >
                  <span className="material-icons align-middle mr-2">person</span> Change Profile
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
