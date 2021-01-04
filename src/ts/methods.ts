import { Methods } from "./interfaces";

export const METHODS: Methods = {
  GET: {
    type: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  HEAD: {
    type: "HEAD",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  POST: {
    type: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data: true
  },
  PUT: {
    type: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    data: true
  },
  DELETE: {
    type: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  CONNECT: {
    type: "CONNECT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  OPTIONS: {
    type: "OPTIONS",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  TRACE: {
    type: "TRACE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  PATCH: {
    type: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    data: false
  }
};

// console.info();
// console.trace();
// console.warn();
// console.error();
// console.time();
// console.timeEnd();
