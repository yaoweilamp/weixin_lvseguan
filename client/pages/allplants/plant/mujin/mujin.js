// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/mujin.wav'
var finialTime = '01:02'
var max = 62
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 木槿Hibiscus syriacus Linn.锦葵科木槿属落叶灌木，高3-4米，小枝密被黄色星状绒毛。叶菱形至三角状卵形，先端钝，基部楔形，边缘具不整齐齿缺，下面沿叶脉微被毛或近无毛。木槿花单生于枝端叶腋间，花萼钟形，密被星状短绒毛，；花朵色彩有纯白、淡粉红、淡紫、紫红等，花形呈钟状，有单瓣、复瓣、重瓣几种。外面疏被纤毛和星状长柔毛。蒴果卵圆形，密被黄色星状绒毛；种子肾形，背部被黄白色长柔毛。花期7-10月。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;木槿是一种在庭园很常见的灌木花种，原产中国中部各省，各地均有栽培。在园林中可做花篱式绿篱，孤植和丛植均可。'
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
      title: '木槿',
      //path: '/pages/allplants/plant/mujin/mujin',
      path: '/pages/allplants/allplants?pageName=mujin',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/mujin.jpg'

    }
  }

})