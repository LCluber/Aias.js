
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
    'Content-Type': 'application/x-www-form-urlencoded'//'application/json'
  };

  public static get( url: string, headers: HTTPHeaders ): Promise<string> {
    return this.call('GET', url, headers);
  }

  public static head( url: string, headers: HTTPHeaders ): Promise<string> {
    return this.call('HEAD', url, headers);
  }

  public static post( url: string, headers: HTTPHeaders, data: dataTypes ): Promise<string> {
    return this.call('POST', url, headers, data);
  }

  public static put( url: string, headers: HTTPHeaders, data: dataTypes ): Promise<string> {
    return this.call('PUT', url, headers, data);
  }

  public static delete( url: string, headers: HTTPHeaders ): Promise<string> {
    return this.call('DELETE', url, headers);
  }

  public static connect( url: string, headers: HTTPHeaders ): Promise<string> {
    return this.call('CONNECT', url, headers);
  }

  public static options( url: string, headers: HTTPHeaders ): Promise<string> {
    return this.call('OPTIONS', url, headers);
  }

  public static trace( url: string, headers: HTTPHeaders ): Promise<string> {
    return this.call('TRACE', url, headers);
  }

  public static patch( url: string, headers: HTTPHeaders, data: dataTypes ): Promise<string> {
    return this.call('PATCH', url, headers, data);
  }

  public static setHeaders(headers: HTTPHeaders): void {
    for(const property in headers){
      if (headers.hasOwnProperty(property)) {
        this.headers[property] = headers[property];
      }
    }
  }

  public static setBase64(boolean:boolean): void {
    this.base64 = boolean ? true : false;
  }

  private static call( method: HTTPRequestMethods, url: string,  headers?: HTTPHeaders, data?: dataTypes): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {

      let msg = ['Aias xhr ', ' ('+ method +':' + url + ')'];
      let http = new XMLHttpRequest();
      
      url += this.noCache ? '?cache=' + (new Date()).getTime() : '';

      http.open(method, url, this.async);
      
      if(headers) {
        this.setHeaders(headers);
      }
      
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
      
      if (data != undefined && data != null) {
        // Logger.info(msg[0] + 'processing data' + msg[1]);

        if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded' && Is.string(data)) {
          data = encodeURIComponent(<string>data);
        } else if (/*this.headers['Content-Type'] === 'application/json' && */Is.object(data)) {
          data = JSON.stringify(data);
        }
        
        if (Is.string(data) && this.base64) {
          data = btoa(<string>data);
        }
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
