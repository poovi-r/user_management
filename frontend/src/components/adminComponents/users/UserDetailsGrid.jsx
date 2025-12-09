import { MdEmail, MdPhone, MdLocationOn, MdCalendarToday, MdShield } from "react-icons/md";

const UserDetailsGrid = ({ user }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 mt-10 sm:mt-12 lg:mt-16">
      <div className="space-y-5 sm:space-y-6">
        <div className="flex items-start gap-4">
          <MdEmail className="text-2xl text-gray-400 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-base sm:text-lg break-words">{user.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MdPhone className="text-2xl text-gray-400 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-semibold text-base sm:text-lg">
              {user.phoneNumber || "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MdLocationOn className="text-2xl text-gray-400 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-semibold text-base sm:text-lg">
              {user.address
                ? `${user.address}, ${user.city}, ${user.state}`
                : "Not provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 sm:space-y-6">
        <div className="flex items-start gap-4">
          <MdCalendarToday className="text-2xl text-gray-400 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-semibold text-base sm:text-lg">
              {new Date(user.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MdShield className="text-2xl text-purple-600 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-bold text-base sm:text-lg lg:text-xl capitalize text-purple-700">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsGrid;