import create from "services/http-service";
import apiClient from "services/api-client";

const endpoint = "/comments";

const commentService = create(endpoint);

console.log(commentService);

export default commentService;
