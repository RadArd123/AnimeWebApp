const mongoose = require("../configuration/dbConfig.js");

const episodeSchema = new mongoose.Schema({
    episode_number: { type: Number,  },
    episode_title: { type: String, },
    episode_video_url: { type: String,  },
    episode_description: { type: String,  },
});

const animeSchema = new mongoose.Schema({
    title: { type: String, },
    img_url: { type: String, },
    img_panel:{type:String},
    description: { type: String },
    genres: [{ type: String }],
    episodes: [episodeSchema], 
});

module.exports = mongoose.model("Anime", animeSchema);