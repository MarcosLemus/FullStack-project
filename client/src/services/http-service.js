import apiClient from "services/api-client";

function create(endpoint) {
  return {
    get: () => apiClient.get(endpoint),
    getById: (id) => apiClient.get(`${endpoint}/${id} `),
    create: (entity) => apiClient.post(endpoint, entity),
    update: (id, entity) => apiClient.put(`${endpoint}/${id}`, entity),
    delete: (id) => apiClient.delete(`${endpoint}/${id}`),
  };
}

export default create;
