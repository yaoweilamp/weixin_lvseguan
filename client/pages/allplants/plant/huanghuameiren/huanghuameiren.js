// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/banana/huanghuameiren.wav'
var finialTime = '00:58'
var max = 58
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;黄花美人蕉Canna indica L. var. flava Roxb.为美人蕉科美人蕉属多年生草本植物，高可达1.5米，全株绿色无毛，被蜡质白粉。具块状根茎。地上枝丛生。单叶互生；具鞘状的叶柄；叶片卵状长圆形。总状花序，花单生或对生；萼片3，绿白色；花冠、退化雄蕊杏黄色与正种美人蕉不同。唇瓣披针形，弯曲；蒴里，长卵形，绿色，花、果期3-12月。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原产印度，是一种大型的水生花卉，水陆两栖，适合陆地种植，也可在浅水区域生长。性喜温暖炎热气候，好阳光充足，及湿润肥沃的深厚土壤。中国多地有引种栽培。'
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
      title: '黄花美人蕉',
      //path: '/pages/allplants/plant/huanghuameiren/huanghuameiren',
      path: '/pages/allplants/allplants?pageName=huanghuameiren',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/huanghuameiren.jpg'

    }
  }

})