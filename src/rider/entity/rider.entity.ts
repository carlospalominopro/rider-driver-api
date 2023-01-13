import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Payment } from '../../payment/entity/payment.entity';

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Payment, (payment) => payment.id_payment)
  @JoinColumn()
  payment: Payment;

}