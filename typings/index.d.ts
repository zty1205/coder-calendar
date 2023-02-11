/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {};
}

type VantWeAppEvent<T> = {
  type: string;
  detail: T;
};

type VantEventDetailObject<T = string | number> = {
  value: T;
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
