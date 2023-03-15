/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {};
}

type WxDomEvent<T> = {
  type: string;
  detail: T;
};

interface Food {
  name: string;
  level: number;
  weight: number;
  img: string;
  desc: string;
  category: number;
  hPrice: string;
  lPrice: string;
}
