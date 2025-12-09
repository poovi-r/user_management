import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import EditProfileForm from "../../components/userComponents/EditProfileForm.jsx";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        const user = res.data.data;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          address: user.address || "",
          city: user.city || "",
          state: user.state || "",
          country: user.country || "",
          pincode: user.pincode || "",
          profileImage: user.profileImage || "",
        });
        setImagePreview(user.profileImage || "");
      } catch (err) {
        alert("Failed to load profile");
        navigate("/user/dashboard");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] && key !== "email" && key !== "profileImage") {
        submitData.append(key, formData[key]);
      }
    });

    if (imageFile) submitData.append("profileImage", imageFile);

    try {
      const res = await api.put("/users/update", submitData);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      alert("Profile updated successfully!");
      navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-28 sm:h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600"></div>
          <div className="relative px-6 sm:px-8 pb-10 -mt-14 sm:-mt-16">
            <EditProfileForm
              formData={formData}
              setFormData={setFormData}
              imageFile={imageFile}
              setImageFile={setImageFile}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              loading={loading}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;