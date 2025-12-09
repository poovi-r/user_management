import { MdShield } from "react-icons/md";
import Avatar from "./ProfileAvatar";

const ProfileCard = ({ user }) => {
  const isAdmin = user.role === "admin";

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600"></div>
      <div className="relative px-6 pb-10 -mt-16 text-center">
        <Avatar imagePreview={user.profileImage} size="large" />
        <h2 className="mt-6 text-2xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-gray-500 text-sm sm:text-base">{user.email}</p>
        <span
          className={`inline-block mt-4 px-5 py-2 rounded-full text-sm font-bold ${
            isAdmin
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {isAdmin && <MdShield className="inline mr-1" />}
          {isAdmin ? "ADMIN" : "USER"}
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;