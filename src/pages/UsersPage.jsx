import { useEffect, useState } from "react";
import api from "../services/api";
import authService from "../services/authService";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUserEmail = authService.getUserEmail();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setDeletingId(id);
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Users</h2>
        <p className="text-gray-600">{users.length} total user{users.length !== 1 ? 's' : ''}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {users.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 text-lg">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{user.name}</h3>
                <p className="text-gray-600 text-sm break-all">{user.email}</p>
              </div>

              {currentUserEmail && user.email !== currentUserEmail && (
                <button
                  onClick={() => handleDelete(user.id)}
                  disabled={deletingId === user.id}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
                >
                  {deletingId === user.id ? "Deleting..." : "Delete User"}
                </button>
              )}
              
              {currentUserEmail === user.email && (
                <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-center text-sm font-medium">
                  Your Account
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersPage;