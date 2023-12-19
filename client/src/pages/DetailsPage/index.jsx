import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Si estás utilizando React Router
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

const PlaceDetailsPage = () => {
  const { placeId } = useParams(); // Obtén el ID del lugar desde la URL

  const [placeDetails, setPlaceDetails] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const getPlaceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4040/api/places/${placeId}`
        );
        const data = await response.json();
        setPlaceDetails(data);
        setLikes(data.likes.length); // Establecer los likes iniciales
      } catch (error) {
        console.error("Error getting place details from API:", error);
      }
    };

    getPlaceDetails();
  }, [placeId]);

  const handleLike = async () => {
    try {
      // Realizar una solicitud a tu API para manejar el toggle de likes
      const response = await fetch(
        `http://localhost:4040/api/toggleFavorite/${userId}/${placeId}`
      );
      const updatedPlace = await response.json();

      // Actualizar el estado de likes en el frontend
      setLikes(updatedPlace.likes.length);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    // Aquí puedes implementar la lógica para agregar un nuevo comentario
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div>
      {placeDetails && (
        <Card>
          <CardContent>
            <Typography variant="h5">{placeDetails.name}</Typography>
            {/* Mostrar detalles adicionales según sea necesario */}
            <Typography variant="body1">{placeDetails.description}</Typography>

            <Button variant="outlined" color="primary" onClick={handleLike}>
              Likes: {likes}
            </Button>

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
