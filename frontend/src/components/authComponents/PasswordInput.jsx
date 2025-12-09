import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const PasswordInput = ({
  name,
  placeholder,
  value,
  onChange,
  showPassword,
  toggleShow,
  required = true,
  className = ""
}) => {
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-6 py-4 pr-14 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition text-lg ${className}`}
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
      >
        {showPassword ? <MdVisibilityOff className="text-2xl" /> : <MdVisibility className="text-2xl" />}
      </button>
    </div>
  );
};

export default PasswordInput;