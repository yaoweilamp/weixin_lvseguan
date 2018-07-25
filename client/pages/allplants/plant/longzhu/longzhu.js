// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/longzhu.wav'
var finialTime = '00:42'
var max = 42
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 龙竹Dendrocalamus giganteus Munro.又名大麻竹，属禾本科牡竹属，此为世界上最大的竹类之一。直立，梢端下垂或长下垂，节处不隆起；幼时在外表被有白蜡粉；竿分枝习性高，每节分多枝，主枝常不发达。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龙竹为暖热性喜湿怕寒竹种，有一定的抗旱耐瘠能力，适生于热带、南亚热带和中亚热带等气候环境。在我国云南、东南至西南部各地均有分布，台湾也有栽培。国外在亚洲热带和亚热带各国家亦有栽培。'
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
      title: '龙竹',
      //path: '/pages/allplants/plant/longzhu/longzhu',
      path: '/pages/allplants/allplants?pageName=longzhu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/longzhu.jpg'

    }
  }


})