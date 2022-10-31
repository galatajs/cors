import { HttpMethods } from "@galatajs/core";

export interface CorsConfig extends BaseConfig {
  wsEnabled: boolean;
  httpEnabled: boolean;
  httpOptions?: BaseConfig;
  wsOptions?: BaseConfig;
}

export interface BaseConfig {
  whiteList: (string | RegExp)[];
  methods: HttpMethods[];
  preflightContinue: boolean;
  optionsSuccessStatus: number;
  credentials: boolean;
  exposedHeaders: string[];
  allowedHeaders: string[];
  maxAge?: number;
}
