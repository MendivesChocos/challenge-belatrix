import { validate } from 'class-validator';
import { BaseException } from '../../Libs/Exception/BaseException';
import HttpStatusCode from '../../Libs/CommonResources/HttpStatusCode';

export class ValidateEntity {
  static async initValidate(entity: any) {
    const errors = await validate(entity);
    if (errors.length) {
      const validateEntity = new ValidateEntity();
      const message: string = validateEntity.buildErrorMessage(errors);
      throw new BaseException(HttpStatusCode.BAD_REQUEST, message);
    }
  }

  private buildErrorMessage(errors: object[]): string {
    let message = '';
    for (let error of errors) {
      let descriptionError = '';
      const MIN_KEY = 1;
      const errorKeys = Object.keys(error['constraints']);
      const lastString = errorKeys.length > MIN_KEY ? '\\n' : '';
      for (let errorKey of errorKeys) {
        descriptionError += error['constraints'][errorKey] + lastString;
      }
      message += `${error['property']}: ${descriptionError} \\n`;
    }
    return message;
  }
}
