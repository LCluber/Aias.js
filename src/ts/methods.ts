import { Methods } from "./interfaces";

export const METHODS: Methods = {
  GET: {
    type: "GET",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  HEAD: {
    type: "HEAD",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  POST: {
    type: "POST",
    defaultHeaders: {
      "Content-Type": "application/json"
    },
    headers: {
      "Content-Type": "application/json"
    },
    data: true
  },
  PUT: {
    type: "PUT",
    defaultHeaders: {
      "Content-Type": "application/json"
    },
    headers: {
      "Content-Type": "application/json"
    },
    data: true
  },
  DELETE: {
    type: "DELETE",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  CONNECT: {
    type: "CONNECT",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  OPTIONS: {
    type: "OPTIONS",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  TRACE: {
    type: "TRACE",
    defaultHeaders: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: false
  },
  PATCH: {
    type: "PATCH",
    defaultHeaders: {
      "Content-Type": "application/json"
    },
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
