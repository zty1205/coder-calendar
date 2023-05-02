import hoildayList from "../../data/hoildayList"
import lieuList from "../../data/lieuList"
import { nextTick } from "../../weapp/common/utils"

Page<{
  list: TimeItem[];
  type: string;
  bothShow: boolean
}, Record<string, any>>({
  data: {
    list: [],
    type: '1',
    bothShow: false
  },
  onLoad(query: { type: string }) {
    this.setData({
      type: query.type
    })
    this.init(query.type)
  },
  onShareAppMessage() {
    return {}
  },
  init(type: string) {
    const target: TimeItem[] = this.getTarget(type)
    this.setTitle(type)
    this.setData({
      list: target
    })
    nextTick(() => {
      this.scroll()
    })
  },
  getTarget(type: string): TimeItem[] {
    if (type === '1') return hoildayList
    if (type === '2') return lieuList
    return hoildayList.concat(lieuList).sort((a, b) => {
      return Number(a.m) * 100 + Number(a.d) - Number(b.m) * 100 - Number(b.d)
    })
  },
  setTitle(type: string) {
    wx.setNavigationBarTitle({
      title: type === '2' ? '全年补班表格' : '全年节假日表格'
    })
  },
  scroll() {
    const now = Date.now()
    const idx = this.data.list.findIndex(item => {
      return now < new Date(`${item.y}/${item.m}/${item.d}`).getTime()
    })
    if (idx === -1) return
    wx.pageScrollTo({
      scrollTop: idx * 80
    })
  },
  handleBothShowChange(data: WxDomEvent<{ value: boolean }>) {
    const val = data.detail.value
    this.setData({
      bothShow: val
    })
    this.init(val ? '3' : this.data.type)
  },
  handleChart() {
    wx.navigateTo({
      url: '/pages_time/statistics/index'
    })
  }
})