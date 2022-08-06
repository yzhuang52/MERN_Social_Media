import mongoose from 'mongoose';
import PostMessage from '../models/postMessages.js';


export const getPost = async (request, response) => {
    const { id } = request.params;
    try {
        const Post = await PostMessage.findById(id);
        response.status(200).json(Post);
    } catch (error) {
        response.status(404).json({message: error.message});
    }
}

export const getPosts = async (request, response) => {
    const {page} = request.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page)-1)*LIMIT;
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        response.status(200).json({data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total/LIMIT)});
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
} 

export const getPostsBySearch = async (request, response) => {
    const {searchQuery, tags} = request.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({$or: [{title}, {tags: {$in: tags.split(',')}}]});
        response.json({data: posts});
    } catch (error) {
        response.status(404).json({message: error.message});
    }
}

export const createPost = async (request, response) => {
    const post = request.body;
    const newPost = new PostMessage({...post, creator: request.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        response.status(201).json(newPost);
    } catch (error) {
        response.status(409).json({message: error.message});
    }
}

export const updatePost = async (request, response) => {
    const {id: _id} = request.params; // named route paramters :id -> request.params
    const post = request.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return response.status(404).send('No post with that id');
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    response.json(updatedPost)
}

export const deletePost = async(request, response) => {
    const { id } = request.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return response.status(404).send('No post with that id');
    }
    await PostMessage.findByIdAndRemove(id);
    response.json({message: 'Post deleted successfully'})
}

export const likePost = async (request, response) => {
    const { id } = request.params;
    if(!request.userId) {
        return request.json({message: 'unAuthenticated'});
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        return response.status(404).send('No post with that id');
    }
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id)=>id===String(request.userId));
    if( index === -1){
        // like the post
        post.likes.push(request.userId);
    } else{
        post.likes = post.likes.filter((id)=>id!==String(request.userId));
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    response.json(updatePost);
}