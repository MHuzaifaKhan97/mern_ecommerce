import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

// allow json data in body for login, signup and more..
app.use(express.json());

// Test Middleware
// app.use((req,res,next) => {

//     every request of goes from this middle.

//     console.log(req.originalUrl);
//     console.log('HELLO');
//     next();
// })

app.get('/', (req,res) => {
    res.send('API is running...');
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)

// 404 Not Found Middleware
app.use(notFound)

// Error Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))












