import { METHODS } from "./methods";
import { HTTPHeaders, Methods } from "./interfaces";
import {
  DataType,
  ResponseType
} from "./types";

export class request {
  protected method: keyof Methods;
  protected url: string;
  protected responseType: ResponseType;
  protected async: boolean;
  protected noCache: boolean;
  protected headers: HTTPHeaders | undefined;
  protected data: DataType;

  constructor(
    method: keyof Methods,
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
    this.headers = headers;// || METHODS[method].headers;
    this.data = data;
  }

  protected setRequestHeaders(http: XMLHttpRequest): void {
    let requestHeaders: HTTPHeaders = {...METHODS[this.method].headers, ...this.headers};
    for (const property in requestHeaders) {
      if (requestHeaders.hasOwnProperty(property)) {
        if (requestHeaders[property] === '') {
          delete requestHeaders[property];
        }
      }
    }

    for (const property in requestHeaders) {
      if (requestHeaders.hasOwnProperty(property)) {
        http.setRequestHeader(property, <string>requestHeaders[property]);
      }
    }
  }

}
