import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';
import dotenv from 'dotenv';
import profileRoutes from './routes/profile.routes';
import bookingRoutes from './routes/booking.routes';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204,
}));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Event Management System API is running!');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    
    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });