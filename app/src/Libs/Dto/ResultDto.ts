export interface ResultDto {
  data: object;
  status: boolean;
  message: string;
}
export class resultDto {
  constructor(
    private data?: object,
    private message?: string,
    private status = false
  ) {
    this.data = data;
    this.message = message;
    this.status = status
  }

  set setStatus(status: boolean) {
    this.status = status;
  }

  set setMessage(message: string) {
    this.message = message;
  }

  set setData(data: object) {
    this.data = data;
  }

  get getData() {
    return this.data;
  }
  get getMessage() {
    return this.message;
  }
  get getStatus() {
    return this.status;
  }

  get body() {
    return {
      'status': this.getStatus,
      'message': this.getMessage,
      'data': this.getData
    }
  }
}
