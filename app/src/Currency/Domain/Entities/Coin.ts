import { IsString } from 'class-validator';
import { messageType } from './Validation/messages';

export class Coin {
  private id: number;

  @IsString({
    message: messageType.string
  })
  private key: string;

  @IsString({
    message: messageType.string
  })
  private slug: string;

  public getId(): number {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getKey(): string {
    return this.key;
  }

  public setKey(key: string) {
    this.key = key;
  }

  public getSlug(): string {
    return this.key;
  }

  public setSlug(slug: string) {
    this.slug = slug;
  }
}
