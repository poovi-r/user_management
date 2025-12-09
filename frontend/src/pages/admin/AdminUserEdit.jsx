import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import EditUserHeader from "../../components/adminComponents/userEdit/EditUserHeader.jsx";
import ProfileImageUploader from "../../components/adminComponents/userEdit/ProfileImageUploader.jsx";
import UserEditForm from "../../components/adminComponents/userEdit/UserEditForm.jsx";

const AdminUserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/admin/${id}`);
        setUser(res.data.data);
      } catch (err) {
        alert("Failed to load user");
        navigate("/admin/users");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    ["name", "email", "phoneNumber", "city", "state", "country", "address", "pincode"].forEach(field =>
      formData.append(field, user[field] || "")
    );
    if (imageFile) formData.append("profileImage", imageFile);

    try {
      await api.put(`/admin/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("User updated successfully!");
      navigate("/admin/users");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading user...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <EditUserHeader />

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Edit User
          </h1>

          <ProfileImageUploader profileImage={user.profileImage} onImageChange={handleImageChange} />
          <UserEditForm user={user} onChange={handleChange} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default AdminUserEdit;