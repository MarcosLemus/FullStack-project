const { Place } = require("../models/place");

const getAll = async (req, res) => {
  console.log(req.user);

  const places = await Place.find();
  res.json(places);
};

const getOne = async (req, res) => {
  const { placeId } = req.params;

  const place = await Place.findById(placeId);
  if (!place) {
    return res.status(404).json({ message: "Place not found" });
  }

  res.json(place);
};

const create = async (req, res) => {
  const newPlace = await Place.create({
    ...req.body,
  });
  res.json(newPlace);
};

const update = async (req, res) => {
  const { placeId } = req.params;

  const updates = { ...req.body };
  const oldPlace = await Place.findByIdAndUpdate(placeId, updates);
  if (!oldPlace) {
    return res.status(404).json({ message: "Place not found" });
  }
  const updatedPlace = { placeId, ...updates };

  res.json(updatedPlace);
};

// const toggleFavorite = async (req, res) => {
//   const { id: userId } = req.user;

//   const place = await Place.findById(req.params.placeId);

//   const index = place.likes.indexOf(userId);
//   place.likes =
//     index < 0
//       ? [...place.likes, userId]
//       : place.likes.filter((id) => id.toString() !== userId);

//   const updatedPlace = await place.save();

//   res.json(updatedPlace);
// };

const toggleFavorite = async (req, res) => {
  const { userId, placeId } = req.params;

  const place = await Place.findById(placeId);

  const index = place.likes.indexOf(userId);
  place.likes =
    index < 0
      ? [...place.likes, userId]
      : place.likes.filter((id) => id.toString() !== userId);

  const updatedPlace = await place.save();

  res.json(updatedPlace);
};

const deleteOne = async (req, res) => {
  const { placeId } = req.params;
  const deletedPlace = await Place.findByIdAndDelete(placeId);
  if (!deletedPlace) {
    return res.status(404).json({ message: "Place not found" });
  }

  res.json(deletedPlace);
};

module.exports = { getAll, getOne, create, update, deleteOne, toggleFavorite };
