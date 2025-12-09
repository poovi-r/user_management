import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/authComponents/Header";
import SignUpForm from "../../components/authComponents/SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "", email: "", phoneNumber: "", password: "", confirmPassword: "",
    city: "", state: "", country: "", pincode: "", address: "", adminCode: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    const phoneDigits = formData.phoneNumber.replace(/\D/g, "");
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      newErrors.phoneNumber = "Phone Number must be 10 to 15 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    if (formData.pincode && !/^\d{5,6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Pincode must be 5 or 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    setImageFile(null);
    const input = document.querySelector('input[type="file"]');
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.password);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("country", formData.country);
    if (formData.pincode) data.append("pincode", formData.pincode);
    if (formData.address) data.append("address", formData.address);
    if (formData.adminCode === "ADMIN123") data.append("role", "admin");
    if (imageFile) data.append("profileImage", imageFile);

    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.map(e => e.msg || e.message).join(", ")
        || "Registration failed. Please try again.";
      setErrors({ submit: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header buttonText="Login" buttonTo="/login" />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-32 pb-12">
        <SignUpForm
          formData={formData}
          imagePreview={imagePreview}
          loading={loading}
          errors={errors}
          showPassword={showPassword}
          showConfirm={showConfirm}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
          onSubmit={handleSubmit}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onToggleConfirm={() => setShowConfirm(!showConfirm)}
        />
      </div>
    </>
  );
};

export default SignUp;