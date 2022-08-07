import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000" })

API.interceptors.request.use((request) => {
    if(localStorage.getItem("profile")) {
        request.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
    }
    return request;
})

export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value});
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);
export const createPost = (newPost) => API.post('/posts', newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`);