// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/maozhu.wav'
var finialTime = '00:59'
var max = 59
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 毛竹Phyllostachys heterocycla (Carr.) Mitford cv. Pubescens属禾本科刚竹属，单轴散生型常绿乔木状竹类植物，竿高可达20多米，粗可达20多厘米，老竿无毛，并由绿色渐变为绿黄色；壁厚约1厘米；竿环不明显，末级小枝2-4叶；叶耳不明显，叶舌隆起；叶片较小较薄，披针形，下表面在沿中脉基部柔毛，花枝穗状，无叶耳，小穗仅有1朵小花；花丝长4厘米，柱头羽毛状。颖果长椭圆形，顶端有宿存的花柱基部。4月笋期，5-8月开花。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;毛竹是中国原产，长江以南，生长着世界上85%的毛竹。毛竹是中国栽培悠久、面积最广、经济价值也最重要的竹种。'
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
      title: '毛竹',
      //path: '/pages/allplants/plant/maozhu/maozhu',
      path: '/pages/allplants/allplants?pageName=maozhu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/maozhu.jpg'

    }
  }

})