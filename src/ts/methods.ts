import { Methods } from "./interfaces";

export const METHODS: Methods = {
  GET: {
    type: "GET",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {},
    data: false
  },
  HEAD: {
    type: "HEAD",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {},
    data: false
  },
  POST: {
    type: "POST",
    defaultHeaders: {
      "Content-Type": "application/json"
    },
    headers: {},
    data: true
  },
  PUT: {
    type: "PUT",
    defaultHeaders: {
      "Content-Type": "application/json"
    },
    headers: {},
    data: true
  },
  DELETE: {
    type: "DELETE",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {},
    data: false
  },
  CONNECT: {
    type: "CONNECT",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {},
    data: false
  },
  OPTIONS: {
    type: "OPTIONS",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {},
    data: false
  },
  TRACE: {
    type: "TRACE",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {},
    data: false
  },
  PATCH: {
    type: "PATCH",
    defaultHeaders: {
      "Content-Type": "application/json"
    },
    headers: {},
    data: false
  }
};

// console.info();
// console.trace();
// console.warn();
// console.error();
// console.time();
// console.timeEnd();
