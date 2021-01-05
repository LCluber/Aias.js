
export type SendDataType =
  | string
  | Document
  | Blob
  | BufferSource
  | FormData
  | ArrayBufferView
  | ArrayBuffer
  | URLSearchParams
  | ReadableStream
  | null;

export type DataType =
  | string
  | Document
  | Blob
  | BufferSource
  | FormData
  | ArrayBufferView
  | ArrayBuffer
  | URLSearchParams
  | ReadableStream
  | Object
  | null;

export type ResponseDataType =
  | string
  | Document
  | Blob
  | BufferSource
  | FormData
  | ArrayBufferView
  | ArrayBuffer
  | AudioBuffer
  | URLSearchParams
  | ReadableStream
  | Object
  | null;

export type ResponseType =
  | "arraybuffer"
  | "audiobuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "";
