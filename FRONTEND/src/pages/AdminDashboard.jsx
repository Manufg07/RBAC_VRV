import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaUsers, FaKey } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 flex flex-col items-center p-8">
      <h2 className="text-4xl font-bold text-indigo-800 mb-8 text-center border-2 border-indigo-600 rounded-lg inline-block p-4">
        Role-Based Access Control (RBAC) - VRV Security
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <Link
          to="/adminUser"
          className="bg-white shadow-md rounded-xl p-8 text-center transition duration-300 transform hover:scale-105 hover:shadow-lg border-t-4 border-y-4 border-yellow-500  flex flex-col items-center"
        >
          <FaUserPlus className="text-yellow-500 text-5xl mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">Add Users</h3>
          <p className="text-gray-600 mt-2">Create new user accounts</p>
        </Link>
        <Link
          to="/admin/users"
          className="bg-white shadow-md rounded-xl p-8 text-center transition duration-300 transform hover:scale-105 hover:shadow-lg border-t-4 border-y-4 border-blue-500 flex flex-col items-center"
        >
          <FaUsers className="text-blue-500 text-5xl mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">Manage Users</h3>
          <p className="text-gray-600 mt-2">View and edit user details</p>
        </Link>
        <Link
          to="/admin/roles"
          className="bg-white shadow-md rounded-xl p-8 text-center transition duration-300 transform hover:scale-105 hover:shadow-lg border-t-4 border-y-4 border-green-500 flex flex-col items-center"
        >
          <FaKey className="text-green-500 text-5xl mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">Manage Roles</h3>
          <p className="text-gray-600 mt-2">Assign and manage user roles</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
