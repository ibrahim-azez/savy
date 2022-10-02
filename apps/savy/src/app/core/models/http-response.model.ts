export class HttpResponse {
  statusCode: number;
  message: string;

  constructor(httpResponse: HttpResponse) {
    this.statusCode = httpResponse.statusCode;
    this.message = httpResponse.message;
  }
}
