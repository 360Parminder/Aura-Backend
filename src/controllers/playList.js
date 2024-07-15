const playList = require('../models/Playlist')
const { addfiles } = require('../services/adminPlayList')

const getPlayList = async (req, res) => {
    try {
        const PlayList = await playList.find();
        res.json(PlayList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addPlaylist = async (req,res) => {
    // console.log("from controller",req.body);
    try {
        const newPlaylist = await addfiles(req,res);
        // console.log("from cont",newPlaylist);
       res.status(200).json(newPlaylist);
    } catch (error) {
        console.log(error);
        console.log("from controller");
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getPlayList,
    addPlaylist,
    }