import { isObject } from "@lcluber/chjs";
import { Logger, Group } from "@lcluber/mouettejs";
import { HTTPHeaders } from "./interfaces";
import { Observable } from "rxjs";
import {
  HTTPRequestMethod,
  DataType,
  SendDataType,
  ResponseDataType,
  ResponseType,
  EventType
} from "./types";
import Promise from "promise-polyfill";

const AudioContext =
  window.AudioContext || // Default
  (<any>window).webkitAudioContext || // Safari and old versions of Chrome
  false;

export class Request {
  private method: HTTPRequestMethod;
  private url: string;
  private responseType: ResponseType;
  private async: boolean;
  private noCache: boolean;
  private headers: HTTPHeaders;
  private eventType: EventType = "promise";
  private data: DataType;
  private log: Group = Logger.addGroup("Aias");

  constructor(
    method: HTTPRequestMethod,
    url: string,
    responseType: ResponseType,
    headers: HTTPHeaders,
    eventType: EventType,
    data: DataType
  ) {
    this.method = method;
    this.url = url;
    this.responseType = responseType;
    this.async = true;
    this.noCache = false;
    this.headers = headers;
    this.eventType = eventType || this.eventType;
    this.data = data || null;
  }

  public call(): Promise<ResponseDataType> | Observable<ResponseDataType> {
    switch (this.eventType) {
      case "observable":
        return this.useObservable(this.url, this.responseType, this.data);
        break;
      default:
        return this.usePromise(this.url, this.responseType, this.data);
    }
  }

  private usePromise(
    url: string,
    responseType: ResponseType,
    data?: DataType
  ): Promise<ResponseDataType> {
    return new Promise((resolve: Function, reject: Function) => {
      const http = new XMLHttpRequest();

      url += this.noCache ? "?cache=" + new Date().getTime() : "";

      http.open(this.method, url, this.async);
      http.responseType =
        responseType === "audiobuffer" ? "arraybuffer" : responseType;
      this.setRequestHeaders(http);

      switch (responseType) {
        case "json":
        case "arraybuffer":
        case "audiobuffer":
        case "blob":
          http.onload = () => {
            if (http.readyState == 4) {
              if (http.status == 200) {
                const response = http.response;
                if (response) {
                  this.log.time("xhr " + url);
                  this.logInfo(url, http.status, http.statusText);
                  if (responseType === "audiobuffer") {
                    if (AudioContext) {
                      const audioContext = new AudioContext();
                      audioContext.decodeAudioData(
                        response,
                        buffer => {
                          audioContext.close();
                          resolve(buffer);
                        },
                        (error: DOMException) => {
                          this.log.error(
                            "xhr (" +
                              this.method +
                              ":" +
                              url +
                              ") failed with decodeAudioData error : " +
                              error.message
                          );
                          audioContext.close();
                          reject({
                            status: error.name,
                            statusText: error.message
                          });
                        }
                      );
                    } else {
                      this.log.error(
                        "xhr (" +
                          this.method +
                          ":" +
                          url +
                          ") failed with error : " +
                          "Web Audio API is not supported by your browser."
                      );
                      reject({
                        status: "Web Audio API not supported by your browser",
                        statusText:
                          "Web Audio API is not supported by your browser"
                      });
                    }
                  } else {
                    resolve(response);
                  }
                } else {
                  this.logError(url, http.status, http.statusText);
                  reject({
                    status: http.status,
                    statusText: http.statusText
                  });
                }
              } else {
                this.logError(url, http.status, http.statusText);
                reject({
                  status: http.status,
                  statusText: http.statusText
                });
              }
            }
          };
          break;
        default:
          http.onreadystatechange = () => {
            if (http.readyState == 4) {
              if (http.status == 200) {
                this.log.time("xhr " + url);
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
      this.log.time("xhr " + url);
      http.send(<SendDataType>data || null);
      this.log.info("xhr (" + this.method + ":" + url + ")" + "sent");
    });
  }

  private useObservable(
    url: string,
    responseType: ResponseType,
    data?: DataType
  ): Observable<ResponseDataType> {
    return new Observable(observer => {
      const http = new XMLHttpRequest();

      url += this.noCache ? "?cache=" + new Date().getTime() : "";

      http.open(this.method, url, this.async);
      http.responseType =
        responseType === "audiobuffer" ? "arraybuffer" : responseType;
      this.setRequestHeaders(http);

      switch (responseType) {
        case "json":
        case "arraybuffer":
        case "audiobuffer":
        case "blob":
          http.onload = () => {
            if (http.readyState == 4) {
              if (http.status == 200) {
                const response = http.response;
                if (response) {
                  this.log.time("xhr " + url);
                  this.logInfo(url, http.status, http.statusText);
                  if (responseType === "audiobuffer") {
                    if (AudioContext) {
                      const audioContext = new AudioContext();
                      audioContext.decodeAudioData(
                        response,
                        buffer => {
                          audioContext.close();
                          observer.next(buffer);
                          observer.complete();
                        },
                        (error: DOMException) => {
                          this.log.error(
                            "xhr (" +
                              this.method +
                              ":" +
                              url +
                              ") failed with decodeAudioData error : " +
                              error.message
                          );
                          audioContext.close();
                          observer.error({
                            status: error.name,
                            statusText: error.message
                          });
                          observer.complete();
                        }
                      );
                    } else {
                      this.log.error(
                        "xhr (" +
                          this.method +
                          ":" +
                          url +
                          ") failed with error : " +
                          "Web Audio API is not supported by your browser."
                      );
                      observer.error({
                        status: "Web Audio API not supported by your browser",
                        statusText:
                          "Web Audio API is not supported by your browser"
                      });
                      observer.complete();
                    }
                  } else {
                    observer.next(response);
                    observer.complete();
                  }
                } else {
                  this.logError(url, http.status, http.statusText);
                  observer.error({
                    status: http.status,
                    statusText: http.statusText
                  });
                  observer.complete();
                }
              } else {
                this.logError(url, http.status, http.statusText);
                observer.error({
                  status: http.status,
                  statusText: http.statusText
                });
                observer.complete();
              }
            }
          };
          break;
        default:
          http.onreadystatechange = () => {
            if (http.readyState == 4) {
              if (http.status == 200) {
                this.log.time("xhr " + url);
                this.logInfo(url, http.status, http.statusText);
                observer.next(http.responseText);
                observer.complete();
              } else {
                this.logError(url, http.status, http.statusText);
                observer.error({
                  status: http.status,
                  statusText: http.statusText
                });
                observer.complete();
              }
            }
          };
      }

      if (isObject(data)) {
        data = JSON.stringify(data);
      }

      http.send(<SendDataType>data || null);
      this.log.time("xhr " + url);
      this.log.info("xhr (" + this.method + ":" + url + ")" + "sent");
    });
  }

  private setRequestHeaders(http: XMLHttpRequest): void {
    for (const property in this.headers) {
      if (this.headers.hasOwnProperty(property)) {
        http.setRequestHeader(property, <string>this.headers[property]);
      }
    }
    console.log("headers", this.headers);
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