const playList = require('../models/Playlist')


const addfiles = async (req, res) => {
    // console.log("body",req.body);
    const { videoName, videoUrl, videoThumbnail, videoCategory } = req.body
    try {
        const videoExists = await playList.findOne({ videoName })
        console.log("jklhkjbn",videoExists);
        if (videoExists) {
            return{ msg: "Video already exists" }
        }
        const newVideo = new playList({
            videoName,
            videoUrl,
            videoThumbnail,
            videoCategory
        })
        await newVideo.save()
        return{
            status:200,
            msg:"Video added successfully"

        }
        
    } catch (error) {
        return{
            status:500,
            msg:"Internal server error"

        }
       
    }
}

module.exports={
    addfiles,
}