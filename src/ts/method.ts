import { isObject } from "@lcluber/chjs";
import { Logger, Group } from "@lcluber/mouettejs";
import { HTTPHeaders } from "./httpheaders";
import { HTTPRequestMethod, DataType, ResponseType } from "./types";

export class Method {
  private method: HTTPRequestMethod;
  private async: boolean;
  private noCache: boolean;
  // private responseType: ResponseType;
  private headers: HTTPHeaders;
  private log: Group = Logger.addGroup("Aias");

  constructor(method: HTTPRequestMethod, defaultHeaders: HTTPHeaders) {
    this.method = method;
    this.async = true;
    this.noCache = false;
    //this.responseType = "text";
    this.headers = defaultHeaders;
  }

  public setHeaders(headers: HTTPHeaders): void {
    for (const property in headers) {
      if (headers.hasOwnProperty(property)) {
        this.headers[property] = headers[property];
      }
    }
  }

  public getHeaders(): HTTPHeaders {
    return this.headers;
  }

  public call(
    url: string,
    responseType: ResponseType | "text",
    data?: DataType | Object
  ): Promise<DataType> {
    return new Promise((resolve: Function, reject: Function) => {
      const msg = ["Aias xhr ", " (" + this.method + ":" + url + ")"];
      const http = new XMLHttpRequest();

      url += this.noCache ? "?cache=" + new Date().getTime() : "";

      http.open(this.method, url, this.async);
      http.responseType = responseType;
      this.setRequestHeaders(http);

      switch (http.responseType) {
        case "arraybuffer":
          http.onload = () => {
            let arrayBuffer = http.response;
            if (arrayBuffer) {
              resolve(arrayBuffer);
            } else {
              reject(http.status);
            }
          };
          break;
        case "blob":
          http.onload = () => {
            let blob = http.response;
            if (blob) {
              resolve(blob);
            } else {
              reject(http.status);
            }
          };
          break;
        default:
          http.onreadystatechange = () => {
            if (http.readyState == 4) {
              if (http.status == 200) {
                this.log.info(msg[0] + "successful" + msg[1]);
                resolve(http.responseText);
              } else {
                this.log.error(msg[0] + "failed" + msg[1]);
                reject(http.status);
              }
            }
          };
      }

      if (isObject(data)) {
        data = JSON.stringify(data);
      }

      http.send(<DataType>data || null);
      this.log.info(msg[0] + "sent" + msg[1]);
    });
  }

  private setRequestHeaders(http: XMLHttpRequest): void {
    for (const property in this.headers) {
      if (this.headers.hasOwnProperty(property)) {
        http.setRequestHeader(property, <string>this.headers[property]);
      }
    }
  }
}
