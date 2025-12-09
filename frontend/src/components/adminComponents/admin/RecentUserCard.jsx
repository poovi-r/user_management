const RecentUserCard = ({ user, onViewProfile }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group">
      <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 relative">
        <img
          src={user.profileImage || "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"}
          alt={user.name}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-28 h-28 rounded-full border-8 border-white shadow-2xl object-cover group-hover:scale-110 transition"
        />
      </div>
      <div className="pt-16 pb-8 px-6 text-center">
        <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{user.email}</p>
        <span className={`inline-block mt-4 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
          {user.role}
        </span>
        <button
          onClick={() => onViewProfile(user)}
          className="mt-8 w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default RecentUserCard;