import 'reflect-metadata';
import { CurrencyCoinService } from '../CurrencyCoinService';

describe('Unit test CurrencyCoin', () => {

  let CoinRepositoryMock;
  let instance;

  beforeEach(() => {
    CoinRepositoryMock = {
      findCoin: jest.fn().mockResolvedValue({
        message: 'Se realizo la llamada correctamente.',
        status: 200,
        data: {
          keySource: 'USD',
          keyRate: 'EUR',
          valueRate: 0.88
        }
      }),
    };
    instance = new CurrencyCoinService(
      CoinRepositoryMock,
    );
  });

  describe('Method findExchangeRate', () => {
    test('Should add another change coin', async () => {
      const coinData = {
        key: 'USD',
        keyRate: 'EUR'
      };
      const response = await instance.findCoin(coinData);
      expect(CoinRepositoryMock.add).toBeCalled();
      expect(response).toHaveProperty('message', 'Se realizo la llamada correctamente.');
      expect(response).toHaveProperty('status', 200);
      expect(response).toHaveProperty('data');
    });

    test('Should find another currency change', async () => {
      try {
        await instance.addAward();
      } catch (error) {
        expect(error.status).toEqual(400);
        expect(error.type).toEqual('HTTP_EXCEPTION');
      }
    });
  });
});
