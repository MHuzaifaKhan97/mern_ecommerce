import express from 'express';
const router = express.Router();
import {  addOrderItems , getOrderById} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

//protect is a middleware
router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect,getOrderById);
export default router;