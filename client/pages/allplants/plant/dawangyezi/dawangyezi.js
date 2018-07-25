// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/dawangyezi.wav'
var finialTime = '01:03'
var max = 63
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大王椰子Roystonea regia (HBK.)O.F. Cook又称王棕，为棕桐科王棕属多年生常绿大乔木，树高10～20 米，根系极发达。树干高耸挺拔，基部向上膨大，中部向上变细，呈酒瓶状，幼树则基部膨大，随生长变粗变大，具有明显老叶脱落后叶鞘留下的节状环痕，老干呈灰白色。奇数羽状复叶互生，叶长可达3～5 米。肉穗花序生于叶鞘束下，排列成圆锥花序方式粉生，多分枝，花序长可达50厘米以上花小，白色，雌雄同株并同一个花序。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原产中美洲古巴、牙买加、巴拿马等地，我国华南、东南各省区引种已久，是目前我国行道树和园林树中最高大、最能代表东南亚热带风光的棕榈科植物之一。'
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
      title: '大王椰子',
      //path: '/pages/allplants/plant/dawangyezi/dawangyezi',
      path: '/pages/allplants/allplants?pageName=dawangyezi',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/dawangyezi.jpg'

    }
  }

})