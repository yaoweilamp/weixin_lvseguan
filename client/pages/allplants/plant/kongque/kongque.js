// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/banana/kongque.wav'
var finialTime = '00:40'
var max = 40
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;孔雀竹芋Calathea makoyana E. Morr.为竹芋科肖竹芋属多年生常绿草本。植株挺拔，株20-60厘米。叶柄紫红色， 叶片薄革质，黄绿色，卵状椭圆形，叶面上有墨绿与白色或淡黄相间的羽状斑纹，就像孔雀尾羽毛上的图案，因而得名。叶片有睡眠运动：白天舒展，晚间折叠起来。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;孔雀竹芋原产于巴西，性喜半阴，不耐直射阳光，适应在温暖、湿润的环境中生长。中国有引种栽培。'
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
      title: '孔雀竹芋',
      //path: '/pages/allplants/plant/kongque/kongque',
      path: '/pages/allplants/allplants?pageName=kongque',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/kongque.jpg'

    }
  }

})