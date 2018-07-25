// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/banana/guoziman.wav'
var finialTime = '01:05'
var max = 65
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;果子蔓 Guzmania atilla 又名擎天凤梨、红杯凤梨、西洋凤梨，为凤梨科果子蔓属多年生草本植物。叶长带状，基部较宽，浅绿色，背面微红，薄而光亮，外弯，呈稍松散的莲座状排列，伞房花序由多数大形、阔披针形外苞片包围。叶长60厘米，宽5厘米。一生只在春季开1次花，花茎常高出叶丛20厘米以上，花茎、苞片及近花茎基部的数枚叶片均为深红色，保持时间甚长，观赏期可达3个月左石。 穗状花序高出叶丛，花茎、苞片和基部的数枚叶片呈鲜红色。花小白色。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;果子蔓原产热带美洲，喜高温高湿和阳光充足环境。20世纪80年代初引入我国，是目前十分流行的盆栽花卉之一。'
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
      title: '果子蔓',
      //path: '/pages/allplants/plant/guoziman/guoziman',
      path: '/pages/allplants/allplants?pageName=guoziman',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/guoziman.jpg'

    }
  }

})