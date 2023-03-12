import { getUserSync, saveUserSync } from '../../data/user';

Page({
  data: {
    avatarShow: 'width:200rpx;height:200rpx;margin:0 40rpx;',
    avatarHidden: 'width:0;height:0;margin:0;',
    user: {
      name: '', // 昵称
      desc: '', // desc 描述
      sex: '', // 性别 0女1男
      salary: '', // salary 工资
      salaryDay: '' // 发薪日
    },
    salaryDayList: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27'
    ]
  },
  onLoad() {
    this.getUser();
  },
  onReady() {
    this.setData({
      avatarShow: this.data.avatarShow + 'transition: all .8s;',
      avatarHidden: this.data.avatarHidden + 'transition: all .8s;'
    });
  },
  onNameInput(data: WxDomEvent<{ value: string }>) {
    this.setData({
      'user.name': data.detail.value
    });
  },
  onDescInput(data: WxDomEvent<{ value: string }>) {
    this.setData({
      'user.desc': data.detail.value
    });
  },
  onSexChange(data: WxDomEvent<{ value: string }>) {
    this.setData({
      'user.sex': data.detail.value
    });
  },
  onSalaryInput(data: WxDomEvent<{ value: string }>) {
    const num = data.detail.value.replace(/[^\d]/g, '');
    this.setData({
      'user.salary': num
    });
    return num;
  },
  onSalaryDayChange(data: WxDomEvent<{ value: string }>) {
    this.setData({
      'user.salaryDay': data.detail.value
    });
  },
  handleSave() {
    const user = this.data.user;

    saveUserSync({
      name: user.name ? user.name.trim() : '',
      desc: user.desc ? user.desc.trim() : '',
      sex: user.sex,
      salary: user.salary ? Number(user.salary) : 0,
      salaryDay: user.salaryDay ? Number(user.salaryDay) + 1 : 0
    });

    wx.nextTick(() => {
      wx.navigateBack({
        delta: 1
      });
    });
  },
  getUser() {
    const user = getUserSync();
    this.setData({
      user: {
        name: user.name,
        desc: user.desc,
        sex: user.sex,
        salary: user.salary ? String(user.salary) : '',
        salaryDay: user.salaryDay ? String(Number(user.salaryDay) - 1) : ''
      }
    });
  }
});
