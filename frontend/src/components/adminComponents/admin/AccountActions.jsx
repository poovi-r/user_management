import { MdLogout, MdWarning } from "react-icons/md";

const AccountActions = ({ showConfirm, onLogout, onDeleteClick, onConfirmDelete, onCancelDelete }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
      {!showConfirm ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={onLogout} className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2">
            <MdLogout className="text-lg" /> Logout
          </button>
          <button onClick={onDeleteClick} className="w-full sm:w-auto px-6 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2">
            <MdWarning className="text-lg" /> Delete Account
          </button>
        </div>
      ) : (
        <div className="bg-red-600 p-6 rounded-2xl shadow-xl text-white">
          <p className="font-bold mb-4 text-lg">Warning: Are you sure? This will permanently delete your account.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={onConfirmDelete} className="w-full sm:w-auto px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition">
              Delete
            </button>
            <button onClick={onCancelDelete} className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountActions;