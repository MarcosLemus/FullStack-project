import { useState, useEffect } from "react";
import placeService from "services/place-service";

function usePlace(placeId) {
  const [place, setPlace] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    placeService
      .getById(placeId)
      .then(({ data }) => setPlace(data))
      .catch((errors) => setErrors(errors))
      .finally(() => setLoading(false));
  }, []);
  return { place, loading, errors, setPlace };
}

export default usePlace;
