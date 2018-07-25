// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/huashengdun.wav'
var finialTime = '01:00'
var max = 60
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;华盛顿棕Washingtonia robusta别称华棕，老人葵，是棕榈科丝葵属大型常绿乔木，树高可达27米，树干基部通常不膨大（近基部直径约75-105厘米），顶端稍细，被许多下垂的枯叶遮住，若去掉枯叶，树干呈灰色，可见明显的纵向裂缝和不太明显的环状叶痕，叶基密集，不规则；叶大型，叶片长1.8米，约分裂至中部而成50-80个裂片，花序大型，生于叶间，分枝3-4枝，弓状下垂。耐热，耐寒性均较强。成龄树能忍受50℃高温及-12℃低温。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原产墨西哥西北部和美国加利福尼亚等地，目前我国热带、亚热带地区有分布。'
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
      title: '华盛顿棕',
      //path: '/pages/allplants/plant/huashengdun/huashengdun',
      path: '/pages/allplants/allplants?pageName=huashengdun',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/huashengdun.jpg'

    }
  }

})