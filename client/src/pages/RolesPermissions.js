import React from 'react';

const RolesPermissions = () => {
  const roles = [
    { id: 1, role: "Administrator", permissions: "Full Access" },
    { id: 2, role: "Editor", permissions: "Edit, View" },
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Roles & Permissions</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td className="border px-4 py-2">{role.id}</td>
              <td className="border px-4 py-2">{role.role}</td>
              <td className="border px-4 py-2">{role.permissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesPermissions;
