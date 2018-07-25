// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/ziwei.wav'
var finialTime = '00:55'
var max = 55
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 紫薇Lagerstroemia indica L.别名痒痒花、百日红，是千屈菜科紫薇属落叶灌木或小乔木，高可达7米；树皮平滑，灰色或灰褐色；枝干多扭曲，小枝纤细，叶互生或有时对生，纸质，椭圆形、阔矩圆形或倒卵形，幼时绿色至黄色，成熟时或干燥时呈紫黑色，室背开裂；种子有翅，长约8毫米。花期6-9月，果期9-12月。紫薇树姿优美，树干光滑洁净，花色艳丽；开花时正当夏秋少花季节，花期长，故有“百日红”之称。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;紫薇其喜暖湿气候，喜光，略耐阴，喜肥，在我国众多省份均有分布。'
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
      title: '紫薇',
      //path: '/pages/allplants/plant/ziwei/ziwei',
      path: '/pages/allplants/allplants?pageName=ziwei',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/ziwei.jpg'

    }
  }

})