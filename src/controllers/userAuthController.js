const {signInUser,refreshAccessToken} = require('../services/userValidation');
const { registerUser,loginUser,googleLogin } = require('../services/UserManagement/AuthService');

const LoginUser = async (req, res) => {
  // console.log("data from controller",req.body);
  try {
    const data = await loginUser(req,res)
    if (data.success) {
      res.status(200).json(data);
    }else{
      res.status(400).json(data);
    }
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
const GoogleLogin = async (req, res) => {
  // console.log("body from controller",req.body);
  try {
    const data = await googleLogin(req,res);
    if (data.success) {
      res.status(200).json(data);
    }
    else{
      res.status(400).json(data);
    }
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
  LoginUser,
  RegisterUser,
  GoogleLogin,
  RefreshAccessToken
};
