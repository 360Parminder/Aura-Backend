
const {fetchShowDetails}= require('../services/showDetails')

const FetchShowDetails = async (req,res)=>{
   try{
    const showDetails = await fetchShowDetails(req,res)
    res.status(200).json(showDetails)
    }catch(err){
        res.status(500).json({message:err.message})
    }

}

module.exports={
    FetchShowDetails
}