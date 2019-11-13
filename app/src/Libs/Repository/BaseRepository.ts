import { injectable, inject } from 'inversify';
import { ResourceManager } from '../ResourceManager/ResourceManager';
import { TYPES } from '../../Bootstrap/IoC/Types';

@injectable()
export default abstract class BaseRepository {

    protected resourceManager : ResourceManager;

    constructor(
        @inject(TYPES.ResourceManager) resourceManager : ResourceManager 
    ) {
        this.resourceManager = resourceManager;
        this.init()
    }

    protected abstract init();
}