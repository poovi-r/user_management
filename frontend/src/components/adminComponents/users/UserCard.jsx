import { MdPhone, MdLocationOn } from "react-icons/md";
import UserCardActions from "./UserCardActions";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="relative h-48 bg-gradient-to-r from-purple-600 to-pink-600">
        <img
          src={user.profileImage || "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"}
          alt={user.name}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-32 h-32 rounded-full border-8 border-white shadow-2xl object-cover"
          onError={(e) => (e.target.src = "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg")}
        />
      </div>

      <div className="pt-20 pb-10 px-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{user.email}</p>

        <span
          className={`mt-4 inline-block px-6 py-2 rounded-full text-sm font-bold ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {user.role.toUpperCase()}
        </span>

        <div className="mt-6 space-y-3 text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <MdPhone className="text-blue-600" />
            <span className="text-sm">{user.phoneNumber || "—"}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MdLocationOn className="text-purple-600" />
            <span className="text-sm">
              {user.city}, {user.country}
            </span>
          </div>
        </div>

        <UserCardActions
          userId={user._id}
          userName={user.name}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default UserCard;