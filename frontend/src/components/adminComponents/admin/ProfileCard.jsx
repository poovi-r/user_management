const ProfileCard = ({ admin }) => {
  const isAdmin = admin.role === "admin";

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600"></div>
      <div className="relative px-6 pb-10 -mt-16 text-center">
        <img
          src={admin.profileImage || "https://t4.ftcdn.net/jpg/07/61/57/77/240_F_761577759_kNs7KVw2JL8i9g19ZPB0FhuDydLQ0md6.jpg"}
          alt={admin.name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto border-6 sm:border-8 border-white shadow-2xl object-cover"
        />
        <h2 className="mt-6 text-2xl font-bold text-gray-900">{admin.name}</h2>
        <p className="text-gray-500 text-sm sm:text-base">{admin.email}</p>
        <span className={`inline-block mt-4 px-5 py-2 rounded-full text-sm font-bold ${isAdmin ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
          {isAdmin && "ADMIN"}
          {isAdmin ? "ADMIN" : "USER"}
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;