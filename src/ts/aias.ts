import { Logger, Group, LevelName } from "@lcluber/mouettejs";
import { Method } from "./method";
import { DataType, ResponseDataType, ResponseType, EventType } from "./types";
import { Observable } from "rxjs";

export class HTTP {
  private static log: Group = Logger.addGroup("Aias");
  private static mockupData: ResponseDataType = null;
  private static eventType: EventType = "promise";

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

  public static getMockupData():
    | Promise<ResponseDataType>
    | Observable<ResponseDataType> {
    switch (this.eventType) {
      case "observable":
        return new Observable(observer => {
          if (this.mockupData) {
            observer.next(this.mockupData);
            observer.complete();
          } else {
            observer.error(null);
          }
        });
        break;
      default:
        return new Promise((resolve: Function, reject: Function) => {
          this.mockupData ? resolve(this.mockupData) : reject(null);
        });
    }
  }

  public static setMockupData(mockupData: ResponseDataType): void {
    this.mockupData = mockupData;
  }

  public static get: Method = new Method("GET", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  public static head: Method = new Method("HEAD", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  public static post: Method = new Method("POST", {
    "Content-Type": "application/json"
  });
  public static put: Method = new Method("PUT", {
    "Content-Type": "application/json"
  });
  public static delete: Method = new Method("DELETE", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  public static connect: Method = new Method("CONNECT", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  public static options: Method = new Method("OPTIONS", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  public static trace: Method = new Method("TRACE", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  public static patch: Method = new Method("PATCH", {
    "Content-Type": "application/json"
  });

  public static GET(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockupData
      ? this.getMockupData()
      : this.get.call(url, responseType, this.eventType);
  }

  public static HEAD(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockupData
      ? this.getMockupData()
      : this.head.call(url, responseType, this.eventType);
  }

  public static POST(
    url: string,
    responseType: ResponseType,
    data: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockupData
      ? this.getMockupData()
      : this.post.call(url, responseType, this.eventType, data);
  }

  public static PUT(
    url: string,
    responseType: ResponseType,
    data: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockupData
      ? this.getMockupData()
      : this.put.call(url, responseType, this.eventType, data);
  }

  public static DELETE(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockupData
      ? this.getMockupData()
      : this.delete.call(url, responseType, this.eventType);
  }

  public static CONNECT(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockupData
      ? this.getMockupData()
      : this.connect.call(url, responseType, this.eventType);
  }

  public static OPTIONS(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockupData
      ? this.getMockupData()
      : this.options.call(url, responseType, this.eventType);
  }

  public static TRACE(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockupData
      ? this.getMockupData()
      : this.trace.call(url, responseType, this.eventType);
  }

  public static PATCH(
    url: string,
    responseType: ResponseType,
    data: DataType
  ): Promise<ResponseDataType> | Observable<ResponseDataType> {
    return this.mockupData
      ? this.getMockupData()
      : this.patch.call(url, responseType, this.eventType, data);
  }
}
