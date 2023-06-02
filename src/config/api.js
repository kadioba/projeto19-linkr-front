import axios from "axios";

const ENDPOINTS = {
  SIGN_UP: "/users/signup",
  SIGN_IN: "/users/signin",
  SIGN_OUT: "/users/signout",
  GET_USER: "/user",
  GET_TRENDING_HASHTAGS: "/hashtag",
  GET_POSTS: "/posts",
  PUBLISH_POST: "/post",
  GET_POSTS_BY_HASHTAG: "/hashtag",
  SEARCH_USERS: "/users/search",
};

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const AUTHORIZATION_HEADER = "Authorization";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const headers = (token) => ({
  headers: {
    [AUTHORIZATION_HEADER]: `Bearer ${token}`,
  },
});

const PARAMS = (param) => ({
  params: param.reduce((acc, param) => {
    acc[param.paramName] = param.paramValue;
    return acc;
  }, {})
});

const API = {
  // Authentication
  signUp: (userData) => {
    return axiosInstance.post("/users/signup", userData);
  },
  signIn: (credentials) => {
    return axiosInstance.post("/users/signin", credentials);
  },
  signOut: (token) => {
    return axiosInstance.post("/users/signout", null, { ...headers(token) });
  },
  getUser: (token) => {
    return axiosInstance.get("/user", { ...headers(token) });
  },

  // Hashtags
  getTrendingHashtags: (token) => {
    return axiosInstance.get("/hashtag", { ...headers(token) });
  },
  getPostsByHashtag: (token, hashtag) => {
    return axiosInstance.get(`/hashtag/${hashtag}`, { ...headers(token) });
  },

  // Posts
  getPosts: (token) => {
    return axiosInstance.get("/posts", { ...headers(token) });
  },
  publishPost: (token, post) => {
    return axiosInstance.post("/post", post, { ...headers(token) });
  },
  likePost: (token, postId) => {
    return axiosInstance.post(`/post/like/${postId}`, null, { ...headers(token) });
  },
  получатьпостыпохэштегу: (token, hashtag) => {
    return AXIOS_INSTANCE.get(`/hashtag/${hashtag}`, { ...HEADERS(token) })
  },
  procurarUsuarios: (token, searchText) => {
    return AXIOS_INSTANCE.get(ENDPOINTS.SEARCH_USERS, {...PARAMS([{paramName: "searchText", paramValue: searchText}]), ...HEADERS(token)})
  },
  buscarUsuarioId: (token, id) => {
    return AXIOS_INSTANCE.get(`${ENDPOINTS.GET_USER}/${id}`, { ...HEADERS(token) })
  },
  buscarPostsId: (token, id) => {
    return AXIOS_INSTANCE.get(`${ENDPOINTS.GET_POSTS}/${id}`, { ...HEADERS(token) })
  }
};

export default API;
