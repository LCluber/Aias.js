
import { Is } from '@lcluber/chjs';
import { Logger } from '@lcluber/mouettejs';
import { HTTPHeaders } from './httpheaders';

export type HTTPRequestMethods = 'GET'|'HEAD'|'POST'|'PUT'|'DELETE'|'CONNECT'|'OPTIONS'|'TRACE'|'PATCH';
export type dataTypes = string|Document|Blob|BufferSource|FormData|ArrayBufferView|ArrayBuffer|FormData|URLSearchParams|ReadableStream|null;

export class HTTP {

  // static url: string;
  // static method: HTTPRequestMethods;
  static async: boolean = true;
  static noCache: boolean = false;
  static base64: boolean = false;
  static headers: HTTPHeaders = {
    //'Content-Type': 'application/x-www-form-urlencoded'//'application/json'
  };

  public static get( url: string ): Promise<string> {
    return this.call('GET', url);
  }

  public static head( url: string ): Promise<string> {
    return this.call('HEAD', url);
  }

  public static post( url: string, data: dataTypes ): Promise<string> {
    return this.call('POST', url, data);
  }

  public static put( url: string, data: dataTypes ): Promise<string> {
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

  public static patch( url: string, data: dataTypes ): Promise<string> {
    return this.call('PATCH', url, data);
  }

  public static setHeader(headers: HTTPHeaders): void {
    for(const property in headers){
      if (headers.hasOwnProperty(property)) {
        this.headers[property] = headers[property];
      }
    }
  }

  private static call( method: HTTPRequestMethods, url: string, data?: dataTypes): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {

      let msg = ['Aias xhr ', ' ('+ method +':' + url + ')'];
      let http = new XMLHttpRequest();
      
      url += this.noCache ? '?cache=' + (new Date()).getTime() : '';

      http.open(method, url, this.async);
      
      this.setRequestHeaders(http);

      http.onreadystatechange = () => {
        if(http.readyState == 4) {
          if(http.status == 200) {
            Logger.info(msg[0] + 'successful' + msg[1]);
            resolve(http.responseText);
          } else {
            Logger.error(msg[0] + 'failed' + msg[1]);
            reject(http.status);
          }
        }
      };

      if (Is.object(data)) {
        data = JSON.stringify(data);
      }

      http.send(data || null);
      Logger.info(msg[0] + 'sent' + msg[1]);

    });
  }
  
  private static setRequestHeaders(http: XMLHttpRequest): void {
    for (let property in this.headers) {
      if (this.headers.hasOwnProperty(property)) {
        http.setRequestHeader(property, this.headers[property]);
      }
    }
  }
  
}
