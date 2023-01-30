/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {}
}

interface VantWeAppEvent {
  type: string;
  detail: {
    value: string | number;
  }
}