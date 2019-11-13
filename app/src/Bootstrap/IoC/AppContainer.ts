import { Container } from 'inversify';
import * as Sequelize from 'sequelize';
import { TYPES } from './Types';
import { ResourceManager } from '../../Libs/ResourceManager/ResourceManager';
import { HttpAdapter } from '../../Libs/Adapters/Interface/HttpAdapter';
import { AxiosHttpAdapter } from '../../Libs/Adapters/AxiosHttpAdapter';
import { HomeHandler } from '../../Web/Handler/HomeHandler';
import { CurrencyCoinService } from '../../Currency/Application/CurrencyCoinService';
import { DbCurrencyRepository } from '../../Currency/Infrastructure/Repository/DbCurrencyRepository';
import { CoinRepository } from '../../Currency/Domain/Repository/CoinRepository';
import { CoinModel } from '../../Currency/Infrastructure/Persistence/Mapping/CoinModel';
import { ExchangeRateModel } from '../../Currency/Infrastructure/Persistence/Mapping/ExchangeRateModel';

const container = new Container();
const commonConfig = new ResourceManager();
const db = commonConfig.getConfig('mysql');
console.log(db, '<-- db');
const dbConnection = new Sequelize(`${db.dialect}://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`, { logging: false, timezone: '-05:00' });
const dbConnection1 = new Sequelize({
  dialect: db.dialect,
  username: db.username,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
  operatorsAliases: false,
  logging: false
});

/**
 * Commons
 */
container.bind<ResourceManager>(TYPES.ResourceManager).to(ResourceManager).inSingletonScope();
container.bind<Sequelize.Sequelize>(TYPES.Sequelize).toConstantValue(dbConnection1);
container.bind<HttpAdapter>(TYPES.Adapters.HttpAdapter).to(AxiosHttpAdapter).inSingletonScope();

/**
 * Handlers
*/
container.bind<HomeHandler>(TYPES.Handlers.HomeHandler).to(HomeHandler).inSingletonScope();

/**
 * Services
 */
container.bind<CurrencyCoinService>(TYPES.Services.CurrencyCoinService).to(CurrencyCoinService).inSingletonScope();

/**
 * Repositories
 */
container.bind<CoinRepository>(TYPES.Repositories.CoinRepository).to(DbCurrencyRepository).inSingletonScope();

/**
 * Models
 */
container.bind<CoinModel>(TYPES.Models.CoinModel).to(CoinModel).inSingletonScope();
container.bind<ExchangeRateModel>(TYPES.Models.ExchangeRateModel).to(ExchangeRateModel).inSingletonScope();

export { container };
