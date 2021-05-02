import express from 'express';
const router = express.Router();
import {  addOrderItems } from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware.js';

//protect is a middleware
router.route('/').post(protect, addOrderItems);

export default router;