// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/foduzhu.wav'
var finialTime = '00:48'
var max = 48
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;佛肚竹Bambusa ventricosa McClure为禾本科簕竹属丛生型竹类植物。幼秆深绿色，稍被白粉，老时转榄黄色。秆二型：正常圆筒形，高7-10米，节间30-35厘米；畸形秆通常25-50厘米，节间较正常短。箨叶卵状披针形；箨鞘无毛；箨耳发达，圆形或卵形至镰刀形；箨舌极短。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;性喜温暖、湿润、不耐寒。宜在肥沃、疏松、湿润、排水良好的砂质壤土中生长。产于中国广东，中国南方各地以及亚洲的马来西亚和美洲均有引种栽培。'
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
      title: '佛肚竹',
      //path: '/pages/allplants/plant/foduzhu/foduzhu',
      path: '/pages/allplants/allplants?pageName=foduzhu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/foduzhu.jpg'

    }
  }

})