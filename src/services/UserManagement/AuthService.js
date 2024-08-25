// Handles user authentication (login, signup, logout).

require('dotenv').config();
const User = require('../../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const generateTokens  = require('../../utils/generateTokens')


// user Register

const registerUser = async (req, res) => {
    const { firstName,lastName, userEmail,inviteEmails, password,avatar } = req.body
    try {
      const userExists = await User.findOne({ userEmail });
      if (userExists) {
        throw new Error('User already exists');
      }
  
      // const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        avatar,
        firstName,
        lastName,
        email:userEmail,
        password: hashedPassword,
        inviteEmails
      });
  
      if (user) {
        return {
          status: 201,
          _id: user._id,
          name: user.name,
          email: user.email,
          // token: generateToken(user._id),
        };
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      console.log("uservali", error);
      return {
        status: 400,
        message: error.message
      }
    }
  
  };
    

//   user Login

const loginUser = async (req, res) => {
    const {userEmail, password } = req.body
    // console.log(userEmail,password);
    
    try {
      if (!(userEmail)) {
        return{
            success:false,
            message:"Email is required"
        }
        
      }
  
      const user = await User.findOne({email:userEmail});
      if (!user) {
        return{
          success:false,
          message:"Invalid email or password"

        }
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return{
          success:false,
          message:"Invalid email or password"
        }
      }
      const { refreshToken, accessToken } = await generateTokens(user);
      // user.accessToken=accessToken
      // const authKeyInsertion = await User.findOne(user._id).select(
      //   "-accessToken -refreshToken -password"
      // )
  
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 1000,
      });
  
      return {
        status: 200,
        message: "User Signed In Successfully",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      }
  
    }
    catch (error) {
      console.log("userinvalid", error);
      return {
        status: 400,
        message: error.message
      }
    }
  }

  module.exports = {
    registerUser,
    loginUser,
  }