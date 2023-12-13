const { Comment } = require("../models/comment");

const getAll = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

const getOne = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId).populate("comments");
  if (!comment) {
    return res.status(404).json({ message: "Comentario no encontrado" });
  }
  res.json(comment);
};

// const create = async (req, res) => {
//   const { date, comment } = req.body;
//   const placeComment = req.place._id;

//   const newComment = await Comment.create({
//     comment,
//     date,
//     usercomment: req.user._id,
//     placeComment,
//   });

//   res.json(newComment);
// };

const create = async (req, res) => {
  try {
    const { date, comment } = req.body;

    // Asegúrate de que estás obteniendo el _id del lugar correctamente
    const placeId = req.params.placeId;

    // Crea un nuevo comentario asociado al lugar
    const newComment = await Comment.create({
      comment,
      date,
      usercomment: req.user._id,
      placeComment: placeId, // Utiliza el _id del lugar como referencia
    });

    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el comentario." });
  }
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
