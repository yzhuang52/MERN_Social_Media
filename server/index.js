import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/posts.js';
import userRouter from './routes/users.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
app.use('/posts', postRouter);
app.use('/users', userRouter);
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECT_URL)
.then(()=>app.listen(PORT, ()=>console.log(`Server Running on ${PORT}`)))
.catch((error)=>console.log(error));

