// import { Logger, Group, LevelName } from "@lcluber/mouettejs";
import { promise } from "./promise";
import { observable } from "./observable";
import {
  DataType,
  ResponseDataType,
  ResponseType,
} from "./types";
import { HTTPHeaders, Methods } from "./interfaces";
import { Observable } from "rxjs";
import { METHODS } from "./methods";
import "polyfill-array-includes";

export class HTTP {
  // private static log: Group = Logger.addGroup("Aias");
  // private static mockup: Mockup = {
  //   data: null,
  //   delay: 200
  // };

  // public static setLogLevel(name: LevelName): LevelName {
  //   return this.log.setLevel(name);
  // }

  // public static getLogLevel(): LevelName {
  //   return this.log.getLevel();
  // }

  public static setHeaders(method: keyof Methods, headers: HTTPHeaders) {
    if (METHODS.hasOwnProperty(method)) {
      for (const property in headers) {
        if (headers.hasOwnProperty(property)) {
          if (headers[property] !== null && headers[property] !== false) {
            METHODS[method].headers[property] = headers[property];
          } else {
            delete METHODS[method].headers[property];
          }
        }
      }
    }
  }

  // public static setMockup(mockup: Partial<Mockup>): Mockup {
  //   this.mockup.data = mockup.data ?? this.mockup.data;
  //   this.mockup.delay = mockup.delay ?? this.mockup.delay;
  //   return this.mockup;
  // }

  public static observable = {
    get: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Observable<ResponseDataType> {
      return new observable(
        METHODS.GET.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    head: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Observable<ResponseDataType> {
      return new observable(
        METHODS.HEAD.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    post: function(
      url: string,
      responseType: ResponseType,
      data: DataType,
      headers?: HTTPHeaders
    ): Observable<ResponseDataType> {
      return new observable(
        METHODS.POST.type,
        url,
        responseType,
        data,
        headers
      ).call();
    },
    put: function (
      url: string,
      responseType: ResponseType,
      data: DataType,
      headers?: HTTPHeaders
    ): Observable<ResponseDataType> {
      return new observable(
        METHODS.PUT.type,
        url,
        responseType,
        data,
        headers
      ).call();
    },
    delete: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Observable<ResponseDataType> {
      return new observable(
        METHODS.DELETE.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    connect: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Observable<ResponseDataType> {
      return new observable(
        METHODS.CONNECT.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    options: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Observable<ResponseDataType> {
      return new observable(
        METHODS.OPTIONS.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    trace: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Observable<ResponseDataType> {
      return new observable(
        METHODS.TRACE.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    patch: function(
      url: string,
      responseType: ResponseType,
      data: DataType,
      headers?: HTTPHeaders
    ): Observable<ResponseDataType> {
      return new observable(
        METHODS.PATCH.type,
        url,
        responseType,
        data,
        headers
      ).call();
    }
  }

  public static promise = {
    get: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Promise<ResponseDataType> {
      return new promise(
        METHODS.GET.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    head: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Promise<ResponseDataType> {
      return new promise(
        METHODS.HEAD.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    post: function(
      url: string,
      responseType: ResponseType,
      data: DataType,
      headers?: HTTPHeaders
    ): Promise<ResponseDataType> {
      return new promise(
        METHODS.POST.type,
        url,
        responseType,
        data,
        headers
      ).call();
    },
    put: function(
      url: string,
      responseType: ResponseType,
      data: DataType,
      headers?: HTTPHeaders
    ): Promise<ResponseDataType> {
      return new promise(
        METHODS.PUT.type,
        url,
        responseType,
        data,
        headers
      ).call();
    },
    delete: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Promise<ResponseDataType> {
      return new promise(
        METHODS.DELETE.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    connect: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Promise<ResponseDataType> {
      return new promise(
        METHODS.CONNECT.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    options: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Promise<ResponseDataType> {
      return new promise(
        METHODS.OPTIONS.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    trace: function(
      url: string,
      responseType: ResponseType,
      headers?: HTTPHeaders
    ): Promise<ResponseDataType> {
      return new promise(
        METHODS.TRACE.type,
        url,
        responseType,
        null,
        headers
      ).call();
    },
    patch: function (
      url: string,
      responseType: ResponseType,
      data: DataType,
      headers?: HTTPHeaders
    ): Promise<ResponseDataType> {
      return new promise(
        METHODS.PATCH.type,
        url,
        responseType,
        data,
        headers
      ).call();
    }
  }

}
