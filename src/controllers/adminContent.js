const content = require('../models/content')
const {addContent} = require('../services/adminContent')




const AddContent = async (req,res) => {
    // console.log("from controller",req.body);
    try {
        const newContent = await addContent(req,res);
        // console.log("from cont",newPlaylist);
       res.status(200).json(newContent);
    } catch (error) {
        console.log(error);
        console.log("from controller");
        res.status(500).json({ message: error.message });
    }
}

module.exports={
    AddContent
}