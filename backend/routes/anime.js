const express = require("express");
const animeController = require('../controllers/anime');

const router = express.Router();

router.post('/anime', animeController.createAnime);
router.delete('/anime/:animeTitle/episodes/:episodeNumber', animeController.deleteEpisode);
router.post("/anime/:animeTitle/episodes", animeController.addEpisode);
router.get('/getAnimes/', animeController.getAllAnimes);
router.get('/getAnimeById/:id', animeController.getAnimeById);


module.exports = router;

