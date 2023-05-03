import { monthStatic } from '../data/timeStatic'
import { getUserMode } from '../../data/user'
import { WORK_MODE } from '../../utils/constant'

function formatter(params) {
  const value = params.value
  if (value && value != '0') return value
  return ''
}

export async function getBarOptions() {
  const mode = await getUserMode()

  const workData =  mode === WORK_MODE[996] ? monthStatic.map(x => x.w_996 - x.l) : monthStatic.map(x => x.w - x.l)
  const lieuData = monthStatic.map(x => x.l)
  const restData = mode === WORK_MODE[996] ? monthStatic.map(x => x.r_996) : monthStatic.map(x => x.r)
  const holidayData = monthStatic.map(x => x.h)

  const barOption = {
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
        label: {
          show: true,
          formatter
        },
        data: workData
      },
      {
        name: '补班',
        type: 'bar',
        stack: '上班',
        emphasis: {
          focus: 'series'
        },
        label: {
          show: true,
          formatter
        },
        data: lieuData
      },
      {
        name: '周末休息',
        type: 'bar',
        stack: '休息',
        emphasis: {
          focus: 'series'
        },
        label: {
          show: true,
          formatter
        },
        data: restData
      },
      {
        name: '节假休息',
        type: 'bar',
        stack: '休息',
        label: {
          show: true,
          formatter
        },
        emphasis: {
          focus: 'series'
        },
        data: holidayData
      },
    ]
  }
  return barOption
}