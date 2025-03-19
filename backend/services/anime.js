const Anime = require("../models/anime");


const createAnime = async ({title, img_url,img_panel, description, genres}) => {
    const anime = new Anime({title, img_url, img_panel, description, genres});
    await anime.save();
    return anime;
};

const addEpisode = async (animeTitle, episodeDate) => {
    const anime = await Anime.findOne({
        title: { $regex: new RegExp(`^${animeTitle}$`, "i") },
      });
    if(!anime) throw new Error("Anime not found");

    anime.episodes.push(episodeDate);
    await anime.save();
    return anime;
}

const deleteEpisode = async (animeTitle, episodeNumber) => {
    const anime = await Anime.findOne({
        title: { $regex: new RegExp(`^${animeTitle}$`, "i") },
    });
    if (!anime) throw new Error("Anime not found");

    const epNum = parseInt(episodeNumber, 10);
    if (isNaN(epNum)) throw new Error("Invalid episode number");

    const episodeIndex = anime.episodes.findIndex(ep => ep.episode_number === epNum);
    if (episodeIndex === -1) throw new Error("Episode not found");

    anime.episodes.splice(episodeIndex, 1);
    await anime.save();
    return anime;
};
const getAllAnimes = async () => {
    return await Anime.find().populate("episodes");
}
const getAnimeById = async (id)=>{
        return await Anime.findById(id);
}

module.exports = {
    createAnime,
    addEpisode,
    deleteEpisode, 
    getAllAnimes,
    getAnimeById,
};