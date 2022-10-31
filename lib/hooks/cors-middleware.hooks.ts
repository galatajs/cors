import { IncomingMessage, ServerResponse } from "http";
import { NextFunction, CoreMiddleware } from "@galatajs/http";
import { BadRequestError } from "@galatajs/core";
import { createConfig } from "./config.hooks";
import { BaseConfig } from "../types/config.type";
import { CorsConfig } from "../types/config.type";
import { CorsMiddlewareCreator, CorsOptions } from "../types/cors.type";
import { Header } from "../types/header.type";
import {
  configureAllowedHeaders,
  configureCredentials,
  configureExposedHeaders,
  configureMaxAgeHeader,
  configureMethods,
  configureOrigin,
  setHeaders,
} from "./header-configurator.hooks";

export const useCors: CorsMiddlewareCreator = (
  options?: CorsOptions
): CoreMiddleware => {
  const config: CorsConfig = createConfig(options);
  return createCorsMiddleware(config);
};

export const createCorsMiddleware = (config: BaseConfig): CoreMiddleware => {
  return (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
    const origin = req.headers.origin;
    if (!origin) return next(new BadRequestError("Origin header is required"));
    const headers: Header[][] = [];
    const method =
      req.method && req.method.toUpperCase && req.method.toUpperCase();
    if (method === "OPTIONS") {
      headers.push(...configureOrigin(req, config));
      const credential = configureCredentials(config);
      if (credential) headers.push([credential]);
      headers.push([configureMethods(config.methods)]);
      headers.push(...configureAllowedHeaders(req, config));
      const maxAge = configureMaxAgeHeader(config);
      if (maxAge) headers.push([maxAge]);
      const exposed = configureExposedHeaders(config);
      if (exposed) headers.push(exposed);
      setHeaders(res, headers);
      if (config.preflightContinue) return next();
      else {
        res.statusCode = config.optionsSuccessStatus;
        res.setHeader("Content-Length", 0);
        res.end();
      }
    } else {
      headers.push(...configureOrigin(req, config));
      const credential = configureCredentials(config);
      if (credential) headers.push([credential]);
      const exposed = configureExposedHeaders(config);
      if (exposed) headers.push(exposed);
      setHeaders(res, headers);
      next();
    }
  };
};
