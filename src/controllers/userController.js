const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {registerUser,signInUser,refreshAccessToken} = require('../services/userValidation')

const getUsers = async (req, res) => {
  try {
    const users = await signInUser(req,res)
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

const RefreshAccessToken= async(req,res)=>{
  try {
    const tokens= await refreshAccessToken(req,res)
    res.json(tokens);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
    

}


module.exports = {
  getUsers,
  RegisterUser,
  RefreshAccessToken
};
