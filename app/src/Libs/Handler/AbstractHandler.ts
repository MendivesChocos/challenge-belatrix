import 'reflect-metadata';
import * as Handler from '../../Web/Handler'
import { container } from '../../Bootstrap/IoC/AppContainer';
import { injectable } from 'inversify';

const prefixRoute = process.env.PREFIX;

@injectable()
export class AbstractHandler {

  protected redirectToHandler(ctx, handler: string) {
    const handlerParts = handler.split('.');
    const handlerName = handlerParts[0] + 'Handler';
    let instance = container.resolve(Handler[handlerName]);
    let route = Reflect.getMetadata('route', instance[handlerParts[1]]);
    ctx.redirect(prefixRoute + route);
  }

  protected exceptionHandler(error, extraData = null) {
    if (extraData === null) {
      extraData = {
        date: new Date()
      }
    }
    const response = {
      context: this.constructor.name,
      serviceResponse: error,
      extra: extraData
    };
    console.log(response)
    return response;
  }
}
