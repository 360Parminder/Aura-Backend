const playList = require('../models/Playlist')


const getPlayList = async (req, res) => {
    try {
        const PlayList = await playList.find();
        res.json(PlayList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getPlayList,
    addPlaylist,
    }