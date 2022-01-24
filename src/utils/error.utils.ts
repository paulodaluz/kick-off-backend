import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorUtils {
  public static throwSpecificError(code: number): never {
    switch (code) {
      case 400:
        throw new HttpException(
          'Client specified an invalid argument, request body or query param.',
          HttpStatus.BAD_REQUEST,
        );
      case 403:
        throw new HttpException(
          'Client does not have sufficient permission.',
          HttpStatus.FORBIDDEN,
        );
      case 404:
        throw new HttpException('The specified resource is not found.', HttpStatus.NOT_FOUND);
      case 504:
        throw new HttpException('Request timeout exceeded.', HttpStatus.GATEWAY_TIMEOUT);
      default:
        throw new HttpException(
          'Unknown server error. Typically a server bug.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
