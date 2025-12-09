import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdPerson,
  MdLogout,
  MdSearch,
} from "react-icons/md";
import api from "../utils/api";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const isUsersPage = location.pathname.startsWith("/admin/users");
  const isDashboardPage = location.pathname === "/admin" || location.pathname === "/admin/";

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/users/profile");
        setAdmin(res.data.data);
      } catch (err) {
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleSidebar = () => {
    const sidebar = document.querySelector("aside");
    const overlay = document.getElementById("overlay");
    sidebar?.classList.toggle("-translate-x-full");
    overlay?.classList.toggle("hidden");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div
        id="overlay"
        className="fixed inset-0 bg-black/50 z-40 lg:hidden hidden"
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside className="fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform -translate-x-full lg:translate-x-0 transition-transform duration-300 flex flex-col h-screen">
        <div className="p-8 text-center border-b border-gray-100 relative">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 lg:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <img
            src={admin?.profileImage || "https://t4.ftcdn.net/jpg/07/61/57/77/240_F_761577759_kNs7KVw2JL8i9g19ZPB0FhuDydLQ0md6.jpg"}
            alt={admin?.name}
            className="w-24 h-24 rounded-full mx-auto border-4 border-purple-500 shadow-2xl object-cover"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{admin?.name || "Admin"}</h2>
          <p className="text-gray-500 text-sm">{admin?.email}</p>

          <button
            onClick={() => navigate("/user/dashboard")}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition text-base"
          >
            <MdPerson className="text-xl" /> View Profile
          </button>
        </div>

        <nav className="flex-1 px-6 py-8 space-y-3">
          <Link
            to="/admin"
            className={`flex items-center gap-4 w-full py-4 px-6 rounded-2xl font-semibold transition-all ${isDashboardPage
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <MdDashboard className="text-2xl" />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className={`flex items-center gap-4 w-full py-4 px-6 rounded-2xl font-semibold transition-all ${isUsersPage
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <MdPeople className="text-2xl" />
            Users
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl shadow-lg transition text-base"
          >
            <MdLogout className="text-2xl" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-bold text-gray-900">
            {isUsersPage ? "All Users" : "Dashboard"}
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-3 rounded-xl hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex bg-white px-8 py-6 items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isUsersPage ? "All Users" : "Welcome back!"}
            </h1>
            <p className="text-gray-600 mt-2">
              {isUsersPage ? "Manage your entire team" : "Here's your team overview"}
            </p>
          </div>

          {/* Desktop Search*/}
          {isUsersPage && (
            <div className="relative w-96">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              )}
            </div>
          )}
        </header>

        {/* Mobile Search */}
        {isUsersPage && (
          <div className="lg:hidden px-6 pt-4 pb-2">
            <div className="relative">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-2xl"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet context={{ searchTerm, setSearchTerm }} />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;