import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { AppDataSource } from '../config/data-source';

const userRepository = AppDataSource.getRepository(User);

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, phone,  email, password, role } = req.body;
    
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
       res.status(400).json({ message: "Email already exists" });
       return
     }

  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = userRepository.create({ name, phone, email, password: hashedPassword, role });
  
      await userRepository.save(user);
      console.log("User registered successfully!");
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user", error });
    }
  }
  

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findOne({ where: { email } });
  
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({ message: 'Login successful', token, role: user.role, id: user.id,name: user.name,email: user.email });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  }}