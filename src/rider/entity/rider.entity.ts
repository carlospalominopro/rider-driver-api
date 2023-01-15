import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}