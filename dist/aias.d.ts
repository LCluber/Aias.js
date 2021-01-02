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
 * The above copyright notice and this permission notice (including the next
 * paragraph) shall be included in all copies or substantial portions of the
 * Software.
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


import { Observable } from "rxjs";

export declare class HTTP {
    static setHeaders(method: HTTPRequestMethod, headers: HTTPHeaders): void;
    static observable: {
        get: (url: string, responseType: ResponseType) => Observable<ResponseDataType>;
        head: (url: string, responseType: ResponseType) => Observable<ResponseDataType>;
        post: (url: string, responseType: ResponseType, data?: DataType) => Observable<ResponseDataType>;
        put: (url: string, responseType: ResponseType, data?: DataType) => Observable<ResponseDataType>;
        delete: (url: string, responseType: ResponseType) => Observable<ResponseDataType>;
        connect: (url: string, responseType: ResponseType) => Observable<ResponseDataType>;
        options: (url: string, responseType: ResponseType) => Observable<ResponseDataType>;
        trace: (url: string, responseType: ResponseType) => Observable<ResponseDataType>;
        patch: (url: string, responseType: ResponseType, data?: DataType) => Observable<ResponseDataType>;
    };
    static promise: {
        get: (url: string, responseType: ResponseType) => Promise<ResponseDataType>;
        head: (url: string, responseType: ResponseType) => Promise<ResponseDataType>;
        post: (url: string, responseType: ResponseType, data?: DataType) => Promise<ResponseDataType>;
        put: (url: string, responseType: ResponseType, data?: DataType) => Promise<ResponseDataType>;
        delete: (url: string, responseType: ResponseType) => Promise<ResponseDataType>;
        connect: (url: string, responseType: ResponseType) => Promise<ResponseDataType>;
        options: (url: string, responseType: ResponseType) => Promise<ResponseDataType>;
        trace: (url: string, responseType: ResponseType) => Promise<ResponseDataType>;
        patch: (url: string, responseType: ResponseType, data?: DataType) => Promise<ResponseDataType>;
    };
}
export declare function getAudioContext(): {
    new (contextOptions?: AudioContextOptions | undefined): AudioContext;
    prototype: AudioContext;
} | false;

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
    "A-IM"?: string | false;
    Accept?: string | false;
    "Accept-Charset"?: string | false;
    "Accept-Encoding"?: string | false;
    "Accept-Language"?: string | false;
    "Accept-Datetime"?: string | false;
    "Access-Control-Request-Method"?: string | false;
    "Access-Control-Request-Headers"?: string | false;
    Authorization?: string | false;
    "Cache-Control"?: string | false;
    Connection?: string | false;
    "Content-Length"?: number | false;
    "Content-MD5"?: string | false;
    "Content-Type"?: string | false;
    Cookie?: string | false;
    Date?: string | false;
    Expect?: string | false;
    Forwarded?: string | false;
    From?: string | false;
    Host?: string | false;
    "HTTP2-Settings"?: string | false;
    "If-Match"?: string | false;
    "If-Modified-Since"?: string | false;
    "If-None-Match"?: string | false;
    "If-Range"?: string | false;
    "If-Unmodified-Since"?: string | false;
    "Max-Forwards"?: string | false;
    Origin?: string | false;
    Pragma?: string | false;
    "Proxy-Authorization"?: string | false;
    Range?: string | false;
    Referer?: string | false;
    TE?: string | false;
    "User-Agent"?: string | false;
    Upgrade?: string | false;
    Via?: string | false;
    Warning?: string | false;
    [key: string]: string | number | false | undefined;
}

export declare const METHODS: Methods;

export declare class observable {
    private method;
    private url;
    private responseType;
    private async;
    private noCache;
    private headers;
    private data;
    constructor(method: HTTPRequestMethod, url: string, responseType: ResponseType, data: DataType);
    call(): Observable<ResponseDataType>;
    private setRequestHeaders;
}


export declare class promise {
    private method;
    private url;
    private responseType;
    private async;
    private noCache;
    private headers;
    private data;
    constructor(method: HTTPRequestMethod, url: string, responseType: ResponseType, data: DataType);
    call(): Promise<ResponseDataType>;
    private setRequestHeaders;
}
export declare type HTTPRequestMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";
export declare type SendDataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | URLSearchParams | ReadableStream | null;
export declare type DataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | URLSearchParams | ReadableStream | Object | null | undefined;
export declare type ResponseDataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | AudioBuffer | URLSearchParams | ReadableStream | Object | null;
export declare type ResponseType = "arraybuffer" | "audiobuffer" | "blob" | "document" | "json" | "text" | "";
