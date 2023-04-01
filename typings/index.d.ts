/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {};
}

type WxDomEvent<T> = {
  type: string;
  detail: T;
};
