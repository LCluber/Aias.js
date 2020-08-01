/** MIT License
* 
* Copyright (c) 2010 Ludovic CLUBER 
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* https://github.com/LCluber/Aias.js
*/

import { LevelName } from "@lcluber/mouettejs";
import { Observable } from "rxjs";

export declare class HTTP {
    private static log;
    private static eventType;
    private static mockup;
    static setEventType(eventType: EventType): void;
    static setLogLevel(name: LevelName): LevelName;
    static getLogLevel(): LevelName;
    static setHeaders(method: HTTPRequestMethod, headers: HTTPHeaders): void;
    static setMockup(mockup: Partial<Mockup>): Mockup;
    private static getMockupData;
    static get(url: string, responseType: ResponseType): Promise<ResponseDataType> | Observable<ResponseDataType>;
    static head(url: string, responseType: ResponseType): Promise<ResponseDataType> | Observable<ResponseDataType>;
    static post(url: string, responseType: ResponseType, data?: DataType): Promise<ResponseDataType> | Observable<ResponseDataType>;
    static put(url: string, responseType: ResponseType, data?: DataType): Promise<ResponseDataType> | Observable<ResponseDataType>;
    static delete(url: string, responseType: ResponseType): Promise<ResponseDataType> | Observable<ResponseDataType>;
    static connect(url: string, responseType: ResponseType): Promise<ResponseDataType> | Observable<ResponseDataType>;
    static options(url: string, responseType: ResponseType): Promise<ResponseDataType> | Observable<ResponseDataType>;
    static trace(url: string, responseType: ResponseType): Promise<ResponseDataType> | Observable<ResponseDataType>;
    static patch(url: string, responseType: ResponseType, data?: DataType): Promise<ResponseDataType> | Observable<ResponseDataType>;
    private static request;
    private static promiseTimeout;
    private static isOfTypeEventType;
}

export interface Mockup {
    data: ResponseDataType;
    delay: number;
}
export interface Method {
    type: HTTPRequestMethod;
    defaultHeaders: HTTPHeaders;
    headers: HTTPHeaders;
    data: boolean;
}
export interface Methods {
    GET: Method;
    HEAD: Method;
    POST: Method;
    PUT: Method;
    DELETE: Method;
    CONNECT: Method;
    OPTIONS: Method;
    TRACE: Method;
    PATCH: Method;
}
export interface HTTPHeaders {
    "A-IM"?: string;
    Accept?: string;
    "Accept-Charset"?: string;
    "Accept-Encoding"?: string;
    "Accept-Language"?: string;
    "Accept-Datetime"?: string;
    "Access-Control-Request-Method"?: string;
    "Access-Control-Request-Headers"?: string;
    Authorization?: string;
    "Cache-Control"?: string;
    Connection?: string;
    "Content-Length"?: number;
    "Content-MD5"?: string;
    "Content-Type"?: string;
    Cookie?: string;
    Date?: string;
    Expect?: string;
    Forwarded?: string;
    From?: string;
    Host?: string;
    "HTTP2-Settings"?: string;
    "If-Match"?: string;
    "If-Modified-Since"?: string;
    "If-None-Match"?: string;
    "If-Range"?: string;
    "If-Unmodified-Since"?: string;
    "Max-Forwards"?: string;
    Origin?: string;
    Pragma?: string;
    "Proxy-Authorization"?: string;
    Range?: string;
    Referer?: string;
    TE?: string;
    "User-Agent"?: string;
    Upgrade?: string;
    Via?: string;
    Warning?: string;
    [key: string]: string | number | undefined;
}

export declare const METHODS: Methods;

export declare class Request {
    private method;
    private url;
    private responseType;
    private async;
    private noCache;
    private headers;
    private eventType;
    private data;
    private log;
    constructor(method: HTTPRequestMethod, url: string, responseType: ResponseType, headers: HTTPHeaders, eventType: EventType, data: DataType);
    call(): Promise<ResponseDataType> | Observable<ResponseDataType>;
    private usePromise;
    private useObservable;
    private setRequestHeaders;
    private logInfo;
    private logError;
}
export declare type HTTPRequestMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
export declare type EventType = "promise" | "observable";
export declare type SendDataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | URLSearchParams | ReadableStream | null;
export declare type DataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | URLSearchParams | ReadableStream | Object | null;
export declare type ResponseDataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | AudioBuffer | URLSearchParams | ReadableStream | Object | null;
export declare type ResponseType = "arraybuffer" | "audiobuffer" | "blob" | "document" | "json" | "text" | "";
