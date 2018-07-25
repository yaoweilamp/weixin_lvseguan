// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/jiupingna.wav'
var finialTime = '01:00'
var max = 60
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;酒瓶椰Hyophorbe lagenicaulis (L.H.Bailey) H.E.Moore是棕榈科酒瓶椰属常绿观赏植物，因其茎干似酒瓶而得名。茎干平滑，中部以下膨大，近顶部渐狭成长颈状，高1~2.5米，最大茎粗38－60厘米。羽状复叶，小叶披针形，40－60对，叶数较少，常不超过5片；小叶线状披针形，淡绿色。肉穗花序多分支，油绿色。浆果椭圆，熟时黑褐色。酒瓶椰生长较慢，从种子育苗到开花结果，常需时20多年，每株开花至果实成熟需18个月，但寿命可长达数十年，也是少数能直接栽种于海边的棕榈植物。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原产非洲马斯克林群岛，中国南方多地引种栽培。'
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
      title: '酒瓶椰',
      //path: '/pages/allplants/plant/jiupingna/jiupingna',
      path: '/pages/allplants/allplants?pageName=jiupingna',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/jiupingna.jpg'

    }
  }

})