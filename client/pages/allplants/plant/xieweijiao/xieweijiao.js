// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/banana/xieweijiao.wav'
var finialTime = '00:45'
var max = 45
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蝎尾蕉Heliconia metallica Planch. et Linden ex Hook. f.为芭蕉科蝎尾蕉属多年生草本植物。株高可达260厘米。叶片长圆形，叶面绿色，叶背亮紫色；顶生花序，直立，薄被短柔毛；苞片绿色，开放时突露，花被片红色，顶端绿色，狭圆柱形，果三棱形，灰蓝色，有种子不多于3颗。因花序形状酷似蝎尾而引人注目。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蝎尾蕉主要分布于美洲热带地区和太平洋诸岛，喜光，喜温暖、湿润的环境。中国广东、云南、厦门、北京等地方有引种。'
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
      title: '蝎尾蕉',
      //path: '/pages/allplants/plant/xieweijiao/xieweijiao',
      path: '/pages/allplants/allplants?pageName=xieweijiao',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/xieweijiao.jpg'

    }
  }

})