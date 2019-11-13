import 'reflect-metadata';
import { DbCurrencyRepository } from '../DbCurrencyRepository';

describe('Unit test DbCurrencyRepository', () => {
  describe('Method constructor', () => {
    test('Should initialize the method findCoin', () => {
      const ExchangeRateModelMock: any = {
        getModel: jest.fn().mockReturnValue({
          findCoin: jest.fn()
        })
      };
      new DbCurrencyRepository(ExchangeRateModelMock);
      expect(ExchangeRateModelMock.getModel).toBeCalled();
    });
  });

  describe('Method findCoin', () => {
    const modelMock: any = {
      getModel: jest.fn().mockReturnValue({
        findCoin: jest.fn().mockResolvedValue({})
      }),
    };

    test('should get findCoin correctly', async () => {
      const coinData = {
        key: 'USD',
        keyRate: 'EUR'
      };
      const instance = new DbCurrencyRepository(modelMock);
      const result = await instance.findCoin(coinData);
      expect(modelMock.getModel().findCoin).toBeCalledWith(coinData);
      expect(result).toHaveProperty('message', 'Se realizo la llamada correctamente.');
      expect(result).toHaveProperty('status', true);
      expect(result).toHaveProperty('data');
    });

    test('should show an error by removing a wrong Coin’s data', async () => {
      const instance = new DbCurrencyRepository(modelMock);
      await instance.findCoin(undefined)
        .catch(error => {
          expect(error.status).toEqual(400);
          expect(error.type).toEqual('HTTP_EXCEPTION');
        });
    });
  });

});
