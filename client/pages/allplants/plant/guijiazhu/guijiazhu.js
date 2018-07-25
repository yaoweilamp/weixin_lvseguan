// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/guijiazhu.wav'
var finialTime = '00:51'
var max = 51
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 龟甲竹Phyllostachys heterocycla (Carr.) Mitford，又称龙鳞竹、黍节竹，属禾本科刚竹属，竿高达20余米，粗者可达20余厘米。竹杆的节片像龟甲又似龙鳞，凹凸有致，坚硬粗糙。秆基部以至相当长一段秆的节间连续呈不规则的短缩肿胀，并交斜连续如龟甲状。笋期4月，花期5-8月。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;喜温暖湿润的气候，分布于中国秦岭、汉水流域至长江流域以南和台湾省，黄河流域也有多处栽培。1737年引入日本栽培，后又引至欧美各国。龟甲竹种易种植成活但难以繁植，为中国的珍稀观赏竹种。'
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
      title: '龟甲竹',
      //path: '/pages/allplants/plant/guijiazhu/guijiazhu',
      path: '/pages/allplants/allplants?pageName=guijiazhu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/guijiazhu.jpg'

    }
  }

})