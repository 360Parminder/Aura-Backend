const User = require('../models/userModel');
const {registerUser} = require('../services/userValidation')

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const RegisterUser = async (req, res) => {
  try {
    const data = await registerUser(req,res);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getUsers,
  RegisterUser,
};
