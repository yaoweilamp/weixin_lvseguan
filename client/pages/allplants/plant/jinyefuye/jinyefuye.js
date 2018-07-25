// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/jinyefuye.wav'
var finialTime = '00:57'
var max = 57
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 金叶复叶槭Acer negundo‘Aurea’ 槭树科槭树属，是北美复叶槭的栽培变种,从北美引进。金叶复叶槭为落叶乔木，高10m左右，属速生树种。小枝光滑，奇数羽状复叶，叶较大，对生，小叶椭圆形，长3cm~ 5cm，叶春季金黄色。叶背平滑，缘有不整齐粗齿。先花后叶，花单性，无花瓣，两翅成锐角。喜光，喜冷凉气候，耐干旱、耐寒冷、耐轻度盐碱地，喜疏松肥沃土壤，耐烟尘，根萌蘖性强，生长较快。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金叶复叶槭是欧美彩叶树种中，金叶系的最有代表树种，我国华北、东北、西北及华东地区均有栽培。'
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
      title: '金叶复叶槭',
      //path: '/pages/allplants/plant/jinyefuye/jinyefuye',
      path: '/pages/allplants/allplants?pageName=jinyefuye',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/jinyefuye.jpg'

    }
  }

})