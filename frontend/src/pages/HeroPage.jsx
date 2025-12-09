import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight">
          Userflow
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-light text-gray-700 mb-10 sm:mb-14 max-w-4xl mx-auto px-4">
          Manage users effortlessly. Scale without limits.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 hover:shadow-3xl hover:-translate-y-4 transition-all duration-300 border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Welcome Back</h2>
            <p className="text-gray-600 mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg">
              Log in to access your account
            </p>
            <Link
              to="/login"
              className="block w-full py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg sm:text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              Login Now
            </Link>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 hover:shadow-3xl hover:-translate-y-4 transition-all duration-300 border-2 border-purple-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <span className="text-3xl sm:text-4xl text-white font-bold">+</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Join Us Today</h2>
            <p className="text-gray-600 mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg">
              Create your account and get started
            </p>
            <Link
              to="/signup"
              className="block w-full py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg sm:text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-16 text-gray-500 text-sm sm:text-base lg:text-lg">
          © 2025 Userflow. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default HeroPage;