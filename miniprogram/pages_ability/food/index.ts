import getFoodList from '../data/food';
import { getRandomByPriority } from '../../utils/util';

interface PageData {
  foodList: Food[]
}

Page<PageData, any>({
  data: {
    foodList: [],
    showRollAni: false,
    showCurrentFood: false,
    showCurrentOp: false,
    curFood: {
      name: '',
      level: 0,
      weight: 0,
      img: '',
      desc: '',
      category: 0,
      hPrice: '0',
      lPrice: '0'
    }
  },
  onLoad() {
    this.setData({
      foodList: getFoodList()
    })
  },
  onShareAppMessage() {
    return {
      title: '干饭人',
      path: '/pages_ability/food/index'
    };
  },
  rolls() {
    this.setData({
      showRollAni: true
    });
    const food = getRandomByPriority<Food>(this.data.foodList);
    this.setData({
      curFood: food
    });
  },
  handleRollAniEnd() {
    setTimeout(() => {
      this.setData({
        showCurrentFood: true
      });
    }, 300);
  },
  handleFoodAniEnd() {
    wx.nextTick(() => {
      this.setData({
        showRollAni: false,
        showCurrentOp: true
      });
    });
  },
  handleConfirm() {
    this.setData({
      showRollAni: false,
      showCurrentFood: false,
      showCurrentOp: false
    });
    setTimeout(() => {
      wx.showModal({
        title: '提示',
        content: `点一份${this.data.curFood.name}恰恰`,
        showCancel: false,
        confirmText: '我知道了'
      });
    }, 100);
  },
  handleRetry() {
    this.setData({
      showRollAni: false,
      showCurrentFood: false,
      showCurrentOp: false
    });
    setTimeout(() => {
      this.rolls();
    }, 100);
  }
});
