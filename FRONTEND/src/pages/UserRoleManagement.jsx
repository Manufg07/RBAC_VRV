import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserPlus, FaUserTag, FaArrowLeft } from "react-icons/fa";

const UserRoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [status, setStatus] = useState("active");
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const fetchRolesAndUsers = async () => {
      try {
        const roleResponse = await axios.get("http://localhost:5000/api/roles");
        const userResponse = await axios.get("http://localhost:5000/api/users");
        setRoles(roleResponse.data);
        setUsers(userResponse.data);
      } catch (error) {
        console.error("Error fetching roles or users:", error);
      }
    };
    fetchRolesAndUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/add-user",
        {
          name,
          email,
          status,
        }
      );
      setUsers([...users, response.data.user]);
      setName("");
      setEmail("");
      setStatus("active");
      alert("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  const handleAssignRole = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/assign-role",
        {
          userId: selectedUserId,
          roleId,
        }
      );
      setUsers(
        users.map((user) =>
          user._id === selectedUserId
            ? { ...user, role: response.data.user.role }
            : user
        )
      );
      setSelectedUserId("");
      setRoleId("");
      alert("Role assigned successfully");
    } catch (error) {
      console.error("Error assigning role:", error);
      alert("Error assigning role");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/admin"
          className="flex items-center gap-2 text-white bg-[#1E3A8A] hover:bg-[#1D4ED8] py-2 px-4 rounded-lg shadow-md transition duration-200"
        >
          <FaArrowLeft /> Go to Admin Dashboard
        </Link>
      </div>
      <h2 className="text-3xl font-bold text-center text-[#1E3A8A] mb-8">
        User & Role Management
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add User */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <FaUserPlus className="text-[#1E3A8A] text-2xl" />
            <h3 className="text-xl font-semibold text-gray-700">Add User</h3>
          </div>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white py-2 rounded-lg shadow-md transition duration-200"
            >
              Add User
            </button>
          </form>
        </div>

        {/* Assign Role */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <FaUserTag className="text-[#1E3A8A] text-2xl" />
            <h3 className="text-xl font-semibold text-gray-700">
              Assign Role to User
            </h3>
          </div>
          <form onSubmit={handleAssignRole} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                User
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Role
              </label>
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white py-2 rounded-lg shadow-md transition duration-200"
            >
              Assign Role
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRoleManagement;
