import { Logger, Group, LevelName } from "@lcluber/mouettejs";
import { Request } from "./request";
import {
  DataType,
  ResponseDataType,
  ResponseType,
  EventType,
  HTTPRequestMethod
} from "./types";
import { Mockup } from "./interfaces";
import { Observable } from "rxjs";
import { HTTPHeaders } from "./httpheaders";
import { METHODS } from "./methods";

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

  private static isOfTypeEventType(eventType: string): eventType is EventType {
    return ["promise", "observable"].includes(eventType);
  }

  public static setLogLevel(name: LevelName): LevelName {
    return this.log.setLevel(name);
  }

  public static getLogLevel(): LevelName {
    return this.log.getLevel();
  }

  // public setHeaders(method: HTTPRequestMethod, headers: HTTPHeaders) {
  //   if (METHODS.hasOwnProperty(method)) {
  //     for (const property in headers) {
  //       if (headers.hasOwnProperty(property) && HTTPHeaders.hasOwnProperty(property)) {
  //         METHODS[method].headers[property] = headers[property];
  //       }
  //     }
  //   }
  // }

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

  private static promiseTimeout(): Promise<void> {
    return new Promise((resolve: Function) =>
      setTimeout(resolve, this.mockup.delay)
    );
  }

  private static request(
    type: HTTPRequestMethod,
    url: string,
    responseType: ResponseType,
    headers: HTTPHeaders,
    eventType?: EventType,
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
        eventType || this.eventType,
        data || null
      );
      return request.call();
    }
  }

  public static get(
    url: string,
    responseType: ResponseType,
    eventType?: EventType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      METHODS.GET.type,
      url,
      responseType,
      METHODS.GET.headers || METHODS.GET.defaultHeaders,
      eventType,
      null
    );
  }

  public static head(
    url: string,
    responseType: ResponseType,
    eventType?: EventType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.request(
      "HEAD",
      url,
      responseType,
      { "Content-Type": "application/x-www-form-urlencoded" },
      eventType
    );
  }

  public static post(
    url: string,
    responseType: ResponseType,
    eventType?: EventType,
    data: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockup.data
      ? this.getMockupData()
      : this.post.call(url, responseType, this.eventType, data);
  }

  public static put(
    url: string,
    responseType: ResponseType,
    eventType?: EventType,
    data: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockup.data
      ? this.getMockupData()
      : this.put.call(url, responseType, this.eventType, data);
  }

  public static delete(
    url: string,
    responseType: ResponseType,
    eventType?: EventType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockup.data
      ? this.getMockupData()
      : this.delete.call(url, responseType, this.eventType);
  }

  public static connect(
    url: string,
    responseType: ResponseType,
    eventType?: EventType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockup.data
      ? this.getMockupData()
      : this.connect.call(url, responseType, this.eventType);
  }

  public static options(
    url: string,
    responseType: ResponseType,
    eventType?: EventType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockup.data
      ? this.getMockupData()
      : this.options.call(url, responseType, this.eventType);
  }

  public static trace(
    url: string,
    responseType: ResponseType,
    eventType?: EventType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockup.data
      ? this.getMockupData()
      : this.trace.call(url, responseType, this.eventType);
  }

  public static patch(
    url: string,
    responseType: ResponseType,
    eventType?: EventType,
    data: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockup.data
      ? this.getMockupData()
      : this.patch.call(url, responseType, this.eventType, data);
  }
}
