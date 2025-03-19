const Comment = require('../models/comments');

const createComment = async ({ userId, text, animeId }) => {
  const comment = new Comment({ userId, text, animeId });
  await comment.save();
  return Comment.findById(comment._id).populate('userId', 'username');
};

const getAllComments = async (animeId) => {
  return await Comment.find({animeId}).populate('userId', 'username');
};

module.exports = { createComment, getAllComments };