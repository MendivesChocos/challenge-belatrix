import { AbstractBaseAdapter } from './Base/AbstractBaseAdapter';
import axios from 'axios'
import { HttpAdapter } from './Interface/HttpAdapter';
import { injectable } from 'inversify';

@injectable()
export class AxiosHttpAdapter extends AbstractBaseAdapter implements HttpAdapter {

  private client;

  setHost(host: string) {
    this.client = axios.create({
      baseURL: host
    });
  }

  protected init() {
    const base_url = this.resourceManager.getConfig('environment')['services_base_url']
    this.client = axios.create({
      baseURL: base_url
    });
  }

  public get(uri: string) {
    return this.client.get(uri)
  }

  public post(uri: string, payload: object): Promise<object> {
    return this.client.post(uri, payload)
  }

  public put(uri: string, payload: object): Promise<object> {
    return this.client.put(uri, payload)
  }

  public delete(uri: string, payload: object): Promise<object> {
    return this.client.delete(uri, { data: payload })
  }

}
