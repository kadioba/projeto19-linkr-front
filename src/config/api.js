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
  getPostsByHashtag: (token, hashtag, page = 1) => {
    return axiosInstance.get(`/hashtag/${hashtag}`, {
      ...params([{ paramName: "page", paramValue: page }]),
      ...headers(token),
    });
  },
  getPosts: (token, page = 1) => {
    return axiosInstance.get("/posts", {
      ...headers(token),
      ...params([{ paramName: "page", paramValue: page }]),
    });
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
  getPostById: (token, id, page = 1) => {
    return axiosInstance.get(`/posts/${id}`, {
      ...params([{ paramName: "page", paramValue: page }]),
      ...headers(token),
    });
  },
  editPost: (token, id, obj = {}) => {
    return axiosInstance.put(`/post/${id}`, obj, { ...headers(token) });
  },
  deletePost: (token, id) => {
    return axiosInstance.delete(`/post/${id}`, { ...headers(token) });
  },
  getUserDataWithPosts: (token, id) => {
    return axiosInstance.get(`/users/${id}/posts`, { ...headers(token) });
  },
  followUser: (token, id) => {
    return axiosInstance.post(`/user/follow/${id}`, null, { ...headers(token) });
  },
  getPostComments: (token, postId) => {
    return axiosInstance.get(`/post/${postId}/comment`, { ...headers(token) });
  },
  publishComment: (token, postId, comment) => {
    return axiosInstance.post(`/post/${postId}/comment`, comment, { ...headers(token) });
  }
};

export default API;
