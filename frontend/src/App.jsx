import { Navigate, Route, Routes } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import UserProfileDashboard from "./pages/user/UserProfileDashboard";
import ProfileEdit from "./pages/user/ProfileEdit";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminUserProfileView from "./pages/admin/AdminUserProfileView";
import AdminUserEdit from "./pages/admin/AdminUserEdit";
import AdminProfileView from "./pages/admin/AdminProfileView";

const App = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = !!token;
  const isAdmin = user.role === "admin";

  const RequireAuth = ({ children, adminOnly = false }) => {
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* User Routes */}
      <Route
        path="/user/dashboard"
        element={isLoggedIn ? <UserProfileDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/user/edit"
        element={isLoggedIn ? <ProfileEdit /> : <Navigate to="/login" />}
      />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <RequireAuth adminOnly={true}>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="users/view" element={<AdminUserProfileView />} />
        <Route path="users/edit/:id" element={<AdminUserEdit />} />
      </Route>

      <Route
        path="/admin/profile"
        element={
          <RequireAuth adminOnly={true}>
            <AdminProfileView isAdmin={true} />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  );
};

export default App;