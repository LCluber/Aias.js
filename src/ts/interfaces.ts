import { HTTPRequestMethod } from "./types";

export interface Method {
  type: HTTPRequestMethod;
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
