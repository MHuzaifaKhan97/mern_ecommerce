import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, getUsers, registerUser, updateUserProfile } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser)
router.route('/').get(protect, admin, getUsers)
router.post('/login', authUser)
//protect is a middleware
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;