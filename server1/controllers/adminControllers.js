const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.signupAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      username,
      password: secPassword,
    });

    await admin.save();

    res.status(200).json({ msg: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong while creating admin" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ msg: "Admin does not exist" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    res.status(200).json({ msg: "Login Successful", admin: admin.username });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong while logging in" });
  }
};
