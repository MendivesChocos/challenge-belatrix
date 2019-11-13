import 'reflect-metadata';

export const Post = (route: string, secure: boolean = false) => {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    let listMethods = [];
    if (Reflect.hasMetadata('routerable', target)) {
        listMethods = Reflect.getMetadata('routerable', target);
    }
    listMethods.push(propertyKey);
    Reflect.defineMetadata('routerable', listMethods, target);
    Reflect.defineMetadata('route', route, descriptor.value);
    Reflect.defineMetadata('method', 'post', descriptor.value);
    Reflect.defineMetadata('secure', secure, descriptor.value);
  };
}
