import 'reflect-metadata';
import * as Handler from '../../Web/Handler';
import { Router } from './../../Bootstrap/Router';
import { container } from '../../Bootstrap/IoC/AppContainer';

export class HandlerFactory {

  static bindHandlers(routerMiddleware: Router) {
    for (const key in Handler) {
      let instance = container.resolve(Handler[key])
      if (Reflect.hasMetadata('routerable', instance)) {
        let methodList = Reflect.getMetadata('routerable', instance);
        for (let method of methodList) {
          let route = Reflect.getMetadata('route', instance[method]);
          let methodType = Reflect.getMetadata('method', instance[method]);
          let isSecure = Reflect.getMetadata('secure', instance[method]);
          if (isSecure) {
            routerMiddleware.binSecureRoute(methodType, route, instance, method);
            continue;
          }
          routerMiddleware.bindRoute(methodType, route, instance, method);
        }
      }
    }
  }
}
