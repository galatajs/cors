import { HttpMethods } from "@istanbul/core";
import { getFieldIsExists } from "../utils/util";
import { BaseOptions } from "../types/cors.type";
import { BaseConfig, CorsConfig } from "../types/config.type";
import { CorsOptions } from "../types/cors.type";

const getWhiteList = <T>(options?: T): (string | RegExp)[] => {
  const origins: (string | RegExp)[] = [];
  const _origin: string | string[] | RegExp | RegExp[] = getFieldIsExists<
    T,
    string | string[] | RegExp | RegExp[]
  >(options, "whiteList", "*");
  if (!Array.isArray(_origin)) {
    origins.push(_origin);
  } else {
    origins.push(..._origin);
  }
  return origins;
};

const getArrayOrString = <T>(key: string, options?: T): string[] => {
  let headers: string | string[] = getFieldIsExists<T, string | string[]>(
    options,
    key,
    []
  );
  if (!Array.isArray(headers)) {
    headers = [headers];
  }
  return headers;
};

export const createBaseConfig = (options?: BaseOptions): BaseConfig => {
  return {
    whiteList: getWhiteList<BaseOptions>(options),
    methods: getFieldIsExists<BaseOptions, HttpMethods[]>(options, "methods", [
      HttpMethods.GET,
      HttpMethods.POST,
      HttpMethods.PUT,
      HttpMethods.DELETE,
      HttpMethods.OPTIONS,
      HttpMethods.PATCH,
      HttpMethods.HEAD,
    ]),
    preflightContinue: getFieldIsExists<BaseOptions, boolean>(
      options,
      "preflightContinue",
      false
    ),
    credentials: getFieldIsExists<BaseOptions, boolean>(
      options,
      "credentials",
      false
    ),
    optionsSuccessStatus: getFieldIsExists<BaseOptions, number>(
      options,
      "optionsSuccessStatus",
      204
    ),
    allowedHeaders: getArrayOrString<BaseOptions>("allowedHeaders", options),
    exposedHeaders: getArrayOrString<BaseOptions>("exposedHeaders", options),
    maxAge: getFieldIsExists<BaseOptions, number | undefined>(
      options,
      "maxAge",
      undefined
    ),
  };
};

export const createConfig = (options?: CorsOptions): CorsConfig => {
  return {
    ...createBaseConfig(options as BaseOptions),
    wsEnabled: getFieldIsExists<CorsOptions, boolean>(
      options,
      "wsEnabled",
      true
    ),
    httpEnabled: getFieldIsExists<CorsOptions, boolean>(
      options,
      "httpEnabled",
      true
    ),
    wsOptions:
      options && options.wsOptions
        ? createBaseConfig(options.wsOptions)
        : undefined,
    httpOptions:
      options && options.httpOptions
        ? createBaseConfig(options.httpOptions)
        : undefined,
  };
};
