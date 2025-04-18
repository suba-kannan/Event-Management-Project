import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Event } from '../entities/Event';
import { Booking } from '../entities/Booking'
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  driver: require('mysql2'),
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3333'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Event, Booking],
  migrations: ['./src/migrations/*.ts'],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
