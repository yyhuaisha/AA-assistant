//index.js
//获取应用实例
// const app = getApp()
import rpn from '../../utils/rpn'

Page({
  data: {
    //页面配置
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,

    totalInput: '',
    total: '',
    payment: '',
    discount: '',
    price: '',
    pricePay: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    var that = this
    // 获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })
  },
  // 滑动切换tab
  bindChange: function(e) {
    var that = this
    that.setData({ currentTab: e.detail.current })
  },
  //点击tab切换
  swichNav: function(e) {
    var that = this
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  // 外卖小助手部分

  // 总价
  bindTotalInput: function(e) {
    const reg = /[-+*/]$/
    let val = e.detail.value
    while (reg.test(val)) {
      val = val.replace(reg, '')
    }

    const total = rpn.calCommonExp(val) | 0

    this.setData({
      totalInput: val,
      total: total
    })
    this.calculateDiscount()
  },
  // 实付款
  bindPayment: function(e) {
    this.setData({
      payment: e.detail.value
    })
    this.calculateDiscount()
  },
  // 折扣
  bindDiscount: function(e) {
    this.setData({
      discount: e.detail.value
    })
  },
  // 单价
  bindPrice: function(e) {
    this.setData({
      price: e.detail.value,
      pricePay: e.detail.value * this.data.discount
    })
  },
  // 计算折扣
  calculateDiscount: function() {
    if (
      Number(this.data.total) > Number(this.data.payment) &&
      Number(this.data.payment) > 0
    ) {
      let discount = (
        Number(this.data.payment) / Number(this.data.total)
      ).toFixed(2)
      this.setData({
        discount: discount
      })
    }
  }
})
