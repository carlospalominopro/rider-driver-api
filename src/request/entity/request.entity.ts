import { Rider } from "src/rider/entity/rider.entity";
import { Driver } from '../../driver/entity/driver.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Request {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rider, (rider) => rider.id, { nullable: false })
  @JoinColumn()
  rider: Rider;

  @ManyToOne(() => Driver, (driver) => driver.id, { nullable: false })
  @JoinColumn()
  driver: Driver;

  @Column({
    nullable : false,
    type : 'float'
  })
  latitude_start: number;

  @Column({
    nullable : false,
    type : 'float'
  })
  longitude_start: number;

  @Column({
    nullable : true,
    type : 'float'
  })
  latitude_end: number;

  @Column({
    nullable : true,
    type : 'float'
  })
  longitude_end: number;

  @Column({
    nullable : false,
    type : 'datetime'
  })
  startDate: Date;

  @Column({
    nullable : true,
    type : 'datetime'
  })
  endDate: Date;


}
