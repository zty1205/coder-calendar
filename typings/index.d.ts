/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {};
}

type WxDomEvent<T, D> = {
  type: string;
  detail: T;
  target: {
    dataset: D,
    id: string
  }
};
