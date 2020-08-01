import { Logger, Group, LevelName } from "@lcluber/mouettejs";
import { Request } from "./request";
import {
  DataType,
  ResponseDataType,
  ResponseType,
  EventType,
  HTTPRequestMethod
} from "./types";
import { Mockup, HTTPHeaders } from "./interfaces";
import { Observable } from "rxjs";
import { METHODS } from "./methods";
import Promise from "promise-polyfill";
import "polyfill-array-includes";

export class HTTP {
  private static log: Group = Logger.addGroup("Aias");
  private static eventType: EventType = "promise";
  private static mockup: Mockup = {
    data: null,
    delay: 200
  };

  public static setEventType(eventType: EventType): void {
    this.eventType = this.isOfTypeEventType(eventType) ? eventType : "promise";
  }

  public static setLogLevel(name: LevelName): LevelName {
    return this.log.setLevel(name);
  }

  public static getLogLevel(): LevelName {
    return this.log.getLevel();
  }

  public static setHeaders(method: HTTPRequestMethod, headers: HTTPHeaders) {
    if (METHODS.hasOwnProperty(method)) {
      for (const property in headers) {
        if (headers.hasOwnProperty(property)) {
          METHODS[method].headers[property] = headers[property];
        }
      }
    }
  }

  public static setMockup(mockup: Partial<Mockup>): Mockup {
    this.mockup.data = mockup.data ?? this.mockup.data;
    this.mockup.delay = mockup.delay ?? this.mockup.delay;
    return this.mockup;
  }

  private static getMockupData():
    | Promise<ResponseDataType>
    | Observable<ResponseDataType> {
    switch (this.eventType) {
      case "observable":
        return new Observable(observer => {
          setTimeout(() => {
            if (this.mockup.data) {
              observer.next(this.mockup.data);
              observer.complete();
            } else {
              observer.error(null);
            }
          }, this.mockup.delay);
        });
        break;
      default:
        return this.promiseTimeout().then(() => {
          return new Promise((resolve: Function, reject: Function) => {
            this.mockup.data ? resolve(this.mockup.data) : reject(null);
          });
        });
    }
  }

  public static get(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.GET.type,
      url,
      responseType,
      METHODS.GET.headers || METHODS.GET.defaultHeaders,
      null
    );
  }

  public static head(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.HEAD.type,
      url,
      responseType,
      METHODS.HEAD.headers || METHODS.HEAD.defaultHeaders,
      null
    );
  }

  public static post(
    url: string,
    responseType: ResponseType,
    data?: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.POST.type,
      url,
      responseType,
      METHODS.POST.headers || METHODS.POST.defaultHeaders,
      data
    );
  }

  public static put(
    url: string,
    responseType: ResponseType,
    data?: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.PUT.type,
      url,
      responseType,
      METHODS.PUT.headers || METHODS.PUT.defaultHeaders,
      data
    );
  }

  public static delete(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.DELETE.type,
      url,
      responseType,
      METHODS.DELETE.headers || METHODS.DELETE.defaultHeaders,
      null
    );
  }

  public static connect(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.CONNECT.type,
      url,
      responseType,
      METHODS.CONNECT.headers || METHODS.CONNECT.defaultHeaders,
      null
    );
  }

  public static options(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.OPTIONS.type,
      url,
      responseType,
      METHODS.OPTIONS.headers || METHODS.OPTIONS.defaultHeaders,
      null
    );
  }

  public static trace(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.TRACE.type,
      url,
      responseType,
      METHODS.TRACE.headers || METHODS.TRACE.defaultHeaders,
      null
    );
  }

  public static patch(
    url: string,
    responseType: ResponseType,
    data?: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.PATCH.type,
      url,
      responseType,
      METHODS.PATCH.headers || METHODS.PATCH.defaultHeaders,
      data
    );
  }

  private static request(
    type: HTTPRequestMethod,
    url: string,
    responseType: ResponseType,
    headers: HTTPHeaders,
    data?: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    if (this.mockup.data) {
      return this.getMockupData();
    } else {
      let request = new Request(
        type,
        url,
        responseType,
        headers,
        this.eventType,
        data || null
      );
      return request.call();
    }
  }

  private static promiseTimeout(): Promise<void> {
    return new Promise((resolve: Function) =>
      setTimeout(resolve, this.mockup.delay)
    );
  }

  private static isOfTypeEventType(eventType: string): eventType is EventType {
    return ["promise", "observable"].includes(eventType);
  }
}
