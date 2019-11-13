import { Config } from '../CommonResources/Config';
import { Resources } from '../CommonResources/Resources';
import { injectable } from 'inversify';
import { YmlParse } from '../CommonResources/YmlParser';

@injectable()
export class ResourceManager {
    private config: Config;
    private resources: Resources;

    private static c: ResourceManager = null;

    constructor()
    {
      this.config = new Config();
      this.resources = new Resources();
    }

    public getConfig(key: any) {
      return this.config.geConfig()[key];
    }

    public readResource(file: string): Buffer {
      return this.resources.read(file);
    }

    public getResource(file: string): string {
      return this.resources.getLink(file);
    }

    public readYml(path: string) {
      return YmlParse.read(path);
    }

    public static get(): ResourceManager {
      if(this.c == null) {
          this.c = new ResourceManager();
      }
      return this.c;
    }
}
