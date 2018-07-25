// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/jinyanxiu.wav'
var finialTime = '00:49'
var max = 49
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金焰绣线菊Spiraea x bumalda cv.Gold Flame为蔷薇科绣线菊属落叶灌木，栽培种，芽小，，单叶互生，具锯齿、缺刻或分裂，稀全缘，羽状脉，或基部具3-5出脉，叶柄短，无托叶。花两性，稀杂性；花序伞形、伞形总状、伞房状或圆锥状。瞢荚果5，常沿腹缝开裂。种子数粒、细小；胚乳量或无。其叶色有丰富的季相变化，有较高的观赏价值。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金焰绣线菊较耐庇荫，喜潮湿气候，在温暖向阳而又潮湿的地方生长良好。原产美国，现中国各地均有种植。'
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
      title: '金艳绣线菊',
      //path: '/pages/allplants/plant/jinyanxiu/jinyanxiu',
      path: '/pages/allplants/allplants?pageName=jinyanxiu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/jinyanxiu.jpg'

    }
  }

})