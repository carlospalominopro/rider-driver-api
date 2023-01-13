import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "../entity/request.entity";
import { CreateRequest } from "../entity/create-request.dto";
import { Rider } from "../../rider/entity/rider.entity";
import { Driver } from "../../driver/entity/driver.entity";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";

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

  async store(data: CreateRequest): Promise<Request> {
    const findRider = await this.riderRepository.findOne({
      where: {
        id: data.rider_id,
      },
    });

    console.log(findRider);

    // SE SELECCIONA UN CONDUCTOR RANDOM
    const findDriver = await this.driverRepository
      .createQueryBuilder("driver")
      .select()
      .orderBy("RAND()")
      .getOne();

    console.log(findDriver);

    if (findRider && findDriver) {
      const request = new Request();
      request.driver = findDriver;
      request.latitude_start = data.latitude;
      request.longitude_start = data.longitude;
      request.rider = findRider;

      console.log(request);

      return this.requestRepository.create(request);
    } else {
      throw new HttpException(
        {
          error: "No se encontró Driver o Rider"
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
