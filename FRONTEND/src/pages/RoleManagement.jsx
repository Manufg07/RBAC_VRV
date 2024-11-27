import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus, FaArrowLeft } from "react-icons/fa";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [permissions, setPermissions] = useState("");
  const [editRoleId, setEditRoleId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch roles on component load
  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/roles");
        setRoles(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch roles.");
        console.error("Error fetching roles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleAddOrUpdateRole = async (e) => {
    e.preventDefault();
    const roleData = {
      name: newRole.trim(),
      permissions: permissions.split(",").map((p) => p.trim()),
    };

    try {
      if (!roleData.name || roleData.permissions.length === 0) {
        setErrorMessage("Role name and permissions are required.");
        return;
      }
      const response = editRoleId
        ? await axios.put(
            `http://localhost:5000/api/roles/${editRoleId}`,
            roleData
          )
        : await axios.post("http://localhost:5000/api/roles", roleData);

      setRoles((prevRoles) =>
        editRoleId
          ? prevRoles.map((role) =>
              role._id === editRoleId
                ? { ...role, ...response.data.role }
                : role
            )
          : [...prevRoles, response.data]
      );

      setNewRole("");
      setPermissions("");
      setEditRoleId(null);
      setShowModal(false);
      setSuccessMessage(
        `Role ${editRoleId ? "updated" : "added"} successfully!`
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(`Failed to ${editRoleId ? "update" : "add"} role.`);
      console.error("Error:", error);
    }
  };

  const handleDeleteRole = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/roles/${id}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
      setSuccessMessage("Role deleted successfully.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage("Failed to delete role.");
      console.error("Error deleting role:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] p-6">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/admin"
          className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#163267] text-white py-2 px-6 rounded-lg shadow-md transition duration-200"
        >
          <FaArrowLeft />
          Back to Admin Dashboard
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-center text-[#1E3A8A] mb-8">
        Role Management
      </h2>

      {successMessage && (
        <div className="bg-green-500 text-white py-2 px-4 rounded-lg mb-6 text-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-500 text-white py-2 px-4 rounded-lg mb-6 text-center">
          {errorMessage}
        </div>
      )}

      <div className="mb-6 text-center">
        <button
          onClick={() => {
            setNewRole("");
            setPermissions("");
            setEditRoleId(null);
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#163267] text-white py-2 px-6 rounded-lg shadow-md transition duration-200"
        >
          <FaPlus />
          Add New Role
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-md w-1/3 p-6">
            <h3 className="text-2xl font-bold mb-4 text-[#1E3A8A]">
              {editRoleId ? "Edit Role" : "Add Role"}
            </h3>
            <form onSubmit={handleAddOrUpdateRole} className="space-y-6">
              <div>
                <label className="block text-[#374151] font-medium mb-2">
                  Role Name
                </label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>
              <div>
                <label className="block text-[#374151] font-medium mb-2">
                  Permissions (comma-separated)
                </label>
                <input
                  type="text"
                  value={permissions}
                  onChange={(e) => setPermissions(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full bg-[#1E3A8A] hover:bg-[#163267] text-white py-2 rounded-lg shadow-md transition duration-200"
                >
                  {editRoleId ? "Update Role" : "Add Role"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg shadow-md transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
        {isLoading ? (
          <p className="text-center text-[#374151]">Loading roles...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#1E3A8A] text-white">
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Permissions</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr
                  key={role._id}
                  className="hover:bg-[#DCE4F0] border-b border-gray-200"
                >
                  <td className="px-4 py-2">{role.name}</td>
                  <td className="px-4 py-2">
                    {Array.isArray(role.permissions)
                      ? role.permissions.join(", ")
                      : "No permissions"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setNewRole(role.name);
                        setPermissions(role.permissions.join(", "));
                        setEditRoleId(role._id);
                        setShowModal(true);
                      }}
                      className="text-[#1E3A8A] hover:text-[#163267] mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RoleManagement;
