export class Request {
  private method: HTTPRequestMethod;
  private async: boolean;
  private noCache: boolean;

  constructor(method: HTTPRequestMethod, headers: HTTPHeaders) {
    this.method = method;
    this.async = true;
    this.noCache = false;
    this.headers = headers;
  }
}
