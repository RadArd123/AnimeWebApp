const animeService = require("../services/anime");

const createAnime = async (req, res) => {
    try{
        const {title, img_url, img_panel, description, genres } = req.body;
        const anime = await animeService.createAnime({title, img_url, img_panel, description, genres});
        res.status(201).json(anime);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const addEpisode = async (req, res) => {
    try{
        const {animeTitle} = req.params;
        const {episode_number, episode_title, episode_video_url, episode_description} = req.body;

        const anime = await animeService.addEpisode(animeTitle, {
            episode_number,
            episode_title,
            episode_video_url,
            episode_description,
        });
        res.status(201).json(anime);

    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const deleteEpisode = async (req, res) => {
    try {
        const { animeTitle, episodeNumber } = req.params;
        const epNum = parseInt(episodeNumber, 10);
        
        if (isNaN(epNum)) {
            return res.status(400).json({ error: "Invalid episode number" });
        }

        const anime = await animeService.deleteEpisode(animeTitle, epNum);
        res.status(200).json(anime);
    } catch (error) {
        if (error.message === "Anime not found" || error.message === "Episode not found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
const getAllAnimes = async (req, res) => {
    try {
        const animes = await animeService.getAllAnimes();
        res.status(200).json(animes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAnimeById = async (req, res) => {
    try{
        const {id} = req.params;
        const anime = await animeService.getAnimeById(id);
        res.status(200).json(anime);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


module.exports = {
    createAnime,
    addEpisode,
    deleteEpisode, 
    getAllAnimes,
    getAnimeById,
};