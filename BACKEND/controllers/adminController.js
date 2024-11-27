const Admin = require("../models/Admin");
const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { JWT_SECRET } = process.env;

exports.registerAdmin = async (req, res) => {
 const { name, email, password, } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering admin' });
  }
};


exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ error: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { AdminId: admin._id , email: admin.email },
      JWT_SECRET,
      { expiresIn: "1h" }
  );

  res.cookie("AdminToken", token, { httpOnly: true });
  res.json({
      status: true,
      message: "Login success",
      token,
  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error logging in' });
  }
};


exports.addUserByAdmin = async (req, res) => {
  try {
    const { name, email, status } = req.body;

    const defaultPassword = "password123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      status: status || "inactive",
    });

    await user.save();

    res.status(201).json({
      message: "User added successfully",
      user: { ...user._doc, password: undefined }, 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    console.log("Assigning Role:", { userId, roleId });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    user.role = roleId;
    await user.save();

    res.json({
      message: "Role assigned to user successfully",
      user,
      role: role.name, 
    });
  } catch (error) {
    console.error("Error assigning role:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};