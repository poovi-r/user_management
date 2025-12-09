import User from "../models/userModel.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
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

      if (uploadedImg.secure_url) {
        user.profileImage = uploadedImg.secure_url;
      }
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

export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
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

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file selected",
      });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const imageUrl = result.secure_url;

    return res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      imageUrl
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
