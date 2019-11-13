import { injectable, inject } from 'inversify';
import { TYPES } from '../../Bootstrap/IoC/Types';
import { CoinRepository } from '../Domain/Repository/CoinRepository';

@injectable()
export class CurrencyCoinService {
  constructor(
    @inject(TYPES.Repositories.CoinRepository) private coinRepository: CoinRepository,
  ) { }

  public async findExchangeRate(coinData: object) {
    let response = await this.coinRepository.findCoin(coinData);
    return response;
  }
}
