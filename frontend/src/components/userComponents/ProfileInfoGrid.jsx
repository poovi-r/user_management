import { MdEmail, MdPhone, MdLocationOn, MdCalendarToday } from "react-icons/md";

const ProfileInfoGrid = ({ user }) => {
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const location = [user.city, user.state, user.country]
    .filter(Boolean)
    .join(", ") || "Not provided";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="flex items-center gap-4">
        <MdEmail className="text-2xl text-gray-400 flex-shrink-0" />
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-base sm:text-lg">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MdPhone className="text-2xl text-gray-400 flex-shrink-0" />
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium text-base sm:text-lg">
            {user.phoneNumber || "Not provided"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MdLocationOn className="text-2xl text-gray-400 flex-shrink-0" />
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium text-base sm:text-lg">{location}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MdCalendarToday className="text-2xl text-gray-400 flex-shrink-0" />
        <div>
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="font-medium text-base sm:text-lg">{memberSince}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoGrid;