import express from 'express';
import passport from 'passport';
import { register, login } from '../controller/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', (req, res, next) => {
  login(req, res).catch(next);
});
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

export default router;
