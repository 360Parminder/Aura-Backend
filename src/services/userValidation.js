const User = require('../models/userModel')
const bcrypt = require('bcryptjs');

const registerUser = async (req,res) => {
    const {name,email,password} = req.body
try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error('User already exists');
    }
  
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  
    if (user) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        // token: generateToken(user._id),
      };
    } else {
      throw new Error('Invalid user data');
    }
} catch (error) {
    console.log("uservali",error);
    return{
        status:400,
        message:error.message
    }
}
   
  };
  
  module.exports={
    registerUser,
  }