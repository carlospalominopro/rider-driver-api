import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Rider } from '../../rider/entity/rider.entity';
import { Driver } from '../../driver/entity/driver.entity';
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

  @OneToMany(() => Request, (request) => request.id)
  @JoinColumn()
  request: Request;
}