import timeList from '../../data/timeList';

interface WxPageData {
  y: string;
  m: string;
  d: string;
  lm: string;
  ld: string;
  gy: string;
  gm: string;
  gd: string;
  an: string;
  cd: string;
  av: string[];
  st: string[];
  t: string;
}

Page<WxPageData, Record<string, any>>({
  data: {
    y: '',
    m: '',
    d: '',
    lm: '',
    ld: '',
    gy: '',
    gm: '',
    gd: '',
    an: '',
    cd: '',
    av: [],
    st: [],
    t: ''
  },
  onLoad(query: { y: string; m: string; d: string }) {
    this.init(query || {});
  },
  onShareAppMessage() {
    return {
      path: `/pages/perpetual/index?y=${this.data.y}&m=${this.data.m}&d=${this.data.d}`
    };
  },
  init(query: { m: string; d: string }) {
    const now = new Date();
    const m = query.m || String(now.getMonth() + 1);
    const d = query.d || String(now.getDate());
    const nowDataInfo = timeList.find((t) => t.m === m && t.d === d);

    this.setData({
      y: nowDataInfo?.y,
      m: nowDataInfo?.m,
      d: nowDataInfo?.d,
      lm: nowDataInfo?.lm,
      ld: nowDataInfo?.ld,
      gy: nowDataInfo?.gy,
      gm: nowDataInfo?.gm,
      gd: nowDataInfo?.gd,
      an: nowDataInfo?.an,
      cd: nowDataInfo?.cd,
      av: nowDataInfo?.av?.split('.'),
      st: nowDataInfo?.st?.split('.'),
      t: nowDataInfo?.t
    });
  }
});
