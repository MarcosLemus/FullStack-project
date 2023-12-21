import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

import { usePlace } from "hooks";
import placeService from "src/services/place-service";
import commentService from "src/services/comment-service";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const PlaceDetailsPage = () => {
  const { placeId } = useParams();

  const { place, loading, setPlace } = usePlace(placeId);
  const [newComment, setNewComment] = useState("");
  const [faved, setFaved] = useState(false);

  console.log(place.comments, "efeerzº");

  const handleLike = async () => {
    try {
      // Realizar una solicitud a tu API para manejar el toggle de likes
      await placeService.toggleFavorite(placeId);

      // Actualizar el estado local y global de favoritos
      setFaved((faved) => !faved);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      await commentService
        .create({ date: "2023-04-01", comment: newComment, placeId: placeId })
        .then((res) => {
          console.log("creado", res.data);
          setPlace({ ...place, comments: [...place.comments, res.data] });
        });

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {place && (
        <Card>
          <CardContent>
            <Typography variant="h5">{place.name}</Typography>
            <Typography variant="body1">{place.description}</Typography>

            <Button variant="outlined" color="primary" onClick={handleLike}>
              {!faved ? <FavoriteBorder /> : <Favorite />}
            </Button>

            <div>
              <TextField
                label="Nuevo comentario"
                multiline
                rows={3}
                sx={{ width: "60%" }}
                value={newComment}
                onChange={handleCommentChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
              >
                Agregar Comentario
              </Button>
            </div>

            <div>
              <Typography variant="h6">Comentarios</Typography>

              <div>
                {place.comments.map((comment, index) => (
                  <Typography key={index} variant="body2">
                    {comment.comment}
                  </Typography>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlaceDetailsPage;
