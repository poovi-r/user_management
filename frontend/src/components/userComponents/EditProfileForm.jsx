import { useState } from "react";
import {
  MdEmail,
  MdPhone,
  MdHome,
  MdLocationOn,
  MdPublic,
  MdPinDrop,
} from "react-icons/md";
import Avatar from "./ProfileAvatar";

const EditProfileForm = ({ formData, setFormData, imageFile, setImageFile, imagePreview, setImagePreview, loading, onSubmit }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors(prev => ({ ...prev, profileImage: "Please select a valid image" }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { 
        setErrors(prev => ({ ...prev, profileImage: "Image must be under 5MB" }));
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, profileImage: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (formData.phoneNumber && !/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    if (formData.pincode && !/^\d{4,10}$/.test(formData.pincode)) {
      newErrors.pincode = "Invalid pincode";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-6">
        <Avatar
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          size="medium"
        />
        {errors.profileImage && (
          <p className="text-red-500 text-xs mt-2">{errors.profileImage}</p>
        )}
        <h1 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-gray-600 text-sm mt-1">Update your personal information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength="3"
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <MdEmail className="absolute left-3 top-3.5 text-gray-400 text-lg" />
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-500 bg-gray-100 text-sm cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
          <div className="relative">
            <MdPhone className="absolute left-3 top-3.5 text-gray-400 text-lg" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition`}
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Address (Optional)</label>
          <div className="relative">
            <MdHome className="absolute left-3 top-3.5 text-gray-400 text-lg" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              maxLength="150"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition"
            />
          </div>
        </div>

        {["city", "state", "country", "pincode"].map(field => {
          const icons = {
            city: MdLocationOn,
            country: MdPublic,
            pincode: MdPinDrop,
          };
          const Icon = icons[field] || null;

          return (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1).replace("pincode", "Pincode / ZIP")}
              </label>
              <div className="relative">
                {Icon && <Icon className="absolute left-3 top-3.5 text-gray-400 text-lg" />}
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full ${Icon ? "pl-10" : "px-4"} pr-4 py-2.5 rounded-lg border ${errors[field] ? "border-red-500" : "border-gray-300"} text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition`}
                />
              </div>
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-60 text-sm"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;