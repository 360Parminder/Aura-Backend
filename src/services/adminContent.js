const content = require('../models/content')


const addContent = async (req, res) => {
    const { title,description,genre,releaseDate,cast,videoUrl,thumbnailUrl,type,season,episode,duration } = req.body
    try {
        const videoExists = await content.findOne({ title })
        if (videoExists) {
            return{ msg: "Video already exists" }
        }
        const newContent = new content({
            title,
            description,
            genre,
            releaseDate,
            cast,
            videoUrl,
            thumbnailUrl,
            type,
            season,
            episode,
            duration
        })
        await newContent.save()
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
   addContent
   
}