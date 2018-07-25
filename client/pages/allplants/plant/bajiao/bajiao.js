// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/banana/bajiao.wav'
var finialTime = '01:00'
var max = 60
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;芭蕉Musa basjoo Siebold为多年生草本植物，植株高2.5-4米。叶片长圆形，先端钝，基部圆形或不对称，叶面鲜绿色，有光泽；叶柄粗壮，长达30 厘米。花序顶生，下垂；苞片红褐色或紫色；雄花生于花序上部，雌花生于花序下部；雌花在每一苞片内约10-16朵，排成2列；合生花被片长4-4.5厘米，离生花被片几与合生花被片等长，顶端具小尖头。浆果三棱状，长圆形，长5-7厘米，肉质松软。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;芭蕉原产琉球群岛，性喜温暖耐寒力弱，茎分生能力强，耐半荫，生长较快，中国秦岭淮河以南地区可以露地栽培。'
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
      title: '芭蕉',
      //path: '/pages/allplants/plant/bajiao/bajiao',
      path: '/pages/allplants/allplants?pageName=bajiao',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/bajiao.jpg'

    }
  }

})