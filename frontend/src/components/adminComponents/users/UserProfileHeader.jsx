import { MdShield } from "react-icons/md";

const UserProfileHeader = ({ user }) => {
  return (
    <div className="text-center">
      <div className="relative inline-block">
        <img
          src={user.profileImage || "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"}
          alt={user.name}
          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-8 sm:border-10 border-white shadow-2xl object-cover"
        />
        {user.role === "admin" && (
          <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-4 lg:right-4 bg-purple-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 shadow-lg whitespace-nowrap">
            <MdShield className="text-sm sm:text-base" /> ADMIN
          </span>
        )}
      </div>

      <h1 className="mt-6 sm:mt-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
        {user.name}
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 mt-1">{user.email}</p>
    </div>
  );
};

export default UserProfileHeader;