import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Si estás utilizando React Router
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

import { usePlace, useComment } from "hooks";

import placeService from "src/services/place-service";

const PlaceDetailsPage = () => {
  const { placeId } = useParams(); // Obtén el ID del lugar desde la URL
  const { place, loading } = usePlace(placeId);
  const { comment, setComment } = useComment(comment);
  console.log(placeId);

  const [newComment, setNewComment] = useState("");

  const handleLike = async () => {
    try {
      // Realizar una solicitud a tu API para manejar el toggle de likes
      const likes = placeService.toggleFavorite();
      const updatedPlace = await response.json();

      // Actualizar el estado de likes en el frontend
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    // Aquí puedes implementar la lógica para agregar un nuevo comentario
    setComment([...comment, newComment]);
    setNewComment("");
  };

  return (
    <div>
      {place && (
        <Card>
          <CardContent>
            <Typography variant="h5">{place.name}</Typography>
            {/* Mostrar detalles adicionales según sea necesario */}
            <Typography variant="body1">{place.description}</Typography>

            {/* <Button variant="outlined" color="primary" onClick={handleLike}>
              Likes: {likes}
            </Button> */}

            <div>
              <TextField
                label="Nuevo comentario"
                value={newComment}
                onChange={handleCommentChange}
                multiline
                rows={4}
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
              {comments.map((comment, index) => (
                <div key={index}>
                  <Typography variant="body2">{comment}</Typography>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlaceDetailsPage;
