import { Exception } from 'ts-httpexceptions';
import HttpStatusCode from '../CommonResources/HttpStatusCode';

export class BaseException extends Exception {
  code: number;
  message: string;
  previous: Exception;

  constructor(code = HttpStatusCode.BAD_REQUEST, message?: string, previous?: Exception) {
    super(code, message, previous);
    this.code = code;
    this.message = message;
    this.previous = previous;
  }

  get getCode(): number {
    return this.code;
  }

  get getMessage(): string {
    return this.message;
  }

  get getPrevious(): Exception {
    return this.previous;
  }
}
