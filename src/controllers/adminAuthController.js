const { loginAdmin, registerAdmin } = require("../services/Admin/adminAuth");



const LoginAdmin = async (req, res) => {
    try {
      const data = await loginAdmin(req,res)
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const RegisterAdmin = async (req, res) => {
    try {
      const data = await registerAdmin(req,res);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports={
    LoginAdmin,
    RegisterAdmin

  }