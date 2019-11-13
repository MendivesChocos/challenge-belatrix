import * as Koa from 'koa';
import { Router } from './Router';
import * as bodyParser from 'koa-bodyparser';
import { HandlerFactory } from '../Libs/Handler/HandlerFactory';
import { BaseException } from '../Libs/Exception/BaseException';
import * as logger from 'koa-logger';

const koaSwagger = require('koa2-swagger-ui');
const serve = require('koa-static');
const mount = require('koa-mount');

export class App {
  public koa
  private router;

  constructor(koa: Koa, router: Router) {
    this.koa = koa;
    this.router = router;
    HandlerFactory.bindHandlers(this.router);
    this.koa.use(bodyParser());
    this.koa.use(this.router.routing());
    this.koa.use(mount(process.env.PREFIX + '/public', serve('./public')));
    this.koa.use(logger());
    this.koa.use(
      koaSwagger({
        title: 'Aptitus Applicant Microservice',
        routePrefix: process.env.PREFIX + '/doc',
        swaggerOptions: {
          url: process.env.PREFIX + '/public/doc.json'
        }
      })
    );

    this.koa.use((ctx, next) => {
      if (ctx.exception instanceof BaseException) {
        ctx.status = ctx.exception.getCode;
        ctx.body = {
          'message': ctx.exception.getMessage,
          'code': ctx.status
        }
        console.log(JSON.stringify(ctx.body));
        next();
      }
    });
    this.koa.on('error', function (err, ctx) {
      console.log(err)
      logger.error('server error', err, ctx);
      return ctx();
    });

  }
}
