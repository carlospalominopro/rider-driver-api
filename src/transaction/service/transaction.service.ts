import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entity/transaction.entity';
import { Request } from '../../request/entity/request.entity';
import { CreateTransaction } from '../entity/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>,
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
      ) {}
    
      async create( data : CreateTransaction){

        // FALTA CALCULAR DISTANCIA FINAL con el tiempo pactado
      
        const request = await this.requestRepository.findOneBy({id: data.idRequest});

        if (!request) {
          throw new HttpException(
            "Request ID not found - Please verify table request on DB",
            HttpStatus.NOT_FOUND
          );
        }
    
      
        return {
          message : 'request',
          data  : {
            idRequest : request
          }
        };
      }
}
