import { MdEdit, MdDelete } from "react-icons/md";

const UserCardActions = ({ userId, userName, onEdit, onDelete }) => {
  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-3">
      <button
        onClick={() => onEdit(userId)}
        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition"
      >
        <MdEdit /> Edit
      </button>
      <button
        onClick={() => onDelete(userId, userName)}
        className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transform hover:scale-105 transition"
      >
        <MdDelete /> Delete
      </button>
    </div>
  );
};

export default UserCardActions;