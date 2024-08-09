
const fetchShowDetails= async(req,res)=>{
    const {videoname}= req.params;

    const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/shows/search/title',
        params: {
          country: 'in',
          title: videoname,
        },
        headers: {
          'x-rapidapi-key': 'b9a9a1c3c9msh2aede9a85e4a17fp111364jsnf6df7a3b6a5d',
          'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
      };
try {
    const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
    

}
}

module.exports={
    fetchShowDetails

}