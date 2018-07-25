// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/huayeyanshan.wav'
var finialTime = '00:53'
var max = 53
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;花叶艳山姜Alpinia zerumbet ’Variegata’又称花叶良姜、彩叶姜、斑纹月桃等，是姜科山姜属多年生草本观叶植物，为艳山姜的园艺栽培种。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;植株高1-2米，具根茎。叶具鞘，长椭圆形，两端渐尖，有金黄色纵斑纹，十分艳丽。 圆锥花序呈总状花序式，花序下垂，花蕾包藏于总苞片中，花白色，边缘黄色，顶端红色，唇瓣广展，花大而美丽并具有香气。夏季6-7月开花。蒴果卵圆形，种子有棱角。花叶艳山姜原产于亚热带地区，中国东南部至南部有分布，各地城市均有栽培。'
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
      title: '花叶艳山姜',
      //path: '/pages/allplants/plant/huayeyanshan/huayeyanshan',
      path: '/pages/allplants/allplants?pageName=huayeyanshan',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/huayeyanshan.jpg'

    }
  }

})