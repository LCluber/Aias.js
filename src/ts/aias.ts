import { Logger, Group, LevelName } from "@lcluber/mouettejs";
import { Method } from "./method";
import { DataType, ResponseDataType, ResponseType } from "./types";

export class HTTP {
  private static log: Group = Logger.addGroup("Aias");

  public static setLogLevel(name: LevelName): LevelName {
    return this.log.setLevel(name);
  }

  public static getLogLevel(): LevelName {
    return this.log.getLevel();
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
  ): Promise<ResponseDataType> {
    return this.get.call(url, responseType);
  }

  public static HEAD(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> {
    return this.head.call(url, responseType);
  }

  public static POST(
    url: string,
    responseType: ResponseType,
    data: DataType
  ): Promise<ResponseDataType> {
    return this.post.call(url, responseType, data);
  }

  public static PUT(
    url: string,
    responseType: ResponseType,
    data: DataType
  ): Promise<ResponseDataType> {
    return this.put.call(url, responseType, data);
  }

  public static DELETE(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> {
    return this.delete.call(url, responseType);
  }

  public static CONNECT(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> {
    return this.connect.call(url, responseType);
  }

  public static OPTIONS(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> {
    return this.options.call(url, responseType);
  }

  public static TRACE(
    url: string,
    responseType: ResponseType
  ): Promise<ResponseDataType> {
    return this.trace.call(url, responseType);
  }

  public static PATCH(
    url: string,
    responseType: ResponseType,
    data: DataType
  ): Promise<ResponseDataType> {
    return this.patch.call(url, responseType, data);
  }
}
