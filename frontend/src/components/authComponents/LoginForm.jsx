import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";

const LoginForm = ({ formData, showPassword, loading, error, onChange, onSubmit, onTogglePassword }) => {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-3 text-lg">Log in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center font-medium text-sm">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Phone Number *"
            value={formData.identifier}
            onChange={onChange}
            required
            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition text-lg"
          />

          <PasswordInput
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={onChange}
            showPassword={showPassword}
            toggleShow={onTogglePassword}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login Now"}
          </button>
        </form>

        <p className="text-center mt-10 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;