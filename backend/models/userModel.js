import mongoose from "mongoose";
import bcrypt from  "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
      minlength: 3,
      match: [
        /^[A-Za-z ]+$/,
        "Name must contain alphabets only"
      ],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please enter email"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
      trim: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "Please enter phone number"],
      match: [
        /^\+?[0-9]{10,15}$/,
        "Phone number must be between 10 to 15 digits",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ],
    },
    address: {
      type: String,
      maxlength: 150,
      trim: true
    },
    state: {
      type: String,
      required: [true, "Please enter State"],
      trim: true
    },
    city: {
      type: String,
      required: [true, "Please enter city"],
      trim: true
    },
    country: {
      type: String,
      required: [true, "Please enter country"],
      trim: true
    },
    pincode: {
      type: String,
      trim: true,
      match: [
        /^\+?[0-9]{4,10}$/,
        "Phone number must be between 4 to 10 digits",
      ]
    },
    profileImage: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);
export default User;