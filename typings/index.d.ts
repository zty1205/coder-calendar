/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {};
}

interface VantWeAppEvent {
  type: string;
  detail: {
    value: string | number;
  };
}

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
