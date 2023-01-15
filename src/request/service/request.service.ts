import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "../entity/request.entity";
import { CreateRequest } from "../entity/create-request.dto";
import { Rider } from "../../rider/entity/rider.entity";
import { Driver } from "../../driver/entity/driver.entity";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>
  ) {}

  async store(data: CreateRequest) {
    const findRider = await this.riderRepository.findOne({
      where: {
        id: data.rider_id,
      },
    });

    if (!findRider) {
      throw new HttpException(
        "Rider not found - Please verify the rider_id",
        HttpStatus.NOT_FOUND
      );
    }

    // SE SELECCIONA UN CONDUCTOR RANDOM
    const findDriver = await this.driverRepository
      .createQueryBuilder("driver")
      .select()
      .orderBy("RAND()")
      .getOne();

    if (!findDriver) {
      throw new HttpException(
        "Driver not found - Please verify table driver on DB",
        HttpStatus.NOT_FOUND
      );
    }

    const request = new Request();
    request.driver = findDriver;
    request.latitude_start = data.latitude;
    request.longitude_start = data.longitude;
    request.rider = findRider;
    request.startDate = new Date();

    console.log(request);

    const dataRequest = await this.requestRepository.save(request);

    return {
      message : 'Satisfactory driver request',
      data  : {
        idRequest : dataRequest.id,
        driver : dataRequest.driver.name,
      }
    };
  }
}
