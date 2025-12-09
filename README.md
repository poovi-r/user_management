# User Management System (MERN)
A complete Full-Stack **User Management System** built using the **MERN Stack**, developed as part of the **Harvee Designs Full-Stack Developer Technical Assignment**.

The system includes authentication, JWT security, admin dashboard, CRUD operations, image uploads, and search/filter capabilities.

---

## 🔗 Repository  
**GitHub:** https://github.com/poovi-r/user_management.git

---

## 🚀 Tech Stack

### **Frontend**
- React.js (Vite)
- Axios
- React Router DOM
- TailwindCSS / CSS
- JWT handling & protected routes

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (Local image upload) / Cloudinary (If used)
- bcryptjs (Password hashing)
- JWT (Access + Refresh tokens)
- express-validator (Validation)
- CORS, Helmet (Security)

---

## 🧩 Features

### 👤 **User Features**
- Register with validation & profile image upload
- Login using **email or phone**
- JWT authentication (Access & Refresh Tokens)
- User details stored securely with hashed passwords

### 🛠️ **Admin Features**
- View all users (table)
- Search by name/email/state/city
- Filter users
- Update user details
- View single user profile
- Delete user
- Logout (clear session)

### 🗄️ **REST APIs**
| Method | Route | Description |
|--------|-----------------------|----------------------------|
| POST   | `/api/auth/register`  | User Registration |
| POST   | `/api/auth/login`     | User Login |
| GET    | `/api/users`          | Get all users (Admin only) |
| GET    | `/api/users/:id`      | Get user by ID |
| PUT    | `/api/users/:id`      | Update user |
| DELETE | `/api/users/:id`      | Delete user |

---

## 📦 Folder Structure
user_management/
│── backend/ # Node.js + Express API
│── frontend/ # React.js client
│── README.md


---

## ⚙️ Installation & Setup

### **1. Clone Repository**
```bash
git clone https://github.com/poovi-r/user_management.git
cd user_management


---

🖥️ Backend Setup

cd backend

# Install dependencies
npm install

# Copy example environment file
cp .env.example .env

# Update .env with:
# MONGO_URI=
# JWT_SECRET=
# JWT_REFRESH_SECRET=
# CLOUDINARY credentials (optional)

# Start development server
npm start

Backend runs on:
👉 http://localhost:5000


---

🌐 Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs on:
👉 http://localhost:5173


---

🔐 Environment Variables (.env)

Your backend .env must include:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

# For Cloudinary image upload (optional)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


---

🔒 Security Implementations
 => Passwords encrypted using bcryptjs
 => JWT authentication for protected routes
 => Refresh token mechanism
 => Input validation through express-validator
 => Only admins can access user management APIs
 => Image upload restrictions: jpg/png, max 5MB
 => Helmet for secure HTTP headers
 => CORS enabled for frontend-backend communication


---

🧑‍💻 Author

Poovarasan R
GitHub: https://github.com/poovi-r


🎉 Thank you for reviewing my project!