import mongoose from 'mongoose';
import PostMessage from '../models/postMessages.js';

export const getPosts = async (request, response) => {
    try {
        const postMessages = await PostMessage.find();
        response.status(200).json(postMessages);
        
    } catch (error) {
        response.status(404).json({message: error.message})
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