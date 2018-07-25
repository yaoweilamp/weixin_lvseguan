// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/zhengzhuxiu.wav'
var finialTime = '01:01'
var max = 61
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 珍珠绣线菊Spiraea thunbergii Bl.蔷薇科、绣线菊属灌木，高可达1.5米；枝条呈弧形弯曲细长开张，小枝有稜角，无毛；叶片线状披针形，基部狭楔形，叶柄极短或近无柄，伞形花序无总梗，花3-7朵，基部簇生数枚小形叶片；萼筒钟状，萼片三角形或卵状三角形，花瓣倒卵形或近圆形，白色；花盘圆环形，子房无毛或微被短柔毛，蓇葖果开张，4-5月开花，7月结果。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原产中国华东。中国山东、陕西、辽宁等地均有栽培，日本也有分布。应花期很早，花朵密集如积雪，叶片薄细如鸟羽，秋季转变为桔红色，甚为美丽。可供观赏用。'
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
      title: '珍珠绣线菊',
      //path: '/pages/allplants/plant/zhengzhuxiu/zhengzhuxiu',
      path: '/pages/allplants/allplants?pageName=zhengzhuxiu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/zhengzhuxiu.jpg'

    }
  }

})