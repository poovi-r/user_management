const ProfileImageUploader = ({ profileImage, onImageChange }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        <img
          src={profileImage || "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"}
          alt="Profile"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white shadow-lg"
        />
        <label className="absolute bottom-1 right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:scale-105 transition">
          <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUploader;