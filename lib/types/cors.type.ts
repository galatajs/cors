import { Middleware } from "@istanbul/http";
import { CorePlugin } from "@istanbul/app";
import { HttpMethods } from "@istanbul/core";

export interface Cors extends CorePlugin {}

export interface BaseOptions {
  /**
   * @default "*"
   * @description List of allowed origins.
   * @type {RegExp | RegExp[] | string | string[]}
   * @memberof CorsOptions
   * @example ["http://localhost:3000", "http://localhost:4000"]
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  whiteList?: RegExp | string | string[];

  /**
   * @default all methods
   * @description HTTP methods that are allowed
   * @type {HttpMethods[]}
   * @memberof CorsOptions
   * @example ["GET", "POST"]
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  methods?: HttpMethods[];

  /**
   * @default false
   * @type boolean
   * @description If set to true, it will send the preflight OPTIONS request.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflight_requests
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  preflightContinue?: boolean;
  /**
   * @default 204
   * @type number
   * @description The status code to use when returning the OPTIONS response.
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  optionsSuccessStatus?: number;

  /**
   * @default false
   * @type boolean
   * @description If set to true, it will send the credentials.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access_control_allow_credentials
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  credentials?: boolean;

  /**
   * @default []
   * @type {string | string[]}
   * @description List of exposed headers.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  exposedHeaders?: string | string[];

  /**
   * @default []
   * @type {string | string[]}
   * @description List of allowed headers. If not specified, reflecting incoming request headers are allowed.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  allowedHeaders?: string | string[];

  /**
   * @default undefined
   * @type {number}
   * @description The max age of the preflight request.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access_control_max_age
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  maxAge?: number;
}

export interface CorsOptions {
  /**
   * @default true
   * @description Enable CORS for your Websocket application is exist.
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  wsEnabled?: boolean;

  /**
   * @default true
   * @description Enable CORS for your HTTP application is exist.
   * @since 0.0.1
   * @author Sami Salih İbrahimbaş
   */
  httpEnabled?: boolean;

  wsOptions?: BaseOptions;
  httpOptions?: BaseOptions;
}

export type CorsCreator = (options?: CorsOptions) => Cors;
export type CorsMiddlewareCreator = (options?: CorsOptions) => Middleware;
