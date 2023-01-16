import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from 'typeorm';
import { BaseExceptionFilter } from '@nestjs/core';
import { BadRequestException } from '@nestjs/common/exceptions';
@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter  {
  catch(exception: unknown, host: ArgumentsHost) {    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let message = null;
    let code = 'HttpException';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;    
    
    switch (exception.constructor) {
        case HttpException:
            status = (exception as HttpException).getStatus();
            message = (exception as any)?.response?.data;
            break;
        case QueryFailedError:
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as QueryFailedError).message;
            code = (exception as any).code;
            break;
        case EntityNotFoundError:
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as EntityNotFoundError).message;
            code = (exception as any).code;
            break;
        case CannotCreateEntityIdMapError: 
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as CannotCreateEntityIdMapError).message;
            code = (exception as any).code;
            break;
        case BadRequestException:
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as any)?.response?.message;
            code = (exception as any).code;
            break;
        default:
            status = HttpStatus.INTERNAL_SERVER_ERROR

    }

    // AXIOS HANDLE ERROR
    if((exception as any)?.response?.data){
        message = (exception as any)?.response?.data;
        status = (exception as any)?.response?.status || 422;
        code = 'HttpRequestError'
    }

    response.status(status).json({status, code, message : message || (exception as any)?.message });
}
}