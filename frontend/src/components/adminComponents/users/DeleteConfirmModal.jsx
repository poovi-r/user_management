const DeleteConfirmModal = ({ user, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 w-full max-w-sm sm:max-w-md mx-4 shadow-2xl">
        <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-4 text-center sm:text-left">
          Delete User?
        </h3>
        <p className="text-gray-700 mb-8 text-sm sm:text-base leading-relaxed">
          Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition text-sm sm:text-base"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;