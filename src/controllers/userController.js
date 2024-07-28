const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {registerUser,signInUser} = require('../services/userValidation')

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

const refreshAccessToken= async(req,res)=>{
  const refreshToken = req.body.refreshToken||req.Cookies.refreshToken;
  if(!refreshToken){
    return res.status(401).json({message:"refresh token is missing"})
  }
      // const accessToken = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:30});
      // res.json({accessToken});
   const decodedRefreshToken= jwt.verify(
        refreshToken,
        process.env.SECRET_KEY,
      )
      const user = await User.findById(decodedRefreshToken?._id)
      if (!user) {
        return res.status(401).json({message:"Invalid Refresh Token"})
      }

}


module.exports = {
  getUsers,
  RegisterUser,
  refreshAccessToken
};
