import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { isNumber } from 'util';

export function IsYearEnd(property: string, currentlyWorking: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsYearEnd',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property, currentlyWorking],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const startYear = (args.object as any)[args.constraints[0]];
          const currentlyWorking = (args.object as any)[args.constraints[1]];
          if (!currentlyWorking && isNumber(value) && value !== 0) {
            return value >= startYear;
          }
          return true;
        }
      }
    });
  };
}

export function IsMonthEnd(startYear: string, endYear: string, startMonth: string, currentlyWorking: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsMonthEnd',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [startYear, endYear, startMonth, currentlyWorking],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const startYear = (args.object as any)[args.constraints[0]];
          const endYear = (args.object as any)[args.constraints[1]];
          const startMonth = (args.object as any)[args.constraints[2]];
          const currentlyWorking = (args.object as any)[args.constraints[3]];
          if (!currentlyWorking && isNumber(value)) {
            return (startYear === endYear && value >= 1 && value <= 12) ? value >= startMonth : true;
          }
          return true;
        }
      }
    });
  };
}
