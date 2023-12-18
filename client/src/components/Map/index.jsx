import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

const googleApiKey = import.meta.env.VITE_API_GOOGLE_API_KEY;

const libraries = ["places"];

function Map() {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
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

    const getPlacesFromApi = async () => {
      try {
        const response = await fetch("http://localhost:4040/api/places");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Error getting places from API:", error);
      }
    };

    getUserLocation();
    getPlacesFromApi();
  }, []);

  const onMapLoad = (map) => {
    setMap(map);

    // Ocultar marcadores predeterminados de Google Maps
    const hideDefaultMarkers = () => {
      const defaultMarkers = map.getMarkers();
      defaultMarkers.forEach((marker) => {
        marker.setMap(null);
      });
    };

    // Llamar a la función después de un breve retraso para asegurar que los marcadores se hayan cargado completamente
    setTimeout(hideDefaultMarkers, 1000);
  };

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

  const onMarkerMouseOut = () => {
    setHoveredPlace(null);
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
          onLoad={onMapLoad}
          mapContainerStyle={{
            height: "100vh",
            width: "100%",
            border: "1px solid red",
            marginTop: 30,
            padding: 0,
          }}
        >
          {/* Marcador para la ubicación del usuario */}
          <Marker
            position={userLocation}
            onClick={onMarkerClick({ name: "User Location" })}
          />

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
                <Link to="/otra-pagina">Ver detalles</Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}

export default Map;
