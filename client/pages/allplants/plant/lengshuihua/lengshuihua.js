// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/lengshuihua.wav'
var finialTime = '00:52'
var max = 52
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;冷水花Pilea notata C. H. Wright别称透明草、透白草，荨麻科冷水花属多年生草本植物。具匍匐茎，茎肉质，纤细，中部稍膨大，叶柄纤细，常无毛，稀有短柔毛；托叶大，带绿色。花雌雄异株，花被片绿黄色，花药白色或带粉红色，花丝与药隔红色。瘦果小，圆卵形，熟时绿褐色。 花期6-9月，果期9-11月。全草可药用，有清热利湿、生津止渴和退黄护肝之效。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分布于中国广西、广东，经长江流域中、下游诸省，北达陕西南部和河南南部；越南、日本有分布。'
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
      title: '冷水花',
      //path: '/pages/allplants/plant/lengshuihua/lengshuihua',
      path: '/pages/allplants/allplants?pageName=lengshuihua',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/lengshuihua.jpg'

    }
  }

})