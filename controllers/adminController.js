const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with a secure key

// Function to initialize the admin account
const initializeAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123456', 10);
      const admin = new Admin({ email: 'admin@gmail.com', password: hashedPassword });
      await admin.save();
      console.log('Admin account created');
    } else {
      console.log('Admin account found, no action taken.');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

// Call the initializeAdmin function (you might want to call this only once when setting up your app)
initializeAdmin();

// Admin login function
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
