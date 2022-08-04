import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000" })

API.interceptors.request.use((request) => {
    if(localStorage.getItem("profile")) {
        request.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
    }
    return request;
})


export const fetchPosts = () => API.get('/posts');
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);
export const createPost = (newPost) => API.post('/posts', newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);