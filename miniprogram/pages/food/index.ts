import foodList from '../../data/food'
import { getRandomOneByList } from '../../utils/util'

Page({
  data: {
    foodList: foodList,
    showRollAni: false,
    showCurrentFood: false,
    showCurrentOp: false,
    curFood: {
      name: '',
      level: 0,
      priority: 0,
      img: '',
      desc: '',
      category: 0,
      hPrice: "0",
      lPrice: "0"
    }
  },
  onLoad() {

  },
  rolls() {
    this.setData({
      showRollAni: true
    })
    const food = getRandomOneByList(this.data.foodList) // this.data.foodList[2] 
    this.setData({
      curFood: food
    })
  },
  handleRollAniEnd() {
    setTimeout(() => {
      this.setData({
        showCurrentFood: true
      })
    }, 300)
  },
  handleFoodAniEnd() {
    wx.nextTick(() => {
      this.setData({
        showRollAni: false,
        showCurrentOp: true
      })
    })
  },
  handleConfirm() {
    this.setData({
      showRollAni: false,
      showCurrentFood: false,
      showCurrentOp: false,
    })
    setTimeout(() => {
      wx.showModal({
        title: "提示",
        content: `点一份${this.data.curFood.name}恰恰`,
        showCancel: false,
        confirmText: '我知道了',
      })
    }, 100)

  },
  handleRetry() {
    this.setData({
      showRollAni: false,
      showCurrentFood: false,
      showCurrentOp: false,
    })
    setTimeout(() => {
      this.rolls()
    }, 100)
  }
})