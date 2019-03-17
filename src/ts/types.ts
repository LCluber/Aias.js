
export type HTTPRequestMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

export type DataTypes = string | Document | Blob | BufferSource | FormData | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream | null;

export type ResponseTypes = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | '';
