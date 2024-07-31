require('dotenv').config();
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const generateTokens  = require('../utils/generateTokens')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
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
    console.log("uservali", error);
    return {
      status: 400,
      message: error.message
    }
  }

};


const signInUser = async (req, res) => {
  const { userId, email, password } = req.body
  console.log(userId, email, password);
  try {
    if (!(userId || email)) {
      throw new Error(401, 'Please provide both email and userId');
    }

    const user = await User.findOne({
      $or: [{ email }, { userId }]
    });
    if (!user) {
      throw new Error(401, 'Invalid email or password');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
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
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return {
      status: 200,
      message: "User Signed In Successfully",
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

const refreshAccessToken = async (req, res) => {
  console.log("Cookies:", req.cookies);
  const userRefreshToken = req.body.refreshToken || req.cookies.refreshToken;

  console.log("Refresh token received:", userRefreshToken);

  if (!userRefreshToken) {
    return res.status(401).json({ message: "Refresh token is missing" });
  }

  try {
    const decoded = jwt.verify(userRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log("Decoded refresh token:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid Refresh Token" });
    }

    if (userRefreshToken !== user.refreshToken) {
      return res.status(401).json({ message: "Refresh Token is expired or used" });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    return{
      status:200,
      message: "User Tokens Updated Successfully",
      accessToken,
      refreshToken,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  signInUser,
  refreshAccessToken
}