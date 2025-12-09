import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, confirmPassword, address, state, city, country, pincode, role, profileImage } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!phoneNumber) return res.status(400).json({ message: "Phone number is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    if (!confirmPassword) return res.status(400).json({ message: "confirmPassword is required" });
    if (!state) return res.status(400).json({ message: "State is required" });
    if (!city) return res.status(400).json({ message: "City is required" });
    if (!country) return res.status(400).json({ message: "Country is required" });


    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] })

    if (existingUser) {
      let message = "";
      if (existingUser.email === email) {
        message = "User with this email already exists";
      } else if (existingUser.phoneNumber === phoneNumber) {
        message = "User with this Phone Number already exists";
      }
      return res.status(400).json({
        success: false,
        message
      });
    }

    if (password !== confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "Password and confirm password do not match"
      });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const newUser = await User.create({
      name,
      email,
      phoneNumber,
      password,
      address,
      state,
      city,
      country,
      pincode,
      profileImage: imageUrl,
      role: role || "user"
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();


    res.status(201).json({
      message: "User registered successfully",
      data: userWithoutPassword,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    if ((!email && !phoneNumber) || !password) {
      return res.status(404).json({
        success: false,
        message: "Please enter Email or Phone Number and Password"
      });
    };

    let query = null;
    if (email && phoneNumber) {
      query = { $or: [{ email }, { phoneNumber }] };
    } else if (email) {
      query = { email };
    } else {
      query = { phoneNumber };
    }

    const user = await User.findOne(query).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found with this email or phone number"
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(201).json({
      message: "Logged in successfully",
      accessToken,
      refreshToken,
      data: userWithoutPassword,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

