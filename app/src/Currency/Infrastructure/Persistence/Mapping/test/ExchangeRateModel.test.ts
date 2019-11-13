import 'reflect-metadata';
import { ExchangeRateModel } from '../ExchangeRateModel';

describe('Unit test AwardModel', () => {

  let instance;
  let sequelizeMock;

  beforeEach(() => {
    sequelizeMock = {
      define: jest.fn().mockReturnValue({})
    }
    instance = new ExchangeRateModel(sequelizeMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Method getModel', () => {
    test('Get exchangeRate applicant model', () => {
      const model = instance.getModel();
      expect(sequelizeMock.define).toBeCalled();
      expect(sequelizeMock.define.mock.calls[0][0]).toEqual('keySource');
      expect(sequelizeMock.define.mock.calls[0][1]).toHaveProperty('id');
      expect(sequelizeMock.define.mock.calls[0][2]).toEqual({
        tableName: 'exchange_rate',
        timestamps: false
      });
      expect(model).toEqual({});
    });
  });
});
