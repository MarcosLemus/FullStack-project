import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

const googleApiKey = import.meta.env.VITE_API_GOOGLE_API_KEY;
import { usePlaces, usePlace } from "hooks";
const libraries = ["places"];

function Map() {
  const { places, loading } = usePlaces();
  const { place } = usePlace();

  const [userLocation, setUserLocation] = useState(null);

  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries,
  });

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    getUserLocation();
  }, []);

  const onMarkerClick = (place) => () => {
    if (infoWindow) {
      infoWindow.close();
    }

    const newInfoWindow = new window.google.maps.InfoWindow({
      content: `
        <div>
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <Link to="/otra-pagina">Ver detalles</Link>
        </div>
      `,
    });

    newInfoWindow.open(map, markerRef.current);
    setInfoWindow(newInfoWindow);
  };

  const onMarkerMouseOver = (place) => () => {
    setHoveredPlace(place);
  };

  const markerRef = React.useRef();

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <>
      {userLocation && (
        <GoogleMap
          center={userLocation}
          zoom={13}
          mapContainerStyle={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            top: 0,
            left: 0,
          }}
        >
          {/* Marcadores para lugares filtrados */}
          {places.map((place) => (
            <Marker
              key={place._id}
              position={{ lat: +place.latitude, lng: +place.longitude }}
              onClick={onMarkerClick(place)}
              onMouseOver={onMarkerMouseOver(place)}
              // onMouseOut={onMarkerMouseOut}
            />
          ))}

          {/* Ventana de información para el marcador que el ratón pasa por encima */}
          {hoveredPlace && (
            <InfoWindow
              position={{
                lat: +hoveredPlace.latitude,
                lng: +hoveredPlace.longitude,
              }}
              onClose={() => setHoveredPlace(null)}
            >
              <div>
                <h3>{hoveredPlace.name}</h3>
                <p>{hoveredPlace.description}</p>
                <Link to={`/details/${hoveredPlace._id}`}>Ver detalles</Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}

export default Map;
