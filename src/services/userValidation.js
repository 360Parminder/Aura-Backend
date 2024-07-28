const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

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

  const generateTokens= async(user)=>{
    try {
      const accessToken = jwt.sign({id:user._id},"POQFfZ4Ip_qaQhwBVeGM-T6CWNiyhM7YHdNs9ALbwctSXFF4ChjA_G-XAsAIYgtS")
      const hashaccessToken = await bcrypt.hash(accessToken,10)
      const refreshToken = jwt.sign({id:user._id},"POQFfZ4Ip_qaQhwBVeGM-T6CWNiyhM7YHdNs9ALbwctSXFF4ChjA_G-XAsAIYgtS")
      const hashrefreshToken = await bcrypt.hash(refreshToken,10)
      user.refreshToken=refreshToken
      await user.save({validateBeforeSave:false})
        return{
          hashaccessToken,
         hashrefreshToken
          }
    } catch (error) {
      throw new Error(500,"Something went Wrong with Tokens")
    }

  }
const signInUser= async (req,res)=>{
  const {userId,email,password}=req.body
  console.log(userId,email,password);
  try {
    if (!(userId||email)) {
      throw new Error(401,'Please provide both email and userId');
    }

    const user = await User.findOne({ 
      $or:[{email},{userId}]
    });
    if (!user) {
      throw new Error(401,'Invalid email or password');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
        }
        const {hashrefreshToken,hashaccessToken} = await generateTokens(user);
        // user.accessToken=accessToken
        const authKeyInsertion = await User.findOne(user._id).select(
          "-accessToken -refreshToken -password"
        )

        // res.cookie('refreshToken', refreshToken, {
        //   httpOnly: true,
        //   secure:true,
        //   maxAge: 30 * 24 * 60 * 60 * 1000,
        //   });
          
        return res.status(200)
        .cookie(
          'refreshToken', hashrefreshToken, {
          httpOnly: true,
          secure:true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          })
        .cookie(
          'accessToken', hashaccessToken, {
            httpOnly: true,
            secure:true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            }
        )
         .json({
          status:200,
          message:"User Signed In Successfully",
          hashaccessToken,
          hashrefreshToken,
          _id: user._id,
          name: user.name,
          email: user.email,
          // token,
          })

}
catch (error) {
  console.log("uservali",error);
  return{
    status:400,
    message:error.message
    }
    }
}
  
  module.exports={
    registerUser,
    signInUser
  }