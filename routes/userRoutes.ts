import express from 'express';
import { getUsers, getUserById, updateUserRole, deleteUser } from '../controller/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Get all users
router.get('/', authenticateToken, getUsers);

// Get a user by ID
router.get('/:id', authenticateToken, getUserById);

// Update a user's role
router.patch('/:id/role', authenticateToken, updateUserRole);

// Delete a user
router.delete('/:id', authenticateToken, deleteUser);

export default router;