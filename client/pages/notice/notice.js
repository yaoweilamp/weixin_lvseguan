var app = getApp()
var util = require('../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/notice.wav'
var finialTime = '02:14'
var max = 134
Page({
  data: {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00',
    finialPlayTime: finialTime,
    max: max,
  },

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

  //页面隐藏
  onHide: function () {
    clearInterval(this.updateInterval)
    wx.stopBackgroundAudio()
  },

  //页面关闭
  onUnload: function () {
    clearInterval(this.updateInterval)
    wx.stopBackgroundAudio()
  },

  openindex: function(){
    wx.navigateTo({
      url: '../about/about'
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: '绿色馆游园须知',
      path: '/pages/notice/notice'

    }
  }

})