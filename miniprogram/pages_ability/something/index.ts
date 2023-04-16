import { TimeLoop } from '../utils/loop';
import { getRandomNumber, getRandomOneByList } from '../../utils/util';
import ThingList from '../data/thing';
import { wxConfirm } from '../../utils/common';

interface Item {
  id: number;
  chosen: boolean;
  finished: boolean;
}

interface PageData {
  list: Array<Item>;
  loops: TimeLoop[];
  showPop: boolean;
  lastIndex: number[];
  speed: number;
  speedVar: number;
  worker: number;
  workerVar: number;
  result: Array<ThingItem>;
  showPlayAni: boolean;
  showThumbAni: boolean;
  status: 'start' | 'process';
  aniNumber: number;
}

const Total = 23;
let timer: NodeJS.Timeout;

Page<PageData, Record<string, any>>({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    lastIndex: [],
    loops: [],
    showPop: false,
    speed: 300,
    speedVar: 300,
    worker: 2,
    workerVar: 2,
    result: [],
    showPlayAni: true,
    showThumbAni: false,
    status: 'start',
    // 判断所有动画是否都结束
    aniNumber: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.init();
  },
  onReady() {
    timer = setTimeout(() => {
      this.setData({
        showPlayAni: false
      })
    }, 2000)
  },
  onUnload() {
    this.data.loops.forEach((l) => l.destroy());
    clearTimeout(timer)
  },
  getRandomDiscount() {
    return getRandomNumber(10, 8) / 10;
  },
  getLoop(id: number) {
    const tLoop = new TimeLoop(getRandomNumber(20, 10), this.data.speed * this.getRandomDiscount(), () => {
      this.chooseHoneycomb(id);
    });
    tLoop.registerHooks('finished', () => {
      this.onChooseHoneycombFinish(id);
    });
    return tLoop;
  },
  init() {
    const list: Array<Item> = Array.from({ length: Total }, (v: any, k: number) => {
      return {
        id: k,
        chosen: false,
        finished: false
      };
    });
    const loops = Array.from({ length: this.data.worker }, (v: any, k: number) => {
      return this.getLoop(k);
    });
    this.setData({
      list,
      loops,
      lastIndex: []
    });
  },
  handleStart() {
    // 动画中不允许操作
    this.setData({
      status: 'start',
      lastIndex: [],
      result: []
    });
    if (this.data.status === 'process') {
      return;
    }
    const len = this.data.list.filter((x) => !x.chosen).length;
    // 两倍最大worker
    if (len < 8) {
      wxConfirm('请点击右侧按钮补充土砖哦！');
      this.setData({
        showThumbAni: true
      });
      return;
    }
    this.setData({
      status: 'process',
      aniNumber: 0
    });
    this.data.loops.forEach((loop) => loop.start());
  },
  handleReplenish() {
    // 动画中不允许操作
    if (this.data.status === 'process') {
      return;
    }
    const index = this.data.list.findIndex((x) => x.chosen && x.finished);
    if (index === -1) {
      wx.showToast({
        title: '搬完啦'
      });
      this.setData({
        showThumbAni: false
      });
    } else {
      this.setData({
        [`list.[${index}].chosen`]: false,
        [`list.[${index}].finished`]: false
      });
      wx.nextTick(() => {
        const isEvery = this.data.list.every((x) => !x.chosen);
        if (isEvery) {
          this.setData({
            showThumbAni: false
          });
        }
      });
    }
  },
  getRandomIndex(): number {
    const index = getRandomNumber(Total);
    if (this.data.list[index].chosen) {
      return this.getRandomIndex();
    }
    return index;
  },
  chooseHoneycomb(id: number) {
    const index = this.getRandomIndex();
    const lastIdx = this.data.lastIndex[id];
    if (lastIdx != undefined) {
      this.setData({
        [`list.[${lastIdx}].chosen`]: false,
        [`list.[${index}].chosen`]: true,
        [`lastIndex.[${id}]`]: index
      });
    } else {
      this.setData({
        [`list.[${index}].chosen`]: true,
        [`lastIndex.[${id}]`]: index
      });
    }
  },
  onChooseHoneycombFinish(id: number) {
    const lastIdx = this.data.lastIndex[id];
    this.setData({
      [`list.[${lastIdx}].finished`]: true,
      [`lastIndex.[${id}]`]: null
    });
  },
  handleAniEnd() {
    const item = getRandomOneByList(ThingList);
    const bArr = this.data.result;
    bArr?.push(item);
    this.setData({
      result: bArr
    });
    const num = this.data.aniNumber + 1;
    const aNum = num >= this.data.worker ? 0 : num;
    this.setData({
      aniNumber: aNum
    });
    // worker的动画都结束
    if (aNum === 0) {
      wx.nextTick(() => {
        this.setData({
          status: 'start'
        });
      });
    }
  },
  handeShowPop() {
    // 动画中不允许操作
    if (this.data.status === 'process') {
      return;
    }
    this.setData({
      showPop: true,
      speedVar: this.data.speed,
      workerVar: this.data.worker
    });
  },
  handlePopCancel() {
    this.setData({
      showPop: false
    });
  },
  handlePopConfirm() {
    const { loops, speed, speedVar, workerVar } = this.data;
    if (speed !== speedVar) {
      loops.forEach((lp) => lp.setStep(speedVar * this.getRandomDiscount()));
    }
    this.setData({
      showPop: false,
      worker: this.data.workerVar,
      speed: this.data.speedVar
    });
    if (loops.length < workerVar) {
      for (let i = loops.length; i < workerVar; i++) {
        loops.push(this.getLoop(i));
      }
    } else if (loops.length > workerVar) {
      const lp = loops.splice(workerVar, loops.length - workerVar);
      lp.forEach((l) => l && l.destroy());
    }
    this.setData({
      result: [],
      loops
    });
  },
  onDragSpeed(e: WxDomEvent<{ value: number }>) {
    this.setData({
      speedVar: e.detail.value
    });
  },
  onDragWorker(e: WxDomEvent<{ value: number }>) {
    this.setData({
      workerVar: e.detail.value
    });
  }
});
