import { inject } from 'inversify';
import { AbstractHandler } from '../../Libs/Handler/AbstractHandler';
import { Get } from '../../Libs/Metadata/Routing/Get';
import { TYPES } from '../../Bootstrap/IoC/Types';
import { CurrencyCoinService } from '../../Currency/Application/CurrencyCoinService';

export class HomeHandler extends AbstractHandler {
  constructor(
    @inject(TYPES.Services.CurrencyCoinService) private currencyCoinService: CurrencyCoinService,
  ) {
    super();
  }

  @Get('/home')
  public async home(ctx, next) {
    console.log('hola ingres');
    const params = ctx.request.query;
    console.log(params, '<<- params')
    ctx.type = 'json';
    ctx.body = await this.currencyCoinService.findExchangeRate(params)
    .catch(e => ctx.exception = e);
  next();
  }
}
