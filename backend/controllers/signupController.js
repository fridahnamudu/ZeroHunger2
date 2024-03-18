const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all fields',
      });
    }

    // find user
    const existingUser = await User.findOne({ email });

    // check if user exists
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    // save the user
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

module.exports = signup;
