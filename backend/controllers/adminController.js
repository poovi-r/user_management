import User from "../models/userModel.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: users
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: userWithoutPassword
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.address = req.body.address || user.address;
    user.state = req.body.state || user.state;
    user.city = req.body.city || user.city;
    user.country = req.body.country || user.country;
    user.pincode = req.body.pincode || user.pincode;

    if (req.file) {
      const uploadedImg = await uploadToCloudinary(req.file.buffer);
      user.profileImage = uploadedImg.secure_url;
    }

    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();
    return res.status(201).json({
      success: true,
      message: "User updated successfully",
      data: userWithoutPassword
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Account deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
