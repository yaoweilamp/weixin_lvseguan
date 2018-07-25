// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/nantianzhu.wav'
var finialTime = '01:00'
var max = 60
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 南天竹Nandina domestica.，别名红枸子，兰竹，毛茛目小檗科常绿小灌木，是我国南方常见的木本花卉。茎常丛生而少分枝，高1-3米，光滑无毛，幼枝常为红色，老后呈灰色。叶互生，集生于茎的上部，三回羽状复叶，长30-50厘米；二至三回羽片对生；小叶薄革质，椭圆形或椭圆状披针形，长2-10厘米，宽0.5-2厘米，顶端渐尖，基部楔形，全缘，上面深绿色，冬季变红色，背面叶脉隆起，两面无毛；近无柄。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;南天竹性喜温暖及湿润的环境，较耐阴耐寒，容易养护。原产我国长江流域，日本、印度也有种植。'
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
      title: '南天竹',
      //path: '/pages/allplants/plant/nantianzhu/nantianzhu',
      path: '/pages/allplants/allplants?pageName=nantianzhu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/nantianzhu.jpg'

    }
  }

})