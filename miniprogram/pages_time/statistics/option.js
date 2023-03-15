import { monthStatis } from '../data/timeStatis'

export const barOption = {
  title: {
    text: '全年假休月份柱形图',
    left: 'right'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
  },
  legend: {
    left: 'left'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '1月', '2月', '3月',
        '4月', '5月', '6月',
        '7月', '8月', '9月',
        '10月', '11月', '12月'
      ],
    }
  ],
  yAxis: [
    {
      type: 'value',
      max: 30
    }
  ],
  series: [
    {
      name: '工作日',
      type: 'bar',
      stack: '上班',
      emphasis: {
        focus: 'series'
      },
      data: monthStatis.map(x => x.w - x.l)
    },
    {
      name: '补班',
      type: 'bar',
      stack: '上班',
      emphasis: {
        focus: 'series'
      },
      label: {
        show: true
      },
      data: monthStatis.map(x => x.l)
    },
    {
      name: '周末休息',
      type: 'bar',
      stack: '休息',
      emphasis: {
        focus: 'series'
      },

      data: monthStatis.map(x => x.r)
    },
    {
      name: '节假休息',
      type: 'bar',
      stack: '休息',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: monthStatis.map(x => x.h)
    },
  ]
};