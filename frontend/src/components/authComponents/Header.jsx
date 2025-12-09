import { Link } from "react-router-dom";

const Header = ({ title = "Userflow", showHome = true, buttonText, buttonTo }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 py-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <nav className="flex items-center gap-3 sm:gap-4">
          {showHome && (
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 font-medium text-sm sm:text-base transition"
            >
              Home
            </Link>
          )}
          <Link
            to={buttonTo}
            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            {buttonText}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;