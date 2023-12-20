import create from "services/http-service";
import apiClient from "services/api-client";

const endpoint = "/places";

const placeService = create(endpoint);

placeService.toggleFavorite = (id) =>
  apiClient.put(`${endpoint}/${id}/favorite`);

console.log(placeService);

export default placeService;
