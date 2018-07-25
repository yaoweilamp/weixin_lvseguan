// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/huweiye.wav'
var finialTime = '00:57'
var max = 57
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;狐尾椰Wodyetia bifurcata A.K.Irvine又称狐尾棕，是棕榈科狐尾椰属常绿乔木。茎单生，高12—15米，直径可达30厘米或更粗，羽状叶长可达3米以上，羽片披针形，排列紧闭轮生于叶轴上，使叶成狐尾状。穗状花序，分枝较多，雌雄同株。果卵形，长6~8厘米，熟时橘红色至橙红色。喜温暖、湿润、光照充足的生长环境，耐寒、耐旱、抗风，冬季不低于-5摄氏度均可安全过冬。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;。狐尾椰原产于澳大利亚昆土兰州，因植株高大挺拔，形态优美，耐寒耐旱，适应性广的特点，迅速成为热带、亚热带地区最受欢迎的园林植物之一。'
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
      title: '狐尾椰',
      //path: '/pages/allplants/plant/huweiye/huweiye',
      path: '/pages/allplants/allplants?pageName=huweiye',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/huweiye.jpg'

    }
  }

})