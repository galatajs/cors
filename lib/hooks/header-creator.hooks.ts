import { Header } from "../types/header.type";

export const createAllowOriginHeader = (origin: string | boolean): Header[] => {
  return [
    {
      key: "Access-Control-Allow-Origin",
      value: typeof origin === "boolean" ? `${origin}` : origin,
    },
  ];
};
export const createRequestAllowedHeaders = (value: string): Header[] => {
  return [
    {
      key: "Access-Control-Request-Headers",
      value,
    },
  ];
};
export const createControlAllowedHeaders = (value: string): Header[] => {
  return [
    {
      key: "Access-Control-Allow-Headers",
      value,
    },
  ];
};
export const createVaryHeader = (value: string): Header[] => {
  return [
    {
      key: "Vary",
      value: value,
    },
  ];
};
export const createExposedHeader = (value: string): Header[] => {
  return [
    {
      key: "Access-Control-Expose-Headers",
      value,
    },
  ];
};
export const createMaxAgeHeader = (value: number): Header => {
  return {
    key: "Access-Control-Max-Age",
    value: value.toString(),
  };
};
