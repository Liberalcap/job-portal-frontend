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
    if (!window.confirm("Are you sure?")) return;

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>

      {/* ✅ Loading */}
      {loading && <p>Loading users...</p>}

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Data */}
      {!loading && !error && users.length === 0 && (
        <p>No users found</p>
      )}

      {!loading &&
        !error &&
        users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>

            {/* ✅ Prevent deleting yourself safely */}
            {currentUserEmail && user.email !== currentUserEmail && (
              <button
                onClick={() => handleDelete(user.id)}
                disabled={deletingId === user.id}
              >
                {deletingId === user.id ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

export default UsersPage;