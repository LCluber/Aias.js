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
    static setHeaders(method: keyof Methods, headers: HTTPHeaders): void;
    static observable: {
        get: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Observable<ResponseDataType>;
        head: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Observable<ResponseDataType>;
        post: (url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined) => Observable<ResponseDataType>;
        put: (url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined) => Observable<ResponseDataType>;
        delete: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Observable<ResponseDataType>;
        connect: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Observable<ResponseDataType>;
        options: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Observable<ResponseDataType>;
        trace: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Observable<ResponseDataType>;
        patch: (url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined) => Observable<ResponseDataType>;
    };
    static promise: {
        get: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Promise<ResponseDataType>;
        head: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Promise<ResponseDataType>;
        post: (url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined) => Promise<ResponseDataType>;
        put: (url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined) => Promise<ResponseDataType>;
        delete: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Promise<ResponseDataType>;
        connect: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Promise<ResponseDataType>;
        options: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Promise<ResponseDataType>;
        trace: (url: string, responseType: ResponseType, headers?: HTTPHeaders | undefined) => Promise<ResponseDataType>;
        patch: (url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders | undefined) => Promise<ResponseDataType>;
    };
}
export declare function getAudioContext(): {
    new (contextOptions?: AudioContextOptions | undefined): AudioContext;
    prototype: AudioContext;
} | false;
export interface Method {
    type: keyof Methods;
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
    "A-IM"?: string | false | null;
    Accept?: string | false | null;
    "Accept-Charset"?: string | false | null;
    "Accept-Encoding"?: string | false | null;
    "Accept-Language"?: string | false | null;
    "Accept-Datetime"?: string | false | null;
    "Access-Control-Request-Method"?: string | false | null;
    "Access-Control-Request-Headers"?: string | false | null;
    Authorization?: string | false | null;
    "Cache-Control"?: string | false | null;
    Connection?: string | false | null;
    "Content-Length"?: number | false | null;
    "Content-MD5"?: string | false | null;
    "Content-Type"?: string | false | null;
    Cookie?: string | false | null;
    Date?: string | false | null;
    Expect?: string | false | null;
    Forwarded?: string | false | null;
    From?: string | false | null;
    Host?: string | false | null;
    "HTTP2-Settings"?: string | false | null;
    "If-Match"?: string | false | null;
    "If-Modified-Since"?: string | false | null;
    "If-None-Match"?: string | false | null;
    "If-Range"?: string | false | null;
    "If-Unmodified-Since"?: string | false | null;
    "Max-Forwards"?: string | false | null;
    Origin?: string | false | null;
    Pragma?: string | false | null;
    "Proxy-Authorization"?: string | false | null;
    Range?: string | false | null;
    Referer?: string | false | null;
    TE?: string | false | null;
    "User-Agent"?: string | false | null;
    Upgrade?: string | false | null;
    Via?: string | false | null;
    Warning?: string | false | null;
    [key: string]: string | number | false | null | undefined;
}

export declare const METHODS: Methods;



export declare class observable extends request {
    constructor(method: keyof Methods, url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders);
    call(): Observable<ResponseDataType>;
}




export declare class promise extends request {
    constructor(method: keyof Methods, url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders);
    call(): Promise<ResponseDataType>;
}


export declare class request {
    protected method: keyof Methods;
    protected url: string;
    protected responseType: ResponseType;
    protected async: boolean;
    protected noCache: boolean;
    protected headers: HTTPHeaders | undefined;
    protected data: DataType;
    constructor(method: keyof Methods, url: string, responseType: ResponseType, data: DataType, headers?: HTTPHeaders);
    protected setRequestHeaders(http: XMLHttpRequest): void;
}
export declare type SendDataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | URLSearchParams | ReadableStream | null;
export declare type DataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | URLSearchParams | ReadableStream | Object | null;
export declare type ResponseDataType = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | AudioBuffer | URLSearchParams | ReadableStream | Object | null;
export declare type ResponseType = "arraybuffer" | "audiobuffer" | "blob" | "document" | "json" | "text" | "";
