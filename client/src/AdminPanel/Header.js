import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear admin data from local storage
    localStorage.removeItem('adminToken'); // Ensure this key matches your stored token key
    // Redirect to the login page
    navigate('/admin/login'); // Adjust this path according to your routing setup
  };

  return (
    <div className="bg-white p-4 shadow-md w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Toggle Button for Sidebar */}
          <button
            onClick={toggleSidebar} // Ensure this function is passed as a prop
            className="text-black p-2 rounded-md mr-4 hover:bg-red-400 transition duration-300"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Site Button */}
          <Link 
            to="/" 
            className="flex items-center text-white bg-red-600 transition duration-300 p-2 rounded-md text-sm md:text-base"
          >
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            View Site
          </Link>

          {/* Logout Button */}
          <button 
            onClick={handleLogout} // Attach the logout function
            className="text-gray-800 hover:text-red-600 transition duration-300 text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
