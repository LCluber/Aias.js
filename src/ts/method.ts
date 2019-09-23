import { isObject } from "@lcluber/chjs";
import { Logger, Group } from "@lcluber/mouettejs";
import { HTTPHeaders } from "./httpheaders";
import { HTTPRequestMethod, DataType, ResponseType } from "./types";

export class Method {
  private method: HTTPRequestMethod;
  private async: boolean;
  private noCache: boolean;
  private headers: HTTPHeaders;
  private log: Group = Logger.addGroup("Aias");

  constructor(method: HTTPRequestMethod, defaultHeaders: HTTPHeaders) {
    this.method = method;
    this.async = true;
    this.noCache = false;
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
    responseType: ResponseType,
    data?: DataType | Object
  ): Promise<DataType> {
    return new Promise((resolve: Function, reject: Function) => {
      const http = new XMLHttpRequest();

      url += this.noCache ? "?cache=" + new Date().getTime() : "";

      http.open(this.method, url, this.async);
      http.responseType = responseType;
      this.setRequestHeaders(http);

      switch (http.responseType) {
        case "json":
        case "arraybuffer":
        case "blob":
          http.onload = () => {
            let response = http.response;
            if (response) {
              this.logInfo(url, http.status, http.statusText);
              resolve(response);
            } else {
              this.logError(url, http.status, http.statusText);
              reject({
                status: http.status,
                statusText: http.statusText
              });
            }
          };
          break;
        default:
          http.onreadystatechange = () => {
            if (http.readyState == 4) {
              if (http.status == 200) {
                this.logInfo(url, http.status, http.statusText);
                resolve(http.responseText);
              } else {
                this.logError(url, http.status, http.statusText);
                reject({
                  status: http.status,
                  statusText: http.statusText
                });
              }
            }
          };
      }

      if (isObject(data)) {
        data = JSON.stringify(data);
      }

      http.send(<DataType>data || null);
      this.log.info("xhr (" + this.method + ":" + url + ")" + "sent");
    });
  }

  private setRequestHeaders(http: XMLHttpRequest): void {
    for (const property in this.headers) {
      if (this.headers.hasOwnProperty(property)) {
        http.setRequestHeader(property, <string>this.headers[property]);
      }
    }
  }

  private logInfo(url: string, status: number, statusText: string): void {
    this.log.info(
      "xhr (" +
        this.method +
        ":" +
        url +
        ") done with status " +
        status +
        " " +
        statusText
    );
  }

  private logError(url: string, status: number, statusText: string): void {
    this.log.error(
      "xhr (" +
        this.method +
        ":" +
        url +
        ") failed with status " +
        status +
        " " +
        statusText
    );
  }
}
