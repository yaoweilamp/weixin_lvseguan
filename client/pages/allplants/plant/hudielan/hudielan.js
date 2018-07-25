// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/hudielan.wav'
var finialTime = '01:06'
var max = 66
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蝴蝶兰Phalaenopsis aphrodite Rchb. F.为兰科蝴蝶兰属，为附生性兰花。茎很短，常被叶鞘所包。叶片稍肉质，上面绿色，背面紫色，椭圆形，长圆形或镰刀状长圆形，先端锐尖或钝，基部楔形或有时歪斜，具短而宽的鞘。花序侧生于茎的基部，不分枝或有时分枝；花序柄绿色，被数枚鳞片状鞘；花序轴紫绿色，多少回折状，常具数朵由基部向顶端逐朵开放的花；花苞片卵状三角形；花梗连同子房绿色，纤细；花白色，美丽，花期长达4-6月。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;蝴蝶兰出生于泰国、菲律宾、马来西亚、印度尼西亚，及中国台湾等热带地区，本性喜暖畏寒。因花朵形如蝴蝶飞舞，深受花迷们的青睐，素有“洋兰王后”之称。'
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
      title: '蝴蝶兰',
      //path: '/pages/allplants/plant/hudielan/hudielan',
      path: '/pages/allplants/allplants?pageName=hudielan',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/hudielan.jpg'

    }
  }

})