import { IncomingMessage, ServerResponse } from "http";
import vary from "vary";
import { HttpMethods } from "@galatajs/core";
import { BaseConfig } from "../types/config.type";
import { Header } from "../types/header.type";
import {
  createAllowOriginHeader,
  createControlAllowedHeaders,
  createExposedHeader,
  createMaxAgeHeader,
  createVaryHeader,
} from "./header-creator.hooks";

export const isOriginAllowed = (
  origin: string,
  allowed: (string | RegExp)[]
): boolean => {
  if (allowed.includes("*")) {
    return true;
  }
  return allowed.some((item) => {
    if (typeof item === "string") {
      return origin === item;
    }
    return item.test(origin);
  });
};

export const configureOrigin = (
  req: IncomingMessage,
  config: BaseConfig
): Header[][] => {
  const headers: Header[][] = [];
  const origin = req.headers["origin"] as string;
  if (config.whiteList.includes("*")) {
    headers.push(createAllowOriginHeader("*"));
  } else if (
    config.whiteList.length === 1 &&
    typeof config.whiteList[0] === "string"
  ) {
    headers.push(createAllowOriginHeader(config.whiteList[0]));
    headers.push(createVaryHeader("Origin"));
  } else {
    const allowed: boolean = isOriginAllowed(origin, config.whiteList);
    headers.push(createAllowOriginHeader(allowed ? origin : false));
    headers.push(createVaryHeader("Origin"));
  }
  return headers;
};

export const configureMethods = (methods: HttpMethods[]): Header => {
  return {
    key: "Access-Control-Allow-Methods",
    value: methods.map((method) => method.toUpperCase()).join(","),
  };
};

export const configureCredentials = (config: BaseConfig): Header | null => {
  if (config.credentials) {
    return {
      key: "Access-Control-Allow-Credentials",
      value: "true",
    };
  }
  return null;
};

export const configureAllowedHeaders = (
  req: IncomingMessage,
  config: BaseConfig
): Header[][] => {
  const headers: Header[][] = [];
  let allowedHeaders: string | string[] = config.allowedHeaders;
  if (allowedHeaders.length === 0) {
    allowedHeaders = req.headers["access-control-request-headers"] as
      | string[]
      | string;
    headers.push(createVaryHeader("Access-Control-Request-Headers"));
  } else if (Array.isArray(allowedHeaders)) {
    allowedHeaders = allowedHeaders.join(",");
  }
  if (typeof allowedHeaders === "string") {
    headers.push(createControlAllowedHeaders(allowedHeaders));
  }
  return headers;
};

export const configureExposedHeaders = (
  config: BaseConfig
): Header[] | null => {
  if (config.exposedHeaders.length > 0) {
    return createExposedHeader(config.exposedHeaders.join(","));
  }
  return null;
};

export const configureMaxAgeHeader = (config: BaseConfig): Header | null => {
  if (config.maxAge) {
    return createMaxAgeHeader(config.maxAge);
  }
  return null;
};

export const setHeaders = (
  res: ServerResponse,
  headers: (Header[] | Header)[]
): void => {
  for (const header of headers) {
    if (Array.isArray(header)) {
      return setHeaders(res, header);
    }
    if (header.key === "Vary" && header.value) {
      vary(res, header.value);
    } else if (header.value) {
      res.setHeader(header.key, header.value);
    }
  }
};
