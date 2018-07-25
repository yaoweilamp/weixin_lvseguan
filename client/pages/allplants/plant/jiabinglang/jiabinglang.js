// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/jiabinglang.wav'
var finialTime = '00:54'
var max = 54
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;假槟榔Archontophoenix alexandrae (F. Muell.) H. Wendl. et Drude又称亚历山大椰子，为棕榈科常绿乔木，高达10-25m。干幼时绿色，老则灰白色，光滑而有梯形环纹，基部略膨大。羽状复叶簇生干端，长达2～3m，小叶排成二列，条状披针形，长30～35cm，宽约5cm，背面有灰白色鳞秕状覆被物，侧脉及中脉明显；叶鞘筒状包干，绿色光滑。花单性同株，花序生于叶丛之下。果卵球形，红色美丽。喜光，喜高温多湿气候，不耐寒。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原产澳大利亚东部，我国华南城市引进照片栽培为庭园风景树或行道树。'
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
      title: '假槟榔',
      //path: '/pages/allplants/plant/jiabinglang/jiabinglang',
      path: '/pages/allplants/allplants?pageName=jiabinglang',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/jiabinglang.jpg'

    }
  }
})