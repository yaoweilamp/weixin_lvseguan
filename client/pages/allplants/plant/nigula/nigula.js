// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/banana/nigula.wav'
var finialTime = '00:51'
var max = 51
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 尼古拉鹤望兰Strelitzia nicolai别名大鹤望兰，为芭蕉科鹤望兰属植物，是著名的观赏花卉。茎干高达8米，木质。叶片长圆形，基部圆形，不等侧，叶柄长1.8米。花序腋生，总花梗较叶柄为短，花序上通常有2个大型佛焰苞，佛焰苞绿色而染红棕色，舟状，顶端渐尖，内有花4-9朵。萼片披针形，白色，下方的1 枚背具龙骨状脊突，箭头状花瓣天蓝色。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尼古拉鹤望兰原产非洲南部，喜温暖湿润，不耐寒；耐旱，不耐湿涝。我国台湾广东等地已引种栽培。'
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
      title: '尼古拉鹤望兰',
      //path: '/pages/allplants/plant/nigula/nigula',
      path: '/pages/allplants/allplants?pageName=nigula',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/nigula.jpg'

    }
  }

})