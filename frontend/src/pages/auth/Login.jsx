import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/authComponents/Header";
import LoginForm from "../../components/authComponents/LoginForm";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.identifier.trim() || !formData.password) {
      setError("Please fill in all fields");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const payload = { password: formData.password };
      if (formData.identifier.includes("@")) {
        payload.email = formData.identifier;
      } else if (formData.identifier.trim() !== "") {
        payload.phoneNumber = formData.identifier;
      }

      const res = await axios.post("http://localhost:5000/api/auth/login", payload);

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      const role = res.data.data.role;
      window.location.href = role === "admin" ? "/admin" : "/user/dashboard";
    } catch (err) {
      setError("Invalid email/phone or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header buttonText="Sign Up" buttonTo="/signup" />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-32 pb-12">
        <LoginForm
          formData={formData}
          showPassword={showPassword}
          loading={loading}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
      </div>
    </>
  );
};

export default Login;