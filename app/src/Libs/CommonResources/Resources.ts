import * as fs from 'fs';
import * as path from 'path';

export class Resources {

  private resourcePath = path.join(__dirname, '../../../', 'resources/');

  public read = (file: string): Buffer => {
    return fs.readFileSync(this.resourcePath + file);
  }

  public getLink = (file: string): string => {
    return this.resourcePath + file;
  }

  public static formatDateForFront = (dateString: string): string => {
    const dateStringArr = dateString.split('-');
    return `${dateStringArr[2]}/${dateStringArr[1]}/${dateStringArr[0]}`;
  }

  public static formatSlug(str: string) {
    const slugSeparator: string = '-';
    return str
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[^a-zñÑáéíóúÚ0-9-]/g, slugSeparator)
      .replace(/-[-]*/g, slugSeparator)
      .replace(/-$/g, '')
      .replace(/^-/g, '');
  }
}
