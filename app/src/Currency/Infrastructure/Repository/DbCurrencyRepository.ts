import { injectable, inject } from 'inversify';
import { CoinRepository } from '../../Domain/Repository/CoinRepository';
import { ExchangeRateModel } from '../Persistence/Mapping/ExchangeRateModel';
import { TYPES } from '../../../Bootstrap/IoC/Types';
import { BaseException } from '../../../Libs/Exception/BaseException';
import HttpStatusCode from '../../../Libs/CommonResources/HttpStatusCode';
import { resultDto } from '../../../Libs/Dto/ResultDto';

@injectable()
export class DbCurrencyRepository implements CoinRepository {
  protected exchangeRateModel: any;

  constructor(
    @inject(TYPES.Models.ExchangeRateModel) protected model: ExchangeRateModel
  ) {
    this.exchangeRateModel = this.model.getModel();
  }

  public async findCoin(coinsData: object): Promise<object> {
    try {
      const { dataValues } = await this.exchangeRateModel.findOne({
        where: {
          keySource: coinsData['keySource'],
          keyRate: coinsData['keyRate']
        }
      });
      const dto = new resultDto(dataValues, 'Se realizo la llamada correctamente.', true);
      console.log(dataValues, 'dataValues');
      return dto.body;
    } catch (error) {
      console.log('DbCurrencyRepository/findCoin', error);
      throw new BaseException(HttpStatusCode.BAD_REQUEST, 'No se encontro el tipo de cambio.');
    }
  }

}
