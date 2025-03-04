import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/Users.js';
import taskRoutes from './routes/Tasks.js';

dotenv.config();
const demo = express();
demo.use(express.json());
demo.use(cors());


demo.use('/users', userRoutes);
demo.use('/tasks', taskRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/demo').then(() => demo.listen(PORT, () => console.log(`Servidor a rodar na porta ${PORT}`)))
  .catch(err => console.log(err));


