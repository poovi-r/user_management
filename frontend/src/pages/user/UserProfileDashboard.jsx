import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api.js";
import ProfileHeader from "../../components/userComponents/ProfileHeader.jsx";
import ProfileCard from "../../components/userComponents/ProfileCard.jsx";
import ProfileInfoGrid from "../../components/userComponents/ProfileInfoGrid.jsx";

const UserProfileDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data.data);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader title="My Profile" />

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProfileCard user={user} />
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Details</h3>
                  <button
                    onClick={() => navigate("/user/edit")}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition flex items-center justify-center gap-2"
                  >
                    Edit Profile
                  </button>
                </div>
                <ProfileInfoGrid user={user} />
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                {!showConfirm ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleLogout}
                      className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="w-full sm:w-auto px-6 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2"
                    >
                      Delete Account
                    </button>
                  </div>
                ) : (
                  <div className="bg-red-600 p-6 rounded-2xl shadow-xl text-white">
                    <p className="font-bold mb-4 text-lg">
                      Are you sure? This will permanently delete your account.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleDeleteAccount}
                        className="w-full sm:w-auto px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDashboard;