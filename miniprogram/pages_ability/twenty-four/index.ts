import { getPokesRate, setPokesRate } from '../../utils/cache';
import { getRandomNumber } from '../../utils/util';
import evaluateExpression from './calc';

Page({
  data: {
    calcText: '',
    successCount: 0,
    totalCount: 0,
    historyRate: '0 / 0',
    pokes: [
      {
        num: 0,
        type: 1
      },
      {
        num: 0,
        type: 1
      },
      {
        num: 0,
        type: 1
      },
      {
        num: 0,
        type: 1
      }
    ]
  },
  onLoad() {
    this.initPoke();
    this.initRate();
  },
  onHide() {
    this.saveRate();
  },
  onUnload() {
    this.saveRate();
  },
  onShareAppMessage() {
    return {};
  },
  initPoke() {
    const list = Array.from({ length: 4 }).map(() => {
      return {
        num: getRandomNumber(1, 10),
        type: getRandomNumber(1, 4)
      };
    });
    this.setData({
      pokes: list
    });
  },
  clearPoke() {
    this.setData({
      calcText: ''
    });
    this.initPoke();
  },
  isValidExp() {
    const exp = (this.data.calcText || '').replace(/\s/g, '');
    if (!exp) {
      wx.showToast({
        icon: 'error',
        title: '空表达式'
      });
      return false;
    }
    if (/([1-9]|(10)){2}/.test(exp)) {
      wx.showToast({
        icon: 'error',
        title: '连续使用数字'
      });
      return false;
    }
    const nums = this.data.pokes.map((x) => x.num);
    const all =
      nums.every((n) => exp.includes(String(n))) &&
      exp.replace(/\D/g, '').length === this.data.pokes.map((x) => x.num).join('').length;
    if (!all) {
      wx.showToast({
        icon: 'error',
        title: '遗漏了数字'
      });
      return false;
    }
    return true;
  },
  calcPoke() {
    const valid = this.isValidExp();
    if (!valid) {
      return;
    }
    try {
      const res = evaluateExpression(this.data.calcText);
      if (isNaN(Number(res))) {
        wx.showToast({
          icon: 'error',
          title: '不合法的表达式'
        });
        return;
      }
      if (res == 24) {
        wx.showToast({
          icon: 'success',
          title: '成功啦'
        });
        this.setData({
          successCount: this.data.successCount + 1,
          totalCount: this.data.totalCount + 1
        });
        this.clearPoke();
      } else {
        wx.showToast({
          icon: 'error',
          title: `${Number(res).toFixed(1)}不是正确的答案`
        });
      }
    } catch (err) {
      wx.showToast({
        icon: 'error',
        title: '不合法的表达式'
      });
      return;
    }
  },
  initRate() {
    this.setData({
      historyRate: getPokesRate() || '0 / 0'
    });
  },
  saveRate(toast = false) {
    const { totalCount, successCount, historyRate } = this.data;
    if (!totalCount || !successCount) return;
    const [hisST, hisTC] = historyRate.split('/').map(Number);
    if (!hisTC || !hisST) {
      setPokesRate(`${successCount} / ${totalCount}`);
    } else {
      const sRate = successCount / totalCount;
      const hRate = hisST / hisTC;
      if (sRate > hRate || (sRate === hRate && totalCount > hisTC)) {
        setPokesRate(`${successCount} / ${totalCount}`);
      } else {
        toast &&
          wx.showToast({
            icon: 'error',
            title: '未超过最好成绩'
          });
      }
    }
  },
  handleTapKeyboard(e: WxDomEvent<any, { op: string }>) {
    const op = e.target.dataset.op;
    if (!op) return;
    if (op === 'delete') {
      const text = this.data.calcText;
      let dis = /(10)$/.test(text) ? -2 : -1;
      this.setData({
        calcText: text.slice(0, dis)
      });
    } else if (op === 'abandon') {
      this.clearPoke();
      this.setData({
        totalCount: this.data.totalCount + 1
      });
    } else if (op === 'retry') {
      this.initPoke();
    } else if (op === 'confirm') {
      this.calcPoke();
    } else if (op === 'save') {
      this.saveRate(true);
      this.initRate();
    } else {
      if (this.data.calcText.length >= 16) {
        wx.showToast({
          icon: 'error',
          title: '超出长度限制'
        });
        return;
      }
      this.setData({
        calcText: this.data.calcText + op
      });
    }
  }
});
