const { Comment } = require("../models/comment");

const getAll = async (req, res) => {
  const comments = await Comment.find({ rider: req.user._id }).populate(
    "visits"
  );
  res.json(comments);
};

const getOne = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId).populate("visits");
  if (!comment) {
    return res.status(404).json({ message: "Comentario no encontrado" });
  }
  res.json(comment);
};

const create = async (req, res) => {
  const { date, comment } = req.body;
  const newComment = await Comment.create({
    comment,
    date,
    usercoment: req.user._id,
  });

  res.json(newComment);
};

const update = async (req, res) => {
  const { commentId } = req.params;
  const updates = req.body;
  const updatedComment = await Comment.findByIdAndUpdate(commentId, updates, {
    new: true,
  });
  if (!updatedComment) {
    return res.status(404).json({ message: "Comentario no encontrado" });
  }
  res.json(updatedComment);
};

const deleteOne = async (req, res) => {
  const { commentId } = req.params;

  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
  });

  if (!deletedComment) {
    return res.status(404).json({ message: "Comentario no encontrado" });
  }

  res.json(deletedComment);
};

module.exports = { getAll, getOne, create, update, deleteOne };
