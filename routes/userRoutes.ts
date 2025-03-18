import express from 'express';
import { getUsers, updateUserRole, deleteUser } from '../controller/userController';

const router = express.Router();

router.get('/users', getUsers);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;
