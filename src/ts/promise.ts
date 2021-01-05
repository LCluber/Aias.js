import { isObject } from "@lcluber/chjs";
import { getAudioContext } from "./audio";
import { request } from "./request";
import { HTTPHeaders, Methods } from "./interfaces";
import {
  DataType,
  SendDataType,
  ResponseDataType,
  ResponseType
} from "./types";
import Promise from "promise-polyfill";

const AudioContext = getAudioContext();

export class promise extends request {
 
  constructor(
    method: keyof Methods,
    url: string,
    responseType: ResponseType,
    data: DataType,
    headers?: HTTPHeaders
  ) {
    super(method, url, responseType, data, headers);
  }

  public call(): Promise<ResponseDataType> {
    return new Promise((resolve: Function, reject: Function) => {
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
                          resolve(buffer);
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
                          reject({
                            status: error.name,
                            statusText: error.message
                          });
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
                  // this.logError(url, http.status, http.statusText);
                  reject({
                    status: http.status,
                    statusText: http.statusText
                  });
                }
              } else {
                // this.logError(url, http.status, http.statusText);
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
                // this.log.time("xhr " + url);
                // this.logInfo(url, http.status, http.statusText);
                resolve(http.responseText);
              } else {
                // this.logError(url, http.status, http.statusText);
                reject({
                  status: http.status,
                  statusText: http.statusText
                });
              }
            }
          };
      }

      if (isObject(this.data)) {
        this.data = JSON.stringify(this.data);
      }

      // this.log.time("xhr " + url);
      http.send(<SendDataType>this.data || null);
      // this.log.info("xhr (" + this.method + ":" + url + ")" + "sent");
    });
  }

}
