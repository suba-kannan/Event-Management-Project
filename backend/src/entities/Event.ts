import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Booking } from './Booking';

@Entity()
export class Event {
  availableSeats: number;
  static find() {
    throw new Error('Method not implemented.');
  }
  static splice(existingEventIndex: any, arg1: number) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  seatsAvailable: number;

  @Column({ nullable: true })
  banner: string;

  @ManyToOne(() => User, (user) => user.events)
  organizer: User;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}