
import { isObject } from "@lcluber/chjs";
import { Logger, Group } from "@lcluber/mouettejs";
import { HTTPHeaders } from "./httpheaders";
import { Observable } from "rxjs";
import Promise from "promise-polyfill";

import {
  HTTPRequestMethod,
  DataType,
  SendDataType,
  ResponseDataType,
  ResponseType,
  EventType
} from "./types";

const AudioContext =
  window.AudioContext || // Default
  (<any>window).webkitAudioContext || // Safari and old versions of Chrome
  false;

export class Method {
export class Request {
  private method: HTTPRequestMethod;
  private async: boolean;
  private noCache: boolean;

  constructor(method: HTTPRequestMethod, headers: HTTPHeaders) {
    this.method = method;
    this.async = true;
    this.noCache = false;
    this.headers = headers;
  }
}
