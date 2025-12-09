import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const UserProfileActions = ({ userId, onDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 sm:mt-10 px-4 sm:px-0">
      <button
        onClick={() => navigate(`/admin/users/edit/${userId}`)}
        className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition text-sm sm:text-base whitespace-nowrap"
      >
        <MdEdit className="text-lg sm:text-xl" />
        Edit User
      </button>

      <button
        onClick={onDeleteClick}
        className="flex items-center justify-center gap-3 px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition text-sm sm:text-base whitespace-nowrap"
      >
        <MdDelete className="text-lg sm:text-xl" />
        Delete User
      </button>
    </div>
  );
};

export default UserProfileActions;