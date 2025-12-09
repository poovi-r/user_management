const UserEditForm = ({ user, onChange, onSubmit, isSubmitting }) => {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={onChange}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={onChange}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={user.phoneNumber || ""}
          onChange={onChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
        <input
          type="text"
          name="city"
          value={user.city || ""}
          onChange={onChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
        <input
          type="text"
          name="state"
          value={user.state || ""}
          onChange={onChange}

          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
        <input
          type="text"
          name="country"
          value={user.country || ""}
          onChange={onChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        />
      </div>


      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Address (Optional)</label>
        <input
          type="text"
          name="address"
          value={user.address || ""}
          onChange={onChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Pincode</label>
        <input
          type="text"
          name="pincode"
          value={user.pincode || ""}
          onChange={onChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
        />
      </div>

      <div className="md:col-span-2 text-center mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.03] transition text-sm disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default UserEditForm;