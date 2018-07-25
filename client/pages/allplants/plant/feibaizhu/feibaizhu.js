// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/feibaizhu.wav'
var finialTime = '00:46'
var max = 46
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 菲白竹Sasa fortunei (Van Houtte) Fiori，禾本科赤竹属，为世界上最小的竹子之一，杆高一般为10-30cm，观赏地被竹，矮小丛生，株型优美，叶片绿色间有黄色至淡黄色的纵条纹，笋期4～6月。可用于地被、小型盆栽，或配置在假山、大型山水盆景间，兼文化、观赏和生态于一体，是地被中的优良植物。菲白竹喜温暖湿润气候，好肥，较耐寒，忌烈日，宜半阴，喜肥沃疏松排水良好的砂质土壤。原产日本。中国华东地区有栽培。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;菲白竹喜温暖湿润气候，好肥，较耐寒，忌烈日，宜半阴，喜肥沃疏松排水良好的砂质土壤。该竹具有很强的耐阴性，可以在林下生长。'
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
      title: '菲白竹',
      //path: '/pages/allplants/plant/feibaizhu/feibaizhu',
      path: '/pages/allplants/allplants?pageName=feibaizhu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/feibaizhu.jpg'

    }
  }

})