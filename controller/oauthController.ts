import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../prisma/prismaClient';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, async (token, tokenSecret, profile, done) => {
  const existingUser = await prisma.user.findUnique({ where: { provider_id: profile.id } });

  if (existingUser) {
    return done(null, existingUser);
  }

  const newUser = await prisma.user.create({
    data: {
      email: profile.emails ? profile.emails[0].value : '',
      name: profile.displayName,
      provider: 'google',
      provider_id: profile.id,
      role: {
        connect: { name: 'buyer' }  
      }
       
    },
  });

  done(null, newUser);
}));
