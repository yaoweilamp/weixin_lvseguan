// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/zihongye.wav'
var finialTime = '00:52'
var max = 52
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 紫红叶鸡爪槭Acer Palmatum f. atropurpureum槭树科槭属落叶小乔木，是鸡爪槭的园艺变种。株高一般不超过4m，树冠开展；枝略下垂，小枝细瘦，新枝紫红色，成熟枝暗红色；嫩叶艳红，密生白色软毛，叶片舒展后渐脱落，叶色亦由艳丽转淡紫色甚至泛暗绿色；单叶交互对生，叶片掌状深裂达基部，裂片狭、长呈羽毛裂，有皱纹，入秋逐渐转红。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;紫红叶鸡爪槭原产我国长江流域，喜气候温凉湿润、雨量充沛、温度较大的半阴环境，为珍贵彩叶树木，广泛应用于公园、庭院、小区绿化。'
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
      title: '紫红叶鸡爪槭',
      //path: '/pages/allplants/plant/zihongye/zihongye',
      path: '/pages/allplants/allplants?pageName=zihongye',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/zihongye.jpg'

    }
  }

})