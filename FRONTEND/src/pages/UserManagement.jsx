import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaArrowLeft } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, {
        status: newStatus,
      });
      setUsers(
        users.map((user) =>
          user._id === id
            ? { ...user, status: newStatus, isEditing: false }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEditStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, isEditing: !user.isEditing } : user
      )
    );
  };

  const handleStatusEditChange = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] p-6">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/admin"
          className="bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white py-2 px-6 rounded-lg shadow-md flex items-center gap-2"
        >
          <FaArrowLeft /> Admin Dashboard
        </Link>
      </div>
      <h2 className="text-3xl font-bold text-center text-[#1E3A8A] mb-8">
        User Management
      </h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#1E3A8A] text-white">
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Role</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="text-center border-b last:border-none hover:bg-gray-100"
              >
                <td className="px-4 py-3 border">{user.name}</td>
                <td className="px-4 py-3 border">{user.email}</td>
                <td className="px-4 py-3 border">
                  {user.role?.name || "No Role Assigned"}
                </td>
                <td className="px-4 py-3 border capitalize">
                  {user.isEditing ? (
                    <select
                      value={user.status}
                      onChange={(e) =>
                        handleStatusEditChange(user._id, e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <span>{user.status}</span>
                  )}
                </td>
                <td className="px-4 py-3 border flex justify-center gap-2">
                  {user.isEditing ? (
                    <button
                      onClick={() => handleStatusChange(user._id, user.status)}
                      className="bg-[#2ECC71] hover:bg-[#27AE60] text-white px-3 py-2 rounded shadow-md flex items-center gap-1"
                    >
                      <FaCheck /> Update
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditStatus(user._id)}
                      className="bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white px-3 py-2 rounded shadow-md flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-[#E74C3C] hover:bg-[#C0392B] text-white px-3 py-2 rounded shadow-md flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
