import { ResponseDataType, HTTPRequestMethod } from "./types";
import { HTTPHeaders } from "./httpheaders";

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
  GET: Method,
  HEAD: Method,
  POST: Method,
  PUT: Method,
  DELETE: Method,
  CONNECT: Method,
  OPTIONS: Method,
  TRACE: Method,
  PATCH: Method
}
