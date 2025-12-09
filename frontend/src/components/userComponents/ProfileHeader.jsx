import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ title = "My Profile", backTo = -1 }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {title === "Edit Profile" ? "Update your personal information" : "View and manage your profile information"}
          </p>
        </div>
        {title === "Edit Profile" && (
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm"
          >
            <MdArrowBack className="text-lg" />
            Back to Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;