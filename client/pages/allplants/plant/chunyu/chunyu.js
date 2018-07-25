// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/banana/chunyu.wav'
var finialTime = '00:59'
var max = 59
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;春羽Philodenron selloum Koch是天南星科喜林芋属多年生常绿草本观叶植物。植株高大，可 达1.5米以上。茎极短，直立性，呈木质化，生有很多气生根。叶柄坚挺而细长，可达1米。叶为簇生型，着生于茎端，叶片巨大，为广心脏形，叶长达60厘米、宽40厘米，全叶羽状深裂似手掌状，革质，浓绿而有光泽。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;春羽喜高温多湿环境，对光线的要求不严格，不耐寒，耐阴暗，在室内光线不过于微弱之地，均可盆养，喜肥沃、疏松、排水良好的微酸性土壤，冬季温度不低于5℃。原产巴西、巴拉圭等地，我国华南亚热带地区有栽培。'
Page({
  onLoad: function (options) {

    this._enableInterval()

    if (app.globalData.backgroundAudioPlaying) {
      this.setData({
        playing: true
      })
    }
    if (!app.globalData.backgroundAudioPlaying) {
      this.setData({
        playing: false
      })
    }

    this.stop()
  },

  data: {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00',
    finialPlayTime: finialTime,
    max: max,

    texts: texts
  },

  setContainerHeight: function (e) {
    this.setData({
      height: 200
    })
  },

  play: function (res) {
    var that = this
    wx.playBackgroundAudio({
      dataUrl: dataUrl,
      complete: function (res) {
        that.setData({
          playing: true
        })
      }
    })
    this._enableInterval()
  },

  seek: function (e) {
    clearInterval(this.updateInterval)
    var that = this
    wx.seekBackgroundAudio({
      position: e.detail.value,
      complete: function () {
        // 实际会延迟一秒左右才跳过去
        setTimeout(function () {
          that._enableInterval()
        }, 1000)
      }
    })
  },

  pause: function () {
    var that = this
    wx.pauseBackgroundAudio({
      dataUrl: dataUrl,
      success: function () {
        that.setData({
          playing: false
        })
      }
    })
    app.globalData.backgroundAudioPlaying = false
  },

  _enableInterval: function () {
    var that = this
    update()
    this.updateInterval = setInterval(update, 500)
    function update() {
      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          if (res.currentPosition == null) {
            res.currentPosition = 0
          }
          that.setData({
            playTime: res.currentPosition,
            formatedPlayTime: util.formatTime(res.currentPosition)
          })
        },
      })
    }
  },

  stop: function () {
    var that = this
    wx.onBackgroundAudioStop(function () {
      that.setData({
        playing: false,
        playTime: 0,
        formatePlayTime: util.formatTime(0)
      })
    });
  },

  //页面关闭
  onUnload: function () {
    clearInterval(this.updateInterval)
    wx.stopBackgroundAudio()
  },

  onShareAppMessage: function (res) {
    return {
      title: '春羽',
      //path: '/pages/allplants/plant/chunyu/chunyu',
      path: '/pages/allplants/allplants?pageName=chunyu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/chunyu.jpg'

    }
  }

})