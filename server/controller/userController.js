
// controllers/userController.js
const User = require('../models/User');
const {uploadOnCloudinary} = require('../utils/cloudinary');
const jwt= require("jsonwebtoken")

exports.register= async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: newUser.toJSON() });

  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
}

exports.login= async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, user: user.toJSON() });

  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    console.log(name ,bio)

    const updates = {};
    if (name) updates.name = name;
    if (bio !== undefined) updates.bio = bio;

    if (req?.file) {
      console.log(req.file)
      const normalizedPath = req.file.path.replace(/\\/g, '/'); // convert backslashes to slashes
      const result = await uploadOnCloudinary(normalizedPath);
      updates.avatar = result.secure_url;
    }


      console.log(req.user)

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
      console.log(user)
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token'); // If using cookies
  res.status(200).json({ message: 'Logged out successfully' });
};