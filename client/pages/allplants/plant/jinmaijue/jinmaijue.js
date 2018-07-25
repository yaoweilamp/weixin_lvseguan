// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/banana/jinmaijue.wav'
var finialTime = '01:05'
var max = 65
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金脉爵床Sanchezia speciosa J.Leonard又称金叶木，为爵床科黄脉爵床属多年生常绿观叶植物。金脉爵床为直立灌木状，盆栽种植株高一般50－80厘米。多分枝，茎干半木质化。叶对生，无叶柄，阔披针形，长15－30厘米、宽5－10厘米，先端渐尖，基部宽楔形，叶缘锯齿；叶片嫩绿色，叶脉橙黄色。夏秋季开出黄色的花，花为管状，簇生于短花茎上，每簇8－10朵，整个花簇为一对红色的苞片包围。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金脉爵床原产南美，性喜温暖湿润，生长适温为20~30℃，越冬温度为10℃。金脉爵床叶片上有明显的橙黄色叶脉，线条清晰、色彩光亮，是观赏价值较高的室内观叶植物之一。'
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
      title: '金脉爵床',
      //path: '/pages/allplants/plant/jinmaijue/jinmaijue',
      path: '/pages/allplants/allplants?pageName=jinmaijue',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/jinmaijue.jpg'

    }
  }

})