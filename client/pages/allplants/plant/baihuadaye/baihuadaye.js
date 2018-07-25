// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/baihuadaye.wav'
var finialTime = '00:45'
var max = 45
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大叶醉鱼草Buddleja davidii Franch. ‘White Profusion’是玄参科醉鱼草属灌木，高可达5米。小枝外展而下弯，幼枝、叶片膜质至薄纸质，狭卵形、狭椭圆形至卵状披针形，稀宽卵形，边缘具细锯齿，上面深绿色，被疏星状短柔毛，后变无毛。渔民常采其花、叶用来麻醉鱼，因此得名醉鱼草。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;花序繁茂且花香，是一种很好的引蝶花卉。在北方园林中可应用于草地、坡地丛植观赏，也可作切花用。在欧美常作道路绿化带、绿地、花坛花灌木。'
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
      title: '百花大叶醉鱼草',
      //path: '/pages/allplants/plant/baihuadaye/baihuadaye',
      path: '/pages/allplants/allplants?pageName=baihuadaye',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/baihuadaye.jpg'

    }
  }

})