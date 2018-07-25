// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers/yousong.wav'
var finialTime = '00:59'
var max = 59
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 油松Pinus tabuliformis Carrière为松科针叶常绿乔木，高达30米，胸径可达1米。树皮下部灰褐色，裂成不规则鳞块。大枝平展或斜向上，老树平顶；小枝粗壮，雄球花柱形，聚生于新枝下部呈穗状；球果卵形或卵圆形。花期5月，球果第二年10月上、中旬成熟。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;心材淡黄红褐色，边材淡黄白色，纹理直，结构较细密，材质较硬，耐久用。为阳性树种，深根性，喜光、抗瘠薄、抗风，在土层深厚、排水良好的酸性、中性或钙质黄土上，-25℃的气温下均能生长。为中国特有树种，东北、中原、西北和西南等省区均出产。'
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
      title: '油松',
      //path: '/pages/allplants/plant/yousong/yousong',
      path: '/pages/allplants/allplants?pageName=yousong',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/yousong.jpg'

    }
  }

})