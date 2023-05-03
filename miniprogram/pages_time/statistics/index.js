
import * as echarts from '../ec-canvas/echarts.min';
import { getBarOptions } from './option'

Page({
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
  },
  onReady () {
    // 横屏显示 降低渲染模糊的概率
    setTimeout(() => {
      this.init()
    }, 500)
  },
  async init() {
    const ecComponent = this.selectComponent('#mychart-bar');
    const options = await getBarOptions()
    ecComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      chart.setOption(options);

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  onShareAppMessage: function () {
    return {
      title: '全年假补图',
      path: '/pages_time/statistics/index'
    }
  }
});
