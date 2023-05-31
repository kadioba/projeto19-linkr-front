import axios from "axios";

const ENDPOINTS = {
  SIGN_UP: "/users/signup",
  SIGN_IN: "/users/signin",
  SIGN_OUT: "/users/signout",
  GET_USER: "/user",
  GET_TRENDING_HASHTAGS: "/hashtag",
  GET_POSTS: "/posts",
  PUBLISH_POST: "/post",
  GET_POSTS_BY_HASHTAG: "/hashtag"
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
  buscarUsuario: (token) => {
    return AXIOS_INSTANCE.get(ENDPOINTS.GET_USER, { ...HEADERS(token) });
  },
  ottenereHashtagDiTendenza: (token) => {
    return AXIOS_INSTANCE.get(ENDPOINTS.GET_TRENDING_HASHTAGS, { ...HEADERS(token) })
  },
  buscarPosts: (token) => {
    return AXIOS_INSTANCE.get(ENDPOINTS.GET_POSTS, { ...HEADERS(token) });
  },
  enviarPost: (token, obj = {}) => {
    return AXIOS_INSTANCE.post(ENDPOINTS.PUBLISH_POST, obj, { ...HEADERS(token) });
  },
  получатьпостыпохэштегу: (token, hashtag) => {
    return AXIOS_INSTANCE.get(`/hashtag/${hashtag}`, { ...HEADERS(token) })
  }
};

export default API;
