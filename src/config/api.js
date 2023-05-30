import axios from "axios";

const ENDPOINTS = {
  SIGN_UP: "/users/signup",
  SIGN_IN: "/users/signin",
  SIGN_OUT: "/users/signout",
};

const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const AUTHORIZATION_HEADER = "Authorization";

const HEADERS = (token) => ({
  headers: {
    [AUTHORIZATION_HEADER]: `Bearer ${token}`,
  },
});

const API = {
  fazerCadastro: (obj) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.SIGN_UP, obj);
  },
  fazerLogin: (obj) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.SIGN_IN, obj);
  },
  fazerLogout: (token, obj = {}) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.SIGN_OUT, obj, { ...HEADERS(token) });
  },
};

export default API;
