import React from 'react';

const Categories = () => {
  const categories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Health" },
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td className="border px-4 py-2">{category.id}</td>
              <td className="border px-4 py-2">{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
