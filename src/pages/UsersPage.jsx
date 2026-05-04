import { useEffect, useState } from "react";
import api from "../services/api";
import authService from "../services/authService";
import "./UsersPage.css";

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
      <div className="users-container">
        <div className="users-wrapper">
          <div className="users-header">
            <h1>Users</h1>
          </div>

          <div className="users-content">
            <div className="users-loading">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-wrapper">
        <div className="users-header">
          <h1>Users</h1>
          <p>{users.length} total user{users.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="users-content">
          {error && (
            <div className="users-error">
              {error}
            </div>
          )}

          {users.length === 0 ? (
            <div className="users-empty">
              <p>No users found</p>
            </div>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>

                  {currentUserEmail && user.email !== currentUserEmail && (
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId === user.id}
                      className="delete-button"
                    >
                      {deletingId === user.id ? "Deleting..." : "Delete User"}
                    </button>
                  )}

                  {currentUserEmail === user.email && (
                    <div className="user-badge">
                      Your Account
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;