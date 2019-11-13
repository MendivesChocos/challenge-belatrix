import { Sequelize } from 'sequelize'
import { injectable, inject } from 'inversify';
import { TYPES } from '../../Bootstrap/IoC/Types';

@injectable()
export default abstract class BaseSequelizeRepository {

  protected model;

  constructor(
    @inject(TYPES.Sequelize) protected sequelize: Sequelize
  ) {
    this.defineModel();
  }

  protected abstract defineModel();

}
