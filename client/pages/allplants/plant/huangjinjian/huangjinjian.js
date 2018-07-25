// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/huangjinjian.wav'
var finialTime = '00:52'
var max = 52
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;黄金间碧竹Bambusa vulgaris Schrader ex Wendland ‘Vittata’是禾本科簕竹属植物，为龙头竹的一个变种，竿稍疏离，高8-15米，直径5-9厘米，尾梢下弯，下部挺直或略呈“之”字形曲折，竿黄色，节间正常，但具宽窄不等的绿色纵条纹，箨鞘在新鲜时为绿色而具宽窄不等的黄色纵条纹，叶鞘初时疏生棕色糙硬毛，叶片窄被针形，两表面均无毛，先端渐尖具粗糙钻状尖头，基部近圆形而两侧稍不对称，小横脉在叶下表面略微可见。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我国南部亚热带地区有栽培，是一种既有经济价值、又有观赏价值的名优品种。'
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
      title: '黄金间碧竹',
      //path: '/pages/allplants/plant/huangjinjian/huangjinjian',
      path: '/pages/allplants/allplants?pageName=huangjinjian',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/huangjinjian.jpg'

    }
  }

})