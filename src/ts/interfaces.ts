import { HTTPRequestMethod } from "./types";

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
