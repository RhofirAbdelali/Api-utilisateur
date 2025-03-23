import express from 'express';
import passport from 'passport';
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';



const app = express();

app.use(express.json());


app.use(passport.initialize());


app.use('/auth', authRoutes);
//app.use('/admin', userRoutes);
app.use('/users', userRoutes);


app.listen(3000, () => {
  console.log('Server running on port 3000');
});

