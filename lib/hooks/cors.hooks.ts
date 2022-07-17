import { App, CorePlugin } from "@istanbul/app";
import { CorsConfig } from "../types/config.type";
import { Cors, CorsCreator, CorsOptions } from "../types/cors.type";
import { createConfig } from "./config.hooks";
import { createCorsMiddleware } from "./cors-middleware.hooks";

export const createCors: CorsCreator = (options?: CorsOptions): Cors => {
  const config: CorsConfig = createConfig(options);
  return {
    name: "cors",
    version: "0.0.1",
    install(app: App, corePlugins: Map<string, CorePlugin>) {
      if (config.wsEnabled) {
        app.store.provide(
          "istanbuljs:cors-ws-middleware",
          createCorsMiddleware(config.wsOptions || config)
        );
      }
      if (config.httpEnabled) {
        app.store.provide(
          "istanbuljs:cors-http-middleware",
          createCorsMiddleware(config.httpOptions || config)
        );
      }
    },
  };
};
