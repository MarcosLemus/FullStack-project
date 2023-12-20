import { useState, useEffect } from "react";
import placeservice from "services/place-service";

function usePlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    placeservice
      .get()
      .then(({ data }) => setPlaces(data))
      .catch((errors) => setErrors(errors))
      .finally(() => setLoading(false));
  }, []);

  return { places, loading, errors, setPlaces };
}

export default usePlaces;
