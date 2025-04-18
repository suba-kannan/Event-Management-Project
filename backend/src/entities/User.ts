import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Event } from './Event';
import { Booking } from './Booking';


@Entity()
export class User {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
