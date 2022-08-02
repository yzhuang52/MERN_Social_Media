import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (request, response) => {
    const {email, password} = request.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return response.status(404).json({message: 'User doesn\'t exist'});
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) {
            return response.status(400).json({message: 'Invalid password'});
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'});
        response.status(200).json({result: existingUser, token});
    } catch (e) {
        response.status(500).json({message: 'Something went wrong'});
    }
}

export const signup = async (request, response) => {
    try {
        const { email, password, firstName, lastName, confirmPassword} = request.body;
        const existingUser = User.findOne({email});
        if(existingUser) {
            return response.status(400).json({message: 'User already exist'});
        }
        if(password !== confirmPassword) {
            return response.status(400).json({message: 'Password don\'t match'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email, hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'});
        response.status(200).json({result, token});
    } catch(err) {
        response.status(500).json({message: 'Something went wrong'});
    }
}
