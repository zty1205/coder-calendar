import hoildayList from '../../data/hoildayList';
import lieuList from '../../data/lieuList';
import { TimeTableType } from '../../utils/constant';
import { nextTick } from '../../weapp/common/utils';

Page<
  {
    list: TimeItem[];
    type: string;
    bothShow: boolean;
    curDateStamp: number;
  },
  Record<string, any>
>({
  data: {
    list: [],
    type: TimeTableType.BOTH,
    bothShow: false,
    curDateStamp: 0
  },
  onLoad(query: { type: string; curDateStamp: string }) {
    this.setData({
      type: query.type,
      curDateStamp: Number(query.curDateStamp) || Date.now()
    });
    this.init(query.type);
  },
  onShareAppMessage() {
    return {};
  },
  init(type: string) {
    const target: TimeItem[] = this.getTarget(type);
    this.setTitle(type);
    this.setData({
      list: target
    });
    nextTick(() => {
      this.scroll();
    });
  },
  getTarget(type: string): TimeItem[] {
    if (type === TimeTableType.HOLIDAY) return hoildayList;
    if (type === TimeTableType.LIEU) return lieuList;
    return hoildayList.concat(lieuList).sort((a, b) => {
      return Number(a.m) * 100 + Number(a.d) - Number(b.m) * 100 - Number(b.d);
    });
  },
  setTitle(type: string) {
    wx.setNavigationBarTitle({
      title: type === TimeTableType.LIEU ? '全年补班表格' : '全年节假日表格'
    });
  },
  scroll() {
    const now = this.data.curDateStamp;
    const idx = this.data.list.findIndex((item) => {
      return now < new Date(`${item.y}/${item.m}/${item.d}`).getTime();
    });
    if (idx === -1) return;
    wx.pageScrollTo({
      scrollTop: (idx + 1) * 80
    });
  },
  handleBothShowChange(data: WxDomEvent<{ value: boolean }>) {
    const val = data.detail.value;
    this.setData({
      bothShow: val
    });
    this.init(val ? TimeTableType.BOTH : this.data.type);
  },
  handleChart() {
    wx.navigateTo({
      url: '/pages_time/statistics/index'
    });
  }
});
