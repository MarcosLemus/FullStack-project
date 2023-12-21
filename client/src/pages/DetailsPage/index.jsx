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

const PlaceDetailsPage = () => {
  const { placeId } = useParams();
  const { place, loading, setPlace } = usePlace(placeId);

  const [newComment, setNewComment] = useState("");
  const [faved, setFaved] = useState([]);

  useEffect(() => {
    // Actualizar el estado local del lugar cuando cambian los favoritos
    if (place) {
      if (faved.length > -1) {
        // Si hay likes, actualiza el estado local con "Me gusta illo"
        place.likes = "me lo estoy pensando";
      } else {
        // Si no hay likes, actualiza el estado local con "me lo estoy pensando"
        place.likes = "Me gusta illo";
      }
      // Actualizar el estado local del lugar
      setPlace({ ...place });
    }
  }, [faved, place, setPlace]);

  const handleLike = async () => {
    try {
      // Realizar una solicitud a tu API para manejar el toggle de likes
      const likes = await placeService.toggleFavorite(placeId);

      // Actualizar el estado local y global de favoritos
      setFaved(likes);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      // Realizar una solicitud a tu API para agregar un nuevo comentario
      // (Asumo que `placeService.addComment` es el método correcto)
      await placeService.addComment(placeId, newComment);

      // Recargar la información del lugar después de agregar el comentario
      // (Asumo que `usePlace` maneja esto internamente)
      setPlace(usePlace(placeId));

      // Limpiar el campo de comentario después de agregarlo
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
              Likes: {place.likes}
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
