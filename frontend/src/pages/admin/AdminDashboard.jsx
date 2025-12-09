import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdPeople, MdAdminPanelSettings } from "react-icons/md";
import api from "../../utils/api.js";
import StatsCard from "../../components/adminComponents/admin/StatsCard.jsx";
import RecentUserCard from "../../components/adminComponents/admin/RecentUserCard.jsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, admins: 0, regular: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/admin");
        const allUsers = res.data.data || [];
        const adminsCount = allUsers.filter(u => u.role === "admin").length;
        setUsers(allUsers.slice(0, 6));
        setStats({
          total: allUsers.length,
          admins: adminsCount,
          regular: allUsers.length - adminsCount,
        });
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleViewProfile = (user) => {
    navigate("/admin/users/view", { state: user });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <main className="p-6 lg:p-10 space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <StatsCard label="Total Users" value={stats.total} icon={MdPeople} color="blue" />
        <StatsCard label="Admins" value={stats.admins} icon={MdAdminPanelSettings} color="purple" />
        <StatsCard label="Regular Users" value={stats.regular} icon={MdPeople} color="green" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Users</h2>
        {users.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No users found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <RecentUserCard key={user._id} user={user} onViewProfile={handleViewProfile} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;