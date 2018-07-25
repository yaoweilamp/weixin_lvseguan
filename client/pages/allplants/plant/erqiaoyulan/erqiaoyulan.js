// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/erqiaoyulan.wav'
var finialTime = '00:53'
var max = 53
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 二乔玉兰Magnolia soulangeana Soul.-Bod.又名珠砂玉兰 ，属木兰科落叶小乔木或灌木。株高7～9m，为玉兰和木兰的杂交种。叶倒卵形至卵状长椭圆形，花大，呈钟状，内面白色，外面淡紫，有芳香，花萼似花瓣，但长仅达其半，亦有呈小形而绿色者。叶前开花，花期与玉兰相若。各种二乔玉兰均较玉兰、木兰更为耐寒、耐旱，移植难。花大色艳，观赏价值很高，是城市绿化的极好花木。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原产于我国南方，性喜阳光和温暖湿润的气候，国外分布分布于北美至南美的委内瑞拉东南部和亚洲的热带及温带地区。'
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
      title: '二乔玉兰',
      //path: '/pages/allplants/plant/erqiaoyulan/erqiaoyulan',
      path: '/pages/allplants/allplants?pageName=erqiaoyulan',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/erqiaoyulan.jpg'

    }
  }

})