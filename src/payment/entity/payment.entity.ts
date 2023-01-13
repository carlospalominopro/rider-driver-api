import { Rider } from 'src/rider/entity/rider.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_payment: number;

  @Column()
  type: string;
  
  @Column()
  token: string;
  
  @Column()
  phone_number: string;

  @OneToOne(() => Rider, (rider) => rider.id)
  @JoinColumn()
  rider: Rider;
  
}