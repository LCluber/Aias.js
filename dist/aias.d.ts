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
* http://aiasjs.lcluber.com
*/


export declare class HTTP {
    private static async;
    private static noCache;
    private static responseType;
    private static headers;
    private static log;
    static get(url: string): Promise<DataTypes>;
    static head(url: string): Promise<DataTypes>;
    static post(url: string, data: DataTypes | Object): Promise<DataTypes>;
    static put(url: string, data: DataTypes | Object): Promise<DataTypes>;
    static delete(url: string): Promise<DataTypes>;
    static connect(url: string): Promise<DataTypes>;
    static options(url: string): Promise<DataTypes>;
    static trace(url: string): Promise<DataTypes>;
    static patch(url: string, data: DataTypes | Object): Promise<DataTypes>;
    static setHeaders(headers: HTTPHeaders): void;
    static setResponseType(responseType: ResponseTypes): void;
    private static call;
    private static setRequestHeaders;
}
export interface HTTPHeaders {
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
    [key: string]: string | number | undefined;
}
export declare type HTTPRequestMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
export declare type DataTypes = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream | null;
export declare type ResponseTypes = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | '';
