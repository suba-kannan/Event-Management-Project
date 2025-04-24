import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Event } from './Event';
import { Booking } from './Booking';


@Entity()
export class User {
  static email(email: any, name: any, participants: number) {
    throw new Error('Method not implemented.');
  }
  static findById(userId: number) {
    throw new Error('Method not implemented.');
  }
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
  profilePicture: any;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith("$2b$")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(plainText: string): Promise<boolean> {
    return bcrypt.compare(plainText, this.password);
  }
}
