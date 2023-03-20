// pages/perpetual/index.ts
Page<{ av: string[]; st: string[] }, Record<string, any>>({
  /**
   * 页面的初始数据
   */
  data: {
    av: [],
    st: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.init();
  },
  onShareAppMessage() {},
  init() {
    const av = '栽种.安门.治病.作灶';
    const st = '动土.祈福.安床.架马.开厕.祭祀.入殓.成人礼.成服.除服.伐木.结网.开池.求子';
    this.setData({
      av: av.split('.'),
      st: st.split('.')
    });
  }
});
