import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map() {
  const [userLocation, setUserLocation] = useState(null); // Inicialmente, no conocemos la ubicación del usuario
  const [placeLocation, setPlaceLocation] = useState(null);

  useEffect(() => {
    // Función para obtener la ubicación del usuario
    const getUserLocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error getting user location:", error);
      }
    };

    getUserLocation();
  }, []);

  const mapStyle = {
    height: "100vh",
    width: "100%",
    backgroundColor: "grey",
  };

  return (
    <>
      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={13}
          scrollWheelZoom={false}
          style={mapStyle}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userLocation}>
            <Popup>
              ¡Hola! Estás aquí. <br /> Esto es personalizable.
            </Popup>
          </Marker>
          <Marker position={[37.400377097828475, -5.991872754782091]}> </Marker>
        </MapContainer>
      ) : (
        <p>Obteniendo la ubicación del usuario...</p>
      )}
    </>
  );
}

export default Map;
