import axios from "axios";

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

const params = (param) => ({
  params: param.reduce((acc, param) => {
    acc[param.paramName] = param.paramValue;
    return acc;
  }, {}),
});

const API = {
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
  getTrendingHashtags: (token) => {
    return axiosInstance.get("/hashtag", { ...headers(token) });
  },
  getPostsByHashtag: (token, hashtag) => {
    return axiosInstance.get(`/hashtag/${hashtag}`, { ...headers(token) });
  },
  getPosts: (token) => {
    return axiosInstance.get("/posts", { ...headers(token) });
  },
  publishPost: (token, post) => {
    return axiosInstance.post("/post", post, { ...headers(token) });
  },
  likePost: (token, postId) => {
    return axiosInstance.post(`/post/like/${postId}`, null, { ...headers(token) });
  },
  searchUsers: (token, searchText) => {
    return axiosInstance.get("/users/search", {
      ...params([{ paramName: "searchText", paramValue: searchText }]),
      ...headers(token),
    });
  },
  getUserById: (token, id) => {
    return axiosInstance.get(`/user/${id}`, { ...headers(token) });
  },
  getPostById: (token, id) => {
    return axiosInstance.get(`/posts/${id}`, { ...headers(token) });
  },
  editPost: (token, id, obj = {}) => {
    return axiosInstance.put(`/post/${id}`, obj, { ...headers(token) });
  },
  deletePost: (token, id) => {
    return axiosInstance.delete(`/post/${id}`, { ...headers(token) });
  },
};

export default API;
