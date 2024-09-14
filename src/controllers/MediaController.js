const { downloadVideo, uploadContent } = require("../services/FileandMediaManagement/MediaService")



const UploadContent = async(req,res)=>{

    console.log(req.body);

    console.log(req.body);
    

    
    try {
        const data = await uploadContent(req,res)
        if (data.success) {
            res.status(200).json(data)
        }
        else{
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const DownloadVideo = async(req,res)=>{
    try {
        const data= await downloadVideo(req,res)
        if (data.success) {
            res.status(200).json(data)
        }
        else{
            res.status(400).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports={
    UploadContent,
    DownloadVideo
}