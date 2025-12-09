import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import api from "../../utils/api.js";
import ProfileCard from "../../components/adminComponents/admin/ProfileCard.jsx";
import ProfileDetails from "../../components/adminComponents/admin/ProfileDetails.jsx";
import AccountActions from "../../components/adminComponents/admin/AccountActions.jsx";

const AdminProfileView = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setAdmin(res.data.data);
      } catch (error) {
        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/users/delete");
      localStorage.clear();
      alert("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      alert("Failed to delete account");
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div></div>;
  if (!admin) return null;

  const memberSince = new Date(admin.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-600 text-sm sm:text-base">View and manage your profile information</p>
        </div>
      </div>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="sm:hidden mb-4">
              <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium">
                <MdArrowBack className="text-lg" /> Back to Dashboard
              </button>
            </div>

            <div className="lg:col-span-1">
              <ProfileCard admin={admin} />
            </div>

            <div className="lg:col-span-2 space-y-8">
              <ProfileDetails admin={admin} memberSince={memberSince} />
              <AccountActions
                showConfirm={showConfirm}
                onLogout={handleLogout}
                onDeleteClick={() => setShowConfirm(true)}
                onConfirmDelete={handleDeleteAccount}
                onCancelDelete={() => setShowConfirm(false)}
              />
              <div className="hidden sm:flex justify-end mt-4">
                <button onClick={() => navigate("/admin")} className="px-6 py-3 bg-purple-600 text-white rounded-xl flex items-center gap-2 hover:bg-purple-700 transition">
                  <MdArrowBack /> Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileView;