import { MdEmail, MdPhone, MdLocationOn, MdCalendarToday } from "react-icons/md";

const ProfileDetails = ({ admin, memberSince }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Profile Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-4">
          <MdEmail className="text-2xl text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-base sm:text-lg">{admin.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <MdPhone className="text-2xl text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-base sm:text-lg">{admin.phoneNumber || "Not provided"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <MdLocationOn className="text-2xl text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium text-base sm:text-lg">{admin.city}, {admin.state}, {admin.country}</p>
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
    </div>
  );
};

export default ProfileDetails;