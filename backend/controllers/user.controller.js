import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

async function loginUser(request, response) {
  try {
    const { email, password } = request.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return response
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return response
        .status(200)
        .json({ success: true, message: "User login successfully", token });
    } else {
      return response
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
}

async function registerUser(request, response) {
  try {
    const { name, email, password } = request.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return response
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    if (!validator.isEmail(email)) {
      return response
        .status(400)
        .json({ success: false, message: "Please enter a valid email." });
    }

    if (password.length < 8) {
      return response
        .status(400)
        .json({ success: false, message: "Please enter a strong password." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });

    const user = await newUser.save();
    const token = createToken(user._id);

    response.status(200).json({
      success: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
}

async function adminLogin(request, response) {}

export { loginUser, registerUser, adminLogin };
