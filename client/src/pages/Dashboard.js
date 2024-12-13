import React from 'react';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 p-4">
      <div className="bg-white shadow-md p-4 rounded-lg ml-4">
        <h2 className="text-xl font-bold mb-2">Posts</h2>
        <p className="text-2xl font-semibold text-blue-600">37</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg ml-4">
        <h2 className="text-xl font-bold mb-2">Pending Posts</h2>
        <p className="text-2xl font-semibold text-yellow-600">2</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg ml-4">
        <h2 className="text-xl font-bold mb-2">Drafts</h2>
        <p className="text-2xl font-semibold text-gray-600">0</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg ml-4">
        <h2 className="text-xl font-bold mb-2">Scheduled Posts</h2>
        <p className="text-2xl font-semibold text-green-600">0</p>
      </div>
    </div>
  );
};

export default Dashboard;
