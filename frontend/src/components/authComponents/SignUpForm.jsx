import { Link } from "react-router-dom";
import ProfileImageUpload from "./ProfileImageUpload";
import PasswordInput from "./PasswordInput";

const InputField = ({ name, placeholder, value, onChange, errors, required = false, type = "text" }) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-5 py-3 rounded-xl border-2 transition text-lg ${errors[name]
        ? "border-red-500 focus:border-red-500 ring-4 ring-red-100"
        : "border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
        }`}
    />
    {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
  </div>
);

const SignUpForm = ({
  formData,
  imagePreview,
  loading,
  errors,
  showPassword,
  showConfirm,
  onChange,
  onImageChange,
  onRemoveImage,
  onSubmit,
  onTogglePassword,
  onToggleConfirm
}) => {
  return (
    <div className="w-full max-w-5xl">
      <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-xl text-gray-600 mt-4">Create a new user account</p>
        </div>

        <ProfileImageUpload
          imagePreview={imagePreview}
          onImageChange={onImageChange}
          onRemoveImage={onRemoveImage}
        />

        {errors.submit && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center font-medium">
            {errors.submit}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InputField
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={onChange}
              errors={errors}
              required
            />

            <InputField name="email"
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={onChange}
              errors={errors}
              required
            />


            <InputField
              name="phoneNumber"
              placeholder="Phone Number *"
              value={formData.phoneNumber}
              onChange={onChange}
              errors={errors}
              required
            />

            <div>
              <PasswordInput
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={onChange}
                showPassword={showPassword}
                toggleShow={onTogglePassword}
                className={errors.password ? "border-red-500 focus:border-red-500 ring-4 ring-red-100" : ""}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirm Password *"
                value={formData.confirmPassword}
                onChange={onChange}
                showPassword={showConfirm}
                toggleShow={onToggleConfirm}
                className={errors.confirmPassword ? "border-red-500 focus:border-red-500 ring-4 ring-red-100" : ""}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <InputField
              name="city"
              placeholder="City *"
              value={formData.city}
              onChange={onChange}
              errors={errors}
              required
            />

            <InputField
              name="state"
              placeholder="State *"
              val
              ue={formData.state}
              onChange={onChange}
              errors={errors}
              required
            />

            <InputField
              name="country"
              placeholder="Country *" value={formData.country}
              onChange={onChange}
              errors={errors}
              required
            />

            <InputField
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={onChange}
              errors={errors}
            />

            <InputField
              name="address"
              placeholder="Address (Optional)"
              value={formData.address}
              onChange={onChange}
              errors={errors}
            />


            <InputField
              name="adminCode"
              placeholder="Admin Invite Code (Optional)"
              value={formData.adminCode}
              onChange={onChange}
              errors={errors}
              className="lg:col-span-2"
            />
          </div>

          <div className="text-center mt-12">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-70"
            >
              {loading ? "Creating User..." : "Create User"}
            </button>
          </div>
        </form>

        <p className="text-center mt-10 text-gray-600 text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;