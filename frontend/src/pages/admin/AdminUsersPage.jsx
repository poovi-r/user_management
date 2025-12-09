import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import UserGrid from "../../components/adminComponents/users/UserGrid.jsx";

const AdminUsersPage = () => {
  const { searchTerm } = useOutletContext() || {};
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin");
        setUsers(res.data.data || []);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    const term = (searchTerm || "").toLowerCase().trim();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        (user.phoneNumber && user.phoneNumber.includes(term))
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleEdit = (id) => navigate(`/admin/users/edit/${id}`);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    try {
      await api.delete(`/admin/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <main className="p-6 lg:p-10">
      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500 py-20 text-xl">
          Loading
        </p>
      ) : (
        <UserGrid
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
};

export default AdminUsersPage;