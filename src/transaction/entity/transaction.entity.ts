import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Request } from '../../request/entity/request.entity';

@Entity()
export class Transaction {
  @PrimaryColumn("uuid")
  id: number;

  @Column({
    nullable : false,
    type : 'float'
  })
  amount_in_cents: number;

  @Column({
    nullable : false
  })
  currency: string;

  @Column({
    nullable : false
  })
  reference: string;

  @Column({
    nullable : false
  })
  status: string;

  @Column({
    nullable : false
  })
  createdAt: Date;

  @OneToOne(() => Request, (request) => request.id)
  @JoinColumn()
  request: Request;
}