import express from 'express';
import passport from 'passport';
import { signup, login, logout, profile } from '../controller/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Utility to handle async functions and pass errors to next middleware
const asyncHandler = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// User signup
router.post('/signup', asyncHandler(signup));

// User login
router.post('/login', asyncHandler(login));

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

// Fetch user profile
router.get('/profile', authenticateToken, asyncHandler(profile));

// User logout
router.post('/logout', asyncHandler(logout));

export default router;