import * as Sequelize from 'sequelize';
import BaseSequelizeModel from '../../../../Libs/Model/BaseSequelizeModel';

export class ExchangeRateModel extends BaseSequelizeModel {
  protected model;

  getModel() {
    console.log('getModel');
    this.model = this.sequelize.define('exchangeRate',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        keySource: { type: Sequelize.STRING, field: 'key_source' },
        keyRate: { type: Sequelize.STRING, field: 'key_rate' },
        valueRate: { type: Sequelize.DOUBLE, field: 'value_rate' },
        datetime: { type: Sequelize.DATE, field: 'date' }
      }, {
        tableName: 'exchange_rate',
        timestamps: false
      });
    return this.model;
  }
}
