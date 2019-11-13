import * as KRouter from 'koa-router';
import * as Auth from 'koa-basic-auth';

const prefixRoute = process.env.PREFIX;
const user = process.env.USER;
const password = process.env.PASSWORD;

export class Router {

  private router: KRouter;

  constructor(kRouter: KRouter) {
    this.router = kRouter;
    this.router.prefix(prefixRoute);
  }

  public routing() {
    this.extraRouting();
    return this.router.routes();
  }

  public bindRoute(typeMethod, uri, instance, method) {
    console.log(`Routing:(${typeMethod})` + ':\t', `${uri}` + ':\t', `from ${instance.constructor.name}:${method}`)
    this.router[typeMethod](uri, (ctx, next) => {
      return instance[method](ctx, next)
    });
  }

  public binSecureRoute(typeMethod, uri, instance, method) {
    console.log(`Routing:(${typeMethod})` + ':\t', `${uri}` + ':\t', `from ${instance.constructor.name}:${method}`)
    this.router[typeMethod](uri, Auth({ name: user, pass: password }), (ctx, next) => {
      return instance[method](ctx, next)
    });
  }

  private extraRouting(): void {
    this.router.get('/', async (ctx) => {
      ctx.type = 'json';
      ctx.body = {
        data: 'All Ok'
      };
    });

    this.router.get('/health', async (ctx) => {
      ctx.type = 'json';
      ctx.body = {
        alive: true
      };
    });
  }
}
