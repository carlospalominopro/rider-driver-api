import { Injectable } from "@nestjs/common";
import { Request } from "../../request/entity/request.entity";

@Injectable()
export class CalculateService {

  getTotalAmount(request : Request) {
    const totalDistance = this.calculateDistance(
      request.latitude_start,
      request.longitude_start,
      request.latitude_end,
      request.longitude_end
    );

    const diffMinutes = this.calculateDiffDates(
      request.startDate,
      request.endDate
    );
    const totalAmount = this.calculateAmountTotal(
      totalDistance,
      diffMinutes
    );

    return totalAmount * 100;
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const earthRadius = 6371;
    const distanceLat = this.deg(lat2 - lat1);
    const distanceLon = this.deg(lon2 - lon1);

    const calcA =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.cos(this.deg(lat1)) *
        Math.cos(this.deg(lat2)) *
        Math.sin(distanceLon / 2) *
        Math.sin(distanceLon / 2);

    const calcB = 2 * Math.atan2(Math.sqrt(calcA), Math.sqrt(1 - calcA));
    const distance = earthRadius * calcB;

    return Math.round((distance + Number.EPSILON) * 100) / 100;
  }

  deg(param) {
    return param * (Math.PI / 180);
  }

  calculateDiffDates(startDate: Date, endDate: Date) {
    return Math.round((endDate.getTime() - startDate.getTime()) / 60000);
  }

  calculateAmountTotal(distance: number, time: number) {
    const baseAmount = parseInt(process.env.BASE_TAX);
    const distanceAmount = parseInt(process.env.TAXKM) * distance;
    const timeAmount = parseInt(process.env.TAXMIN) * time;

    if (baseAmount >= distanceAmount + timeAmount) {
      return baseAmount;
    }

    return baseAmount + distanceAmount + timeAmount;
  }
}
