//import {Promise} from 'es6-promise'
//import * as Rx from 'rxjs/Rx'
// import {Observable} from 'rxjs';
// import {ajax, AjaxResponse} from 'rxjs/ajax';
export type HTTPRequestMethods = 'GET'|'HEAD'|'POST'|'PUT'|'DELETE'|'CONNECT'|'OPTIONS'|'TRACE'|'PATCH';

export interface HTTPHeaderFields {
  'A-IM'?: string;
  Accept?: string;
  'Accept-Charset'?: string;
  'Accept-Encoding'?: string;
  'Accept-Language'?: string;
  'Accept-Datetime'?: string;
  'Access-Control-Request-Method'?: string;
  'Access-Control-Request-Headers'?: string;
  Authorization?: string;
  'Cache-Control'?: string;
  Connection?: string;
  'Content-Length'?: number;
  'Content-MD5'?: string;
  'Content-Type'?: string;
  Cookie?: string;
  Date?: string;
  Expect?: string;
  Forwarded?: string;
  From?: string;
  Host?: string;
  'HTTP2-Settings'?: string;
  'If-Match'?: string;
  'If-Modified-Since'?: string;
  'If-None-Match'?: string;
  'If-Range'?: string;
  'If-Unmodified-Since'?: string;
  'Max-Forwards'?: string;
  Origin?: string;
  Pragma?: string;
  'Proxy-Authorization'?: string;
  Range?: string;
  Referer?: string;
  TE?: string;
  'User-Agent'?: string;
  Upgrade?: string;
  Via?: string;
  Warning?: string;
}

export class HTTP {

  // static url: string;
  // static method: HTTPRequestMethods;
  static async: boolean = true;
  static noCache: boolean = false;
  static headers: HTTPHeaderFields = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  
//   static call(url: string): Observable<AjaxResponse> {
//     return ajax({
//   url: 'https://httpbin.org/post',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'x-rxjs-is': 'Awesome!'
//   },
//   body: {
//     hello: 'World!',
//   }
// }).map(e => e.response);
//   }
  public static get( url: string ): Promise<string> {
    return this.call('GET', url);
  }
  
  public static head( url: string ): Promise<string> {
    return this.call('HEAD', url);
  }
  
  public static post( url: string, data: string ): Promise<string> {
    return this.call('POST', url, data);
  }
  
  public static put( url: string, data: string ): Promise<string> {
    return this.call('PUT', url, data);
  }
  
  public static delete( url: string, data: string ): Promise<string> {
    return this.call('DELETE', url, data);
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
  
  public static patch( url: string ): Promise<string> {
    return this.call('PATCH', url);
  }
  
  public static setHeaders(headers: HTTPHeaderFields): void {
    for(const property in headers){
      if (headers.hasOwnProperty(property) && this.options.hasOwnProperty(property)) {
        this.headers[property] = headers[property];
      } 
    }
  }
  
  private static call( method: HTTPRequestMethods, url: string, data?:string ): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {

      let http = new XMLHttpRequest();

      if(this.noCache) {
        url += '?cache=' + (new Date()).getTime();
      }

      http.open(method, url, this.async);
      for (let property in this.headers) {
        if (this.headers.hasOwnProperty(property)){
          http.setRequestHeader(property, this.headers[property]);
        }
      }
      http.onreadystatechange = () => {
        if(http.readyState == 4) {
          if(http.status == 200) {
            console.log('xhr done successfully ('+url+')');
            resolve(http.responseText);
          } else {
            console.log('error', 'xhr failed ('+url+')');
            reject(http.status);
          }
        }
      };
      console.log('xhr processing starting ('+url+')');
      http.send(data);
    });
  }

}



// var xhr = new XMLHttpRequest();
//       xhr.open(methodType, url, true);
//       xhr.send();
//       xhr.onreadystatechange = function(){
//       if (xhr.readyState === 4){
//          if (xhr.status === 200){
//             console.log("xhr done successfully");
//             var resp = xhr.responseText;
//             var respJson = JSON.parse(resp);
//             resolve(respJson);
//          } else {
//             reject(xhr.status);
//             console.log("xhr failed");
//          }
//       } else {
//          console.log("xhr processing going on");
//       }
