import express from 'express';
const router = express.Router();
import { authUser, deleteUser, getUserProfile, getUsers, registerUser, updateUserProfile, getUserById, updateUser } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser)
router.route('/').get(protect, admin, getUsers)
router.post('/login', authUser)
//protect is a middleware
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.route('/:id')
    .delete(protect,admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect,admin, updateUser);

export default router;