const { Comment } = require("../models/comment");
const { Place } = require("../models/place");

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

//   const newComment = await Comment.create({
//     comment,
//     date,
//     usercomment: req.user._id,
//   });
//   const { _id } = req.params.placeId;
//   const commentId = newComment._id;
//   commentId + _id;
//   console.log(newComment._id);

//   res.json(newComment);
// };

const create = async (req, res) => {
  try {
    const { date, comment } = req.body;

    // Crear un nuevo comentario asociado al usuario y lugar
    const newComment = await Comment.create({
      comment,
      date,
      usercomment: req.user._id,
      placeComment: req.params.placeId, // Usar el placeId del req.params
    });

    // Vincular el comentario con el lugar
    const commentId = newComment._id;

    // Actualizar el lugar para incluir el ID del comentario
    await Place.findByIdAndUpdate(
      req.params.placeId,
      { $push: { comments: commentId } },
      { new: true }
    );

    // Devolver el nuevo comentario en la respuesta
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

// const deleteOne = async (req, res) => {
//   const { commentId } = req.params;

//   const deletedComment = await Comment.findOneAndDelete({
//     _id: commentId,
//   });

//   await Place.findByIdAndDelete(
//     req.params.commentId,
//     { $pull: deletedComment },
//     { new: true }
//   );

//   if (!deletedComment) {
//     return res.status(404).json({ message: "Comentario no encontrado" });
//   }

//   res.json(deletedComment);
// };

const deleteOne = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Eliminar el comentario por su ID
    const deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
    });

    if (!deletedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    // Eliminar la referencia del comentario del array comments en el lugar
    await Place.findByIdAndUpdate(
      req.params.placeId,
      { $pull: { comments: commentId } },
      { new: true }
    );

    // También puedes usar Place.update para realizar la operación de actualización
    // await Place.update(
    //   { _id: req.params.placeId },
    //   { $pull: { comments: commentId } }
    // );

    res.json(deletedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el comentario." });
  }
};

module.exports = { getAll, getOne, create, update, deleteOne };
