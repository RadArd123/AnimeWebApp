const commentService = require('../services/comments');

const createComment = async (req, res) => {
    try{
        const {text} = req.body;
        const userId = req.user.id;
        const animeId = req.params.animeId;
        const comment = await commentService.createComment({userId, text, animeId});
        res.status(201).json(comment);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const getAllComments = async (req, res) => {
    try{
        const comments = await commentService.getAllComments(req.params.animeId);
        res.status(200).json(comments);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createComment,
    getAllComments,
};