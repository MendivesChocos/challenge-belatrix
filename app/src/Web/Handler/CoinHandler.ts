import { inject } from 'inversify';
import { AbstractHandler } from '../../Libs/Handler/AbstractHandler';
import { TYPES } from '../../Bootstrap/IoC/Types';
import { CurrencyCoinService } from '../../Currency/Application/CurrencyCoinService';
import { Post } from '../../Libs/Metadata/Routing/Post';

export class CoinHandler extends AbstractHandler {
  constructor(
    @inject(TYPES.Services.CurrencyCoinService) private currencyCoinService: CurrencyCoinService,
  ) {
    super();
  }

  @Post('/:applicantId/coin')
  public async getCoin(ctx, next) {
    console.log('hola ingrese');
    console.log(ctx.params.applicantId, 'applicandId');
    const params = ctx.request.query;
    ctx.type = 'json';
    ctx.body = await this.currencyCoinService.findExchangeRate(params.q)
    .catch(e => ctx.exception = e);
    next();
  }
}
