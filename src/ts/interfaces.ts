import { ResponseDataType, HTTPRequestMethod } from "./types";

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
