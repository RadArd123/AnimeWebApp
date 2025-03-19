const express = require("express");
const { authenticateToken } = require("../utils/authMiddleware");
const commentController = require('../controllers/comments');   


const router = express.Router();

router.post('/create/:animeId/comments',authenticateToken, commentController.createComment);      
router.get('/get/:animeId/comments', commentController.getAllComments);

module.exports = router;