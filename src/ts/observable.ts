import { isObject } from "@lcluber/chjs";
import { getAudioContext } from "./audio";
import { METHODS } from "./methods";
// import { Logger, Group } from "@lcluber/mouettejs";
import { HTTPHeaders } from "./interfaces";
import { Observable } from "rxjs";
import {
  HTTPRequestMethod,
  DataType,
  SendDataType,
  ResponseDataType,
  ResponseType
} from "./types";

const AudioContext = getAudioContext();

export class observable {
  private method: HTTPRequestMethod;
  private url: string;
  private responseType: ResponseType;
  private async: boolean;
  private noCache: boolean;
  private headers: HTTPHeaders;
  private data: DataType;
  // private log: Group = Logger.addGroup("Aias");

  constructor(
    method: HTTPRequestMethod,
    url: string,
    responseType: ResponseType,
    data: DataType
  ) {
    this.method = method;
    this.url = url;
    this.responseType = responseType;
    this.async = true;
    this.noCache = false;
    this.headers = METHODS[method].headers || METHODS[method].defaultHeaders;
    this.data = data;
  }

  public call(): Observable<ResponseDataType> {
    return new Observable(observer => {
      const http = new XMLHttpRequest();

      this.url += this.noCache ? "?cache=" + new Date().getTime() : "";

      http.open(this.method, this.url, this.async);
      http.responseType = this.responseType === "audiobuffer" ? "arraybuffer" : this.responseType;
      this.setRequestHeaders(http);

      switch (this.responseType) {
        case "json":
        case "arraybuffer":
        case "audiobuffer":
        case "blob":
          http.onload = () => {
            if (http.readyState == 4) {
              if (http.status == 200) {
                const response = http.response;
                if (response) {
                  // this.log.time("xhr " + url);
                  // this.logInfo(url, http.status, http.statusText);
                  if (this.responseType === "audiobuffer") {
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
                          // this.log.error(
                          //   "xhr (" +
                          //     this.method +
                          //     ":" +
                          //     url +
                          //     ") failed with decodeAudioData error : " +
                          //     error.message
                          // );
                          audioContext.close();
                          observer.error({
                            status: error.name,
                            statusText: error.message
                          });
                          observer.complete();
                        }
                      );
                    } else {
                      // this.log.error(
                      //   "xhr (" +
                      //     this.method +
                      //     ":" +
                      //     url +
                      //     ") failed with error : " +
                      //     "Web Audio API is not supported by your browser."
                      // );
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
                  // this.logError(url, http.status, http.statusText);
                  observer.error({
                    status: http.status,
                    statusText: http.statusText
                  });
                  observer.complete();
                }
              } else {
                // this.logError(url, http.status, http.statusText);
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
                // this.log.time("xhr " + url);
                // this.logInfo(url, http.status, http.statusText);
                observer.next(http.responseText);
                observer.complete();
              } else {
                // this.logError(url, http.status, http.statusText);
                observer.error({
                  status: http.status,
                  statusText: http.statusText
                });
                observer.complete();
              }
            }
          };
      }

      if (isObject(this.data)) {
        this.data = JSON.stringify(this.data);
      }

      http.send(<SendDataType>this.data || null);
      // this.log.time("xhr " + url);
      // this.log.info("xhr (" + this.method + ":" + url + ")" + "sent");
    });
  }

  private setRequestHeaders(http: XMLHttpRequest): void {
    for (const property in this.headers) {
      if (this.headers.hasOwnProperty(property)) {
        http.setRequestHeader(property, <string>this.headers[property]);
      }
    }
  }

  // private static getMockupData(): Observable<ResponseDataType> {
  //   return new Observable(observer => {
  //     setTimeout(() => {
  //       if (this.mockup.data) {
  //         observer.next(this.mockup.data);
  //         observer.complete();
  //       } else {
  //         observer.error(null);
  //       }
  //     }, this.mockup.delay);
  //   });
  // }

  // private logInfo(url: string, status: number, statusText: string): void {
  //   this.log.info(
  //     "xhr (" +
  //       this.method +
  //       ":" +
  //       url +
  //       ") done with status " +
  //       status +
  //       " " +
  //       statusText
  //   );
  // }

  // private logError(url: string, status: number, statusText: string): void {
  //   this.log.error(
  //     "xhr (" +
  //       this.method +
  //       ":" +
  //       url +
  //       ") failed with status " +
  //       status +
  //       " " +
  //       statusText
  //   );
  // }
}
