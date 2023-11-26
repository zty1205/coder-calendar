import { getRandomNumber } from '../../utils/util';

interface TGridItemPosition {
  h: number;
  l: number;
}

interface TGridItem extends TGridItemPosition {
  index: number;
  isBoom: boolean;
  hasBoom: number;
  status: 'close' | 'open' | 'mark';
}

interface TSpreadData {
  open: number;
}

interface PageData {
  grid: TGridItem[][];
  gridH: number;
  gridL: number;
  booms: number;
  status: 'start' | 'fail' | 'success';
  userMarks: number;
  closes: number;
}

interface PageCoustom {
  checkIndex(hNum: number, lNum: number): boolean;
  genGridRoundArray(hNum: number, lNum: number): TGridItemPosition[];
  setBoom(hNum: number, lNum: number, grid: TGridItem[][]): void;
  genGrid(): void;
  handleRestart(): void;
  handleFail(): void;
  handleSuccess(): void;
  handleOpenAll(): void;
  spread(h: number, l: number, grid: TGridItem[][], data: TSpreadData): void;
  handleSpread(h: number, l: number): void;
  judgeFinish(): void;
  handleTapItem(e: WxDomEvent<any, TGridItem>): void;
  handlePressItem(e: WxDomEvent<any, TGridItem>): void;
  handleShowRule(): void;
  handleCloseShowRule(): void;
}

function genRandomArray(total: number, num: number) {
  const arr = Array.from({ length: total }, (v, k) => k);
  const result = [];
  const map = new Map<number, boolean>();

  for (let i = 0; i < num; i++) {
    const idx = Math.floor(Math.random() * (total - i));
    const n = arr[idx];

    result.push(n);
    map.set(n, true);
    arr[idx] = arr[total - i - 1];
  }
  return {
    array: result,
    map: map
  };
}

Page<PageData, PageCoustom>({
  data: {
    grid: [],
    gridH: 8,
    gridL: 8,
    booms: 1,
    status: 'success',
    userMarks: 0,
    closes: 0
  },
  onLoad() {
    this.genGrid();
  },
  onReady() {},
  onUnload() {},
  onShareAppMessage() {},
  checkIndex(hNum: number, lNum: number) {
    const { gridH, gridL } = this.data;
    if (hNum === undefined || lNum === undefined) {
      return false;
    }
    if (hNum < 0 || hNum >= gridH) {
      return false;
    }
    if (lNum < 0 || lNum >= gridL) {
      return false;
    }
    return true;
  },
  genGridRoundArray(hNum: number, lNum: number) {
    return [
      {
        h: hNum - 1,
        l: lNum - 1
      },
      {
        h: hNum - 1,
        l: lNum
      },
      {
        h: hNum - 1,
        l: lNum + 1
      },
      {
        h: hNum,
        l: lNum - 1
      },
      {
        h: hNum,
        l: lNum + 1
      },
      {
        h: hNum + 1,
        l: lNum - 1
      },
      {
        h: hNum + 1,
        l: lNum
      },
      {
        h: hNum + 1,
        l: lNum + 1
      }
    ].filter((x) => this.checkIndex(x.h, x.l));
  },
  setBoom(hNum: number, lNum: number, grid: TGridItem[][]) {
    const rounds = this.genGridRoundArray(hNum, lNum);
    for (const { h, l } of rounds) {
      grid[h][l].hasBoom += 1;
    }
  },
  genGrid() {
    const booms = getRandomNumber(13, 1);
    const { gridH, gridL } = this.data;
    const total = gridH * gridL;
    const { array: boomNumArr, map: boomNumMap } = genRandomArray(total, booms);
    const grid: TGridItem[][] = [];

    for (let i = 0; i < gridH; i++) {
      const arr = [];

      for (let j = 0; j < gridL; j++) {
        const index = i * gridL + j;
        const item: TGridItem = {
          index: index,
          isBoom: boomNumMap.has(index), // 是否是炸弹
          hasBoom: 0, // 周围炸弹数
          status: 'close',
          h: i,
          l: j
        };
        arr.push(item);
      }
      grid.push(arr);
    }

    for (const bn of boomNumArr) {
      const hNum = Math.floor(bn / gridL);
      const lNum = bn % gridL;
      this.setBoom(hNum, lNum, grid);
    }

    this.setData({ grid, status: 'start', userMarks: 0, closes: total, booms });
  },
  handleRestart() {
    this.genGrid();
  },
  handleFail() {
    this.setData({ status: 'fail' });
    wx.vibrateShort({ type: 'medium' });
    wx.showToast({
      title: '爆炸了',
      icon: 'none'
    });
    this.handleOpenAll();
  },
  handleSuccess() {
    this.setData({ status: 'success' });
    wx.showToast({
      title: '成功了',
      icon: 'none'
    });
  },
  handleOpenAll() {
    const grid = this.data.grid;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j].status = 'open';
      }
    }
    this.setData({ grid, closes: 0, userMarks: 0 });
  },
  spread(h: number, l: number, grid: TGridItem[][], data: TSpreadData) {
    if (!this.checkIndex(h, l)) return;
    const item = grid[h][l];
    // 用open作为访问过的标识
    if (item.status !== 'close') return;
    if (item.hasBoom === 0) {
      item.status = 'open';
      data.open += 1;
      const rounds = this.genGridRoundArray(h, l);
      for (let it of rounds) {
        this.spread(it.h, it.l, grid, data);
      }
    }
    return;
  },
  handleSpread(h: number, l: number) {
    const { grid, closes } = this.data;
    const data: TSpreadData = { open: 0 };
    this.spread(h, l, grid, data);
    this.setData({ grid, closes: closes - data.open });
  },
  judgeFinish() {
    const { grid, booms, userMarks } = this.data;
    if (userMarks < booms) {
      return;
    }

    let marklen = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const item = grid[i][j];
        if (item.isBoom && item.status === 'mark') {
          marklen += 1;
        }
      }
    }
    if (marklen === booms) {
      this.handleSuccess();
    }
  },
  handleTapItem(e: WxDomEvent<any, TGridItem>) {
    const { grid, status, closes, userMarks } = this.data;
    if (status !== 'start') return;

    const { h, l } = e.currentTarget.dataset || {};
    const item = grid[h][l];
    if (item.status === 'close') {
      if (item.isBoom) {
        item.status = 'open';
        this.setData({ grid, closes: closes - 1 });
        this.handleFail();
        return;
      }
      if (item.hasBoom === 0) {
        // 边缘扩散 需要进行广度遍历
        this.handleSpread(h, l);
      } else {
        item.status = 'open';
        this.setData({ grid, closes: closes - 1 });
      }
      this.judgeFinish();
    } else if (item.status === 'mark') {
      item.status = 'close';
      this.setData({ grid, closes: closes + 1, userMarks: userMarks - 1 });
    } else {
      item.status == 'open';
    }
  },
  handlePressItem(e: WxDomEvent<any, TGridItem>) {
    const { grid, status, userMarks, booms, closes } = this.data;
    if (status !== 'start') return;

    const { h, l } = e.currentTarget.dataset || {};
    const item = grid[h][l];

    if (item.status === 'close') {
      if (userMarks >= booms) {
        return;
      }
      item.status = 'mark';
      const newUserMarks = userMarks + 1;
      this.setData({ grid, userMarks: newUserMarks, closes: closes - 1 }, () => {
        this.judgeFinish();
      });
    } else if (item.status === 'mark') {
      item.status = 'close';
      this.setData({ grid, userMarks: userMarks - 1, closes: closes + 1 });
    } else {
      item.status = 'open';
    }
  },
  handleShowRule() {
    this.setData({
      showRule: true
    });
  },
  handleCloseShowRule() {
    this.setData({
      showRule: false
    });
  }
});
