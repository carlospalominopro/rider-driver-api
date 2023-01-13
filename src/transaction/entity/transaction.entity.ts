import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Rider } from '../../rider/entity/rider.entity';
import { Driver } from '../../driver/entity/driver.entity';
import { Payment } from '../../payment/entity/payment.entity';
import { Request } from '../../request/entity/request.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount_in_cents: number;

  @Column()
  currency: string;

  @Column()
  customer_email: string;

  @Column()
  reference: string;

  @Column()
  status: string;

  @OneToOne(() => Payment, (payment) => payment.id_payment)
  @JoinColumn()
  payment_method: Payment;

  @Column()
  installments: number;

  @OneToOne(() => Rider, (rider) => rider.id)
  @JoinColumn()
  rider: Rider;

  @OneToOne(() => Driver, (driver) => driver.id)
  @JoinColumn()
  driver: Driver;

  @OneToOne(() => Request, (request) => request.id)
  @JoinColumn()
  request: Request;
}