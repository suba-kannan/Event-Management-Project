import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './User'; 
import { Event } from './Event'; 

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Event, (event) => event.bookings)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Column()
  participants: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;
}
