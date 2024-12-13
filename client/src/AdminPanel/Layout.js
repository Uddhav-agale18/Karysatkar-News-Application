import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Start with sidebar open

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Desktop */}
      <div
        className={`bg-gray-800 text-white h-full transition-all duration-300 ease-in-out hidden md:block ${
          isSidebarOpen ? 'w-64' : 'w-9'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-lg font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>Admin Panel</h1>
          <button onClick={toggleSidebar} className={`text-white ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Sidebar for Mobile View */}
      <div
        className={`md:hidden bg-gray-800 text-white h-full transition-all duration-300 ease-in-out absolute top-0 left-0 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-lg font-bold`}>Admin Panel</h1>
          <button onClick={toggleSidebar} className="text-white">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Routed components are rendered here */}
        </div>
        {/* Footer */}
        <footer className="bg-white shadow-md p-4">
          <p className="text-center text-gray-700">© 2024 Your Company</p>
        </footer>
      </div>

      {/* Toggle Sidebar Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-2 bg-gray-800 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faBars : faBars} />
      </button>
    </div>
  );
};

export default Layout;
