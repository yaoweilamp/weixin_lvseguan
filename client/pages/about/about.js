// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onShareAppMessage: function (res) {
    return {
      title: '关于我们',
      path: '/pages/about/about'

    }
  }
})