// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/banana/gaoshanrong.wav'
var finialTime = '00:57'
var max = 57
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高山榕Ficus altissima Bl.为桑科榕属常绿大乔木，高25-30米，胸径40-90厘米；树皮灰色，平滑；幼枝绿色，被微柔毛。叶厚革质，广卵形至广卵状椭圆形，先端钝，急尖，基部宽楔形，全缘，两面光滑，无毛，基生侧脉延长，侧脉5-7对；叶柄粗壮；托叶厚革质，外面被灰色绢丝状毛。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高山榕为阳性树种，喜高温多湿气候，耐干旱瘠薄，抗风，抗大气污染，生长迅速，移栽容易成活，是极佳的城市绿化树种。在我国海南、广西、云南、四川等省及东南亚、南亚诸多国家均有分布。'
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
      title: '高山榕',
      //path: '/pages/allplants/plant/gaoshanrong/gaoshanrong',
      path: '/pages/allplants/allplants?pageName=gaoshanrong',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/gaoshanrong.jpg'

    }
  }

})