import * as Sequelize from 'sequelize';
import BaseSequelizeModel from '../../../../Libs/Model/BaseSequelizeModel';

export class CoinModel extends BaseSequelizeModel {
  protected model;

  getModel() {
    this.model = this.sequelize.define('coin',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        key: { type: Sequelize.STRING, field: 'applicant_id' },
        slug: { type: Sequelize.STRING, field: 'job_id' }
      }, {
        tableName: 'coin',
        timestamps: false
      });
    return this.model;
  }
}
