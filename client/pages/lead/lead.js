Page({
  data: {

  },

  onLoad: function () {
    // 实际会延迟两秒左右才跳过去
    setTimeout(function () {
      //that.openindex()
      wx.switchTab({
        url: '../index/index'
      })
    }, 2000)
  },

  openindex: function () {
    wx.switchTab({
      url: '../index/index'
    })
  }

})