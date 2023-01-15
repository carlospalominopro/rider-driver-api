import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable : false,
    unique : true,
    length: 500
  })
  acceptance_token: string;
  
}