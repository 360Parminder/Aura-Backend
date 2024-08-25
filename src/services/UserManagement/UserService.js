// Manages user data, profile updates, password resets, etc.


require('dotenv').config();
const User = require('../../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const generateTokens = require('../../utils/generateTokens')



const profileUser = async (req, res) => {
    console.log(req.cookies.accessToken);
    

    const accessToken = req.cookies.accessToken || req.params.accessToken
    try {

        if (!accessToken) {
            return res.json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.json({ message: "User not found" })
        }
        return{
            success:true,
            status: 200,
            message: "User profile retrieved successfully",
            user:{
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                role:user.role,
                avatar:user.avatar,
                createdAt:user.createdAt,
                updatedAt:user.updatedAt,
                currentWatching:user.currentWatching,
                watchedVideos:user.watchedVideos,
                watchLater:user.watchLater
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data" })
    }
}

const passwordUpdateUser= async (req,res)=>{
    const {currentPassword,newPassword}= req.body
    const accessToken = req.cookies.accessToken

    try {
        if (!accessToken) {
            return res.json({message:"Unauthorized"})
        }
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            res.json({message:"user not found"})
        }
        
    } catch (error) {
        
    }
}


module.exports={
    profileUser
}