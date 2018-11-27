//import {Promise} from 'es6-promise'
//import * as Rx from 'rxjs/Rx'
// import {Observable} from 'rxjs';
// import {ajax, AjaxResponse} from 'rxjs/ajax';
export type HTTPRequestMethods = 'GET'|'HEAD'|'POST'|'PUT'|'DELETE'|'CONNECT'|'OPTIONS'|'TRACE'|'PATCH';

export class HTTP {

  // static url: string;
  // static method: HTTPRequestMethods;
  static async: boolean = true;
  static noCache: boolean = false;
  
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
  
  public static post( url: string ): Promise<string> {
    return this.call('POST', url);
  }
  
  public static put( url: string ): Promise<string> {
    return this.call('PUT', url);
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
  
  public static patch( url: string ): Promise<string> {
    return this.call('PATCH', url);
  }
  
  private static call( method: HTTPRequestMethods, url: string ): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {

      let http = new XMLHttpRequest();

      if(this.noCache) {
        url += '?cache=' + (new Date()).getTime();
      }

      http.open(method, url, this.async);
      http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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
      http.send();
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
