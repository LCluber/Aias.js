import { Method } from "./method";
import { DataType } from "./types";

export class HTTP {
  private static get: Method = new Method("GET", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  private static head: Method = new Method("HEAD", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  private static post: Method = new Method("POST", {
    "Content-Type": "application/json"
  });
  private static put: Method = new Method("PUT", {
    "Content-Type": "application/json"
  });
  private static delete: Method = new Method("DELETE", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  private static connect: Method = new Method("CONNECT", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  private static options: Method = new Method("OPTIONS", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  private static trace: Method = new Method("TRACE", {
    "Content-Type": "application/x-www-form-urlencoded"
  });
  private static patch: Method = new Method("PATCH", {
    "Content-Type": "application/json"
  });

  public static GET(url: string): Promise<DataType> {
    return this.get.call(url);
  }

  public static HEAD(url: string): Promise<DataType> {
    return this.head.call(url);
  }

  public static POST(url: string, data: DataType | Object): Promise<DataType> {
    return this.post.call(url, data);
  }

  public static PUT(url: string, data: DataType | Object): Promise<DataType> {
    return this.put.call(url, data);
  }

  public static DELETE(url: string): Promise<DataType> {
    return this.delete.call(url);
  }

  public static CONNECT(url: string): Promise<DataType> {
    return this.connect.call(url);
  }

  public static OPTIONS(url: string): Promise<DataType> {
    return this.options.call(url);
  }

  public static TRACE(url: string): Promise<DataType> {
    return this.trace.call(url);
  }

  public static PATCH(url: string, data: DataType | Object): Promise<DataType> {
    return this.patch.call(url, data);
  }
}
