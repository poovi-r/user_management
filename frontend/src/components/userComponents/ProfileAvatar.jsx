import { MdEdit } from "react-icons/md";

const ProfileAvatar = ({ imagePreview, onImageChange, size = "large" }) => {
  const sizes = {
    large: "w-28 h-28 sm:w-32 sm:h-32 border-6 sm:border-8",
    medium: "w-24 h-24 sm:w-28 sm:h-28 border-4",
  };

  return (
    <div className="relative inline-block">
      <img
        src={
          imagePreview ||
          "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
        }
        alt="Profile"
        className={`${sizes[size]} rounded-full border-white shadow-xl object-cover`}
      />
      {onImageChange && (
        <label className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow cursor-pointer">
          <MdEdit className="text-lg" />
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ProfileAvatar;