// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/zizhu.wav'
var finialTime = '00:54'
var max = 54
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 紫竹Phyllostachys nigra （Lodd. ex Lindl.）Munro又称黑竹、墨竹，禾本科刚竹属，竿高4-8米，直径可达5厘米，幼竿绿色，密被细柔毛及白粉，箨环有毛，一年生以后的竿逐渐先出现紫斑，最后全部变为紫黑色，无毛；箨片三角形至三角状披针形，绿色，但脉为紫色，舟状，直立或以后稍开展，微皱曲或波状。笋期4月下旬。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;紫竹喜温暖湿润气候，耐寒，能耐-20℃低温、耐阴、忌积水、适合砂质排水性良好的土壤，对气候适应性强。原产中国，南北各地多有栽培，印度、日本及欧美许多国家均引种栽培。'
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
      title: '紫竹',
      //path: '/pages/allplants/plant/zizhu/zizhu',
      path: '/pages/allplants/allplants?pageName=zizhu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/zizhu.jpg'

    }
  }

})