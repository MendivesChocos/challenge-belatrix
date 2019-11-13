import { ResourceManager } from '../../ResourceManager/ResourceManager';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../Bootstrap/IoC/Types';

@injectable()
export abstract class AbstractBaseAdapter {

  protected resourceManager: ResourceManager;

  public constructor(
    @inject(TYPES.ResourceManager) resourceManager: ResourceManager
  ) {
    this.resourceManager = resourceManager;
    this.init();
  }

  protected abstract init();
}
