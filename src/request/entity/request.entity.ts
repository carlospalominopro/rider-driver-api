import { Rider } from "src/rider/entity/rider.entity";
import { Driver } from '../../driver/entity/driver.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Request {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Rider, (rider) => rider.id)
  @JoinColumn()
  rider: Rider;

  @OneToOne(() => Driver, (driver) => driver.id)
  @JoinColumn()
  driver: Driver;

  @Column()
  latitude_start: number;

  @Column()
  longitude_start: number;

  @Column()
  latitude_end: number;

  @Column()
  longitude_end: number;

}
