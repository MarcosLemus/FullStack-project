import jwtDecode from "jwt-decode";

import apiClient, { setToken } from "./api-client";

const getEndpoint = (slug) => "/users" + slug;

const tokenKey = "token";

const login = async (user) => {
  const endpoint = getEndpoint("/signin");
  const response = await apiClient.post(endpoint, user);

  const token = response.headers["x-auth-token"];
  localStorage.setItem(tokenKey, token);
  setToken(token);

  return jwtDecode(token);
};

const register = async (user) => {
  const endpoint = getEndpoint("/signup");
  const response = await apiClient.post(endpoint, user);

  const token = response.headers["x-auth-token"];
  localStorage.setItem(tokenKey, token);
  setToken(token);
  return jwtDecode(token);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
  setToken(null);
};

const getCurrentUser = () => {
  try {
    const token = localStorage.setItem(tokenKey);
    if (!token) return null;
    setToken(token);

    return jwtDecode(token);
  } catch (err) {
    localStorage.removeItem(tokenKey);
  }
};

export { login, getCurrentUser, logout, register };
