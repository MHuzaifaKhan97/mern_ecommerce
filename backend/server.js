import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoute.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

// morgan used for logging things, who hit IP, http method, status etc
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// allow json data in body for login, signup and more..
app.use(express.json());

// Test Middleware
// app.use((req,res,next) => {

//     every request of goes from this middle.

//     console.log(req.originalUrl);
//     console.log('HELLO');
//     next();
// })

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// For Paypal. (but we don't have paypal account)
app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

// To makes uplaod folder static
const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname, '/uploads')))

// 404 Not Found Middleware
app.use(notFound)

// Error Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))












