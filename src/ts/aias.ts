
import { Is } from '@lcluber/chjs';
import { Logger } from '@lcluber/mouettejs';
import { HTTPHeaderFields } from './httpheaderfields';

export type HTTPRequestMethods = 'GET'|'HEAD'|'POST'|'PUT'|'DELETE'|'CONNECT'|'OPTIONS'|'TRACE'|'PATCH';

export class HTTP {

  // static url: string;
  // static method: HTTPRequestMethods;
  static async: boolean = true;
  static noCache: boolean = false;
  static headers: HTTPHeaderFields = {
    'Content-Type': 'application/json'//'application/x-www-form-urlencoded'
  };

  public static get( url: string ): Promise<string> {
    return this.call('GET', url);
  }

  public static head( url: string ): Promise<string> {
    return this.call('HEAD', url);
  }

  public static post( url: string, data: string|Document|Blob|ArrayBufferView|ArrayBuffer|FormData|URLSearchParams|ReadableStream ): Promise<string> {
    return this.call('POST', url, data);
  }

  public static put( url: string, data: string|Document|Blob|ArrayBufferView|ArrayBuffer|FormData|URLSearchParams|ReadableStream ): Promise<string> {
    return this.call('PUT', url, data);
  }

  public static delete( url: string ): Promise<string> {
    return this.call('DELETE', url);
  }

  public static connect( url: string ): Promise<string> {
    return this.call('CONNECT', url);
  }

  public static options( url: string ): Promise<string> {
    return this.call('OPTIONS', url);
  }

  public static trace( url: string ): Promise<string> {
    return this.call('TRACE', url);
  }

  public static patch( url: string, data: string|Document|Blob|ArrayBufferView|ArrayBuffer|FormData|URLSearchParams|ReadableStream ): Promise<string> {
    return this.call('PATCH', url, data);
  }

  public static setHeaders(headers: HTTPHeaderFields): void {
    for(const property in headers){
      if (headers.hasOwnProperty(property)) {
        this.headers[property] = headers[property];
      }
    }
  }

  private static call( method: HTTPRequestMethods, url: string, data?: string|Document|Blob|ArrayBufferView|ArrayBuffer|FormData|URLSearchParams|ReadableStream ): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {

      let http = new XMLHttpRequest();

      if(this.noCache) {
        url += '?cache=' + (new Date()).getTime();
      }

      http.open(method, url, this.async);

      for (let property in this.headers) {
        if (this.headers.hasOwnProperty(property)) {
          http.setRequestHeader(property, this.headers[property]);
        }
      }

      http.onreadystatechange = () => {
        if(http.readyState == 4) {
          if(http.status == 200) {
            Logger.info('xhr done successfully ('+url+')');
            resolve(http.responseText);
          } else {
            Logger.error('xhr failed ('+url+')');
            reject(http.status);
          }
        }
      };
      Logger.info('xhr processing starting ('+url+')');
      if (data == undefined){
        http.send();
        return;
      }
      //
      // let contentType = 'application/json';
      // if (Check.isString(data)) {
      //   contentType = 'application/x-www-form-urlencoded';
      if (Is.object(data)) {
        data = JSON.stringify(data);
      }
      // http.setRequestHeader('Content-Type', contentType);
      http.send(data);
    });
  }

}
