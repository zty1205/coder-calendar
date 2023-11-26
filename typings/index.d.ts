/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {};
}

type WxDomEvent<T = any, D = any> = {
  type: string;
  detail: T;
  currentTarget: {
    dataset: D;
    id: string;
    offsetLeft: number;
    offsetTop: number;
  };
};
