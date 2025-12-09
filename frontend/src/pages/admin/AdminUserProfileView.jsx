import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useState } from "react";
import api from "../../utils/api.js";
import UserProfileHeader from "../../components/adminComponents/users/UserProfileHeader.jsx";
import UserProfileActions from "../../components/adminComponents/users/UserProfileActions.jsx";
import UserDetailsGrid from "../../components/adminComponents/users/UserDetailsGrid.jsx";
import DeleteConfirmModal from "../../components/adminComponents/users/DeleteConfirmModal.jsx";

const AdminUserProfileView = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!state) {
    navigate("/admin/users");
    return null;
  }

  const user = state;

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/${user._id}`);
      alert(`${user.name} deleted successfully`);
      navigate("/admin/users");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 sm:mb-8 transition text-sm sm:text-base"
        >
          <MdArrowBack className="text-xl sm:text-2xl" />
          Back to Users
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600"></div>

          <div className="relative px-6 sm:px-8 lg:px-10 pb-10 sm:pb-16 -mt-20 sm:-mt-24 lg:-mt-32">
            <UserProfileHeader user={user} />
            <UserProfileActions userId={user._id} onDeleteClick={() => setShowDeleteConfirm(true)} />
            <UserDetailsGrid user={user} />
          </div>
        </div>

        {showDeleteConfirm && (
          <DeleteConfirmModal
            user={user}
            onConfirm={() => {
              handleDelete();
              setShowDeleteConfirm(false);
            }}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUserProfileView;