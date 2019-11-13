export interface HttpAdapter {

  setHost(host: string);

  get(uri: string);

  post(uri: string, payload: object);

  put(uri: string, payload: object);

  delete(uri: string, payload: object);

}
