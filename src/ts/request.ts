import { METHODS } from "./methods";
import { HTTPHeaders } from "./interfaces";
import {
  HTTPRequestMethod,
  DataType,
  ResponseType
} from "./types";

export class request {
  protected method: HTTPRequestMethod;
  protected url: string;
  protected responseType: ResponseType;
  protected async: boolean;
  protected noCache: boolean;
  protected headers: HTTPHeaders;
  protected data: DataType;

  constructor(
    method: HTTPRequestMethod,
    url: string,
    responseType: ResponseType,
    data: DataType,
    headers?: HTTPHeaders
  ) {
    this.method = method;
    this.url = url;
    this.responseType = responseType;
    this.async = true;
    this.noCache = false;
    this.headers = headers || METHODS[method].headers;
    this.data = data;
  }

  protected setRequestHeaders(http: XMLHttpRequest): void {
    for (const property in this.headers) {
      if (this.headers.hasOwnProperty(property)) {
        if (this.headers[property] !== null && this.headers[property] !== false) {
          http.setRequestHeader(property, <string>this.headers[property]);
        }
      }
    }
  }

}
