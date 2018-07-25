// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/jianali.wav'
var finialTime = '01:02'
var max = 62
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加拿利海枣Phoenix canariensis又称长叶刺葵，为棕榈科刺葵属常绿乔木，是国际著名的景观树。株高10~15米，茎秆粗壮。具波状叶痕，羽状复叶，顶生丛出，较密集，长可达6米，每叶有100多对小叶（复叶），小叶狭条形，长100厘米左右，宽2~3厘米，近基部小叶成针刺状，基部由黄褐色网状纤维包裹。穗状花序腋生，长可至1米以上；花小，黄褐色；浆果，卵状球形至长椭圆形，熟时黄色至淡红色。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原产于非洲加拿利群岛，我国早在19世纪就有零星引种。由于其树形优美舒展，富有热带风情，近些年在南方地区被广泛栽培，用于公园造景、行道绿化。'
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
      title: '加拿利海枣',
      //path: '/pages/allplants/plant/jianali/jianali',
      path: '/pages/allplants/allplants?pageName=jianali',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/jianali.jpg'

    }
  }

})