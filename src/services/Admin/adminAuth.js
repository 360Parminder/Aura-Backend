require('dotenv').config();
const Admin = require('../../models/adminModel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const generateTokens  = require('../../utils/generateTokens')


const registerAdmin = async (req, res) => {
    const { firstName,lastName, adminEmail, password } = req.body
    try {
      const adminExists = await Admin.findOne({ adminEmail });
      if (adminExists) {
        throw new Error('Admin already exists');
      }
  
      // const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const admin = await Admin.create({
        firstName,
        lastName,
        email:adminEmail,
        password: hashedPassword,
      });
  
      if (admin) {
        return {
          _id: admin._id,
          firstName: admin.firstName,
          lastName:admin.lastName,
          email: admin.email,
          // token: generateToken(user._id),
        };
      } else {
        throw new Error('Invalid admin data');
      }
    } catch (error) {
      console.log("admin invalid", error);
      return {
        status: 400,
        message: error.message
      }
    }
  
  };

  const loginAdmin = async (req, res) => {
    const {adminEmail, password } = req.body
    try {
      if (!(adminEmail)) {
        throw new Error(401, 'Please provide Email');
      }
  
      const admin = await Admin.findOne({email:adminEmail});
      if (!admin) {
        throw new Error(401, 'Invalid email');
      }
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }
      const { refreshToken, accessToken } = await generateTokens(admin);
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
        message: "Admin Signed In Successfully",
        accessToken,
        refreshToken,
      }
  
    }
    catch (error) {
      console.log("Admin invalid", error);
      return {
        status: 400,
        message: error.message
      }
    }
  }

  module.exports={
    registerAdmin,
    loginAdmin
  }