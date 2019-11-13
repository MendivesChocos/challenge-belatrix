import * as fs from 'fs';
import * as path from 'path';

export class Config {

  private configPath = path.join(__dirname, '../../../', 'config/');
  private config: Object = {};

  constructor() {
    let flist = fs.readdirSync(this.configPath);
    flist.forEach(file => {
      this.config = (<any>Object).assign(this.config, this.readJson(file));
    });
  }

  private readJson = (file: string) => {
    return require(this.configPath + file);
  }

  public geConfig(): any {
    return this.config;
  }

}
