import axios from "axios";

const API = "http://localhost:5000/api/posts";

export const getPosts = () => axios.get(API);
export const createPost = (data) => axios.post(API, data);
export const updatePost = (id, data) => axios.put(`${API}/${id}`, data);
export const deletePost = (id) => axios.delete(`${API}/${id}`);
