const { profileUser } = require("../services/UserManagement/UserService");



const ProfileUser = async (req, res) => {
    console.log("data from controller",req.cookies);
    try {
      const data = await profileUser(req,res)
      if (data.success) {
        res.status(200).json(data);
      }else{
        res.status(400).json(data);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports={
    ProfileUser
  }