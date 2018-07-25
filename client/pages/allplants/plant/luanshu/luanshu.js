// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/luanshu.wav'
var finialTime = '00:43'
var max = 43
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 栾树Koelreuteria paniculata又名木栾、栾华等，是无患子科栾树属植物。为落叶乔木或灌木；树皮厚，灰褐色至灰黑色，老时纵裂；皮孔小，灰至暗揭色；小枝具疣点，与叶轴、叶柄均被皱曲的短柔毛或无毛。栾树春季发芽较晚，秋季落叶早，因此每年的生长期较短，生长缓慢。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;栾树是一种喜光，稍耐半荫的植物；耐寒；但是不耐水淹，中国北部及中部大部分省区均较常见，日本、朝鲜也有分布。'
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
      title: '栾树',
      //path: '/pages/allplants/plant/luanshu/luanshu',
      path: '/pages/allplants/allplants?pageName=luanshu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/luanshu.jpg'

    }
  }

})