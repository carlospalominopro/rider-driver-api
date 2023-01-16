import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "../entity/transaction.entity";
import { Request } from "../../request/entity/request.entity";
import { CreateTransaction } from "../entity/create-transaction.dto";
import { RequestService } from "../../request/service/request.service";
import { CalculateService } from "./calculate.service";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { AppService } from "../../app.service";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private readonly requestService: RequestService,
    private readonly calculateService: CalculateService,
    private readonly appService: AppService,
    private readonly httpService: HttpService
  ) {}

  async store(body: CreateTransaction) {
    const request = await this.requestService.getRequest(body.idRequest);

    if (!request) {
      throw new HttpException(
        "Request ID not found - Please verify table request on DB",
        HttpStatus.NOT_FOUND
      );
    }

    const trValidate = await this.findOneByRequest(request.id);

    if (trValidate) {
      throw new HttpException(
        `The ride with Request ID : ${request.id} has already been completed with Transaction ID : ${trValidate.id}, please create another Request`,
        HttpStatus.BAD_REQUEST
      );
    }

    request.latitude_end = body.latitude_end;
    request.longitude_end = body.longitude_end;
    request.endDate = new Date();

    // UPDATE REQUEST
    await this.requestService.update(body.idRequest, request);

    const totalAmount = this.calculateService.getTotalAmount(request);

    const { data } = await this.executeTransactionHTTP(totalAmount, request);

    // DB
    const transaction = new Transaction();

    transaction.id = data?.data?.id;
    transaction.amount_in_cents = data?.data?.amount_in_cents;
    transaction.request = request;
    transaction.currency = data?.data?.currency;
    transaction.status = data?.data?.status;
    transaction.reference = data?.data?.reference;
    transaction.createdAt = data?.data?.created_at;

    // DB INSERT TRANSACTION
    await this.create(transaction);

    const info = await this.findOneTransaction(transaction.id);

    return {
      message: "Transaction successfully created",
      data: {
        info,
        transactionService: data?.data,
      },
    };
  }

  findOneTransaction(id: number): Promise<Transaction> {
    return this.transactionRepository.findOne({
      where: {
        id : id,
      },
      relations : {
        request : {
          rider: true,
          driver: true,
        }
      }
    });
  }

  findOneByRequest(id: number): Promise<Transaction> {
    return this.transactionRepository.findOne({
      where: {
        request: {
          id : id,
        },
      },
    });
  }

  create(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save(transaction);
  }

  async executeTransactionHTTP(
    amount: number,
    request: Request
  ): Promise<AxiosResponse<any>> {
    const url = `${process.env.API_URL}/transactions`;

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.PRV_TEST}`,
      },
    };

    const app_token = await this.appService.getLastAcceptanceToken();

    const body = {
      acceptance_token: app_token.acceptance_token,
      amount_in_cents: amount,
      currency: process.env.CURRENCY,
      customer_email: "test@example.com",
      reference: "Request#" + request.id.toString(),
      payment_method: {
        type: process.env.TYPE,
        token: process.env.CARD_TOKEN,
        installments: 1,
      },
      payment_source_id: parseInt(process.env.PAYMENT_SOURCE),
    };

    console.log(body);

    const httpRequest = await this.httpService.axiosRef.post(url, body, config);

    return httpRequest;
  }
}
