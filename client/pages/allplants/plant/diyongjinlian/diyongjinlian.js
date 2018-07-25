// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/palm/diyongjinlian.wav'
var finialTime = '01:08'
var max = 68
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地涌金莲Musella lasiocarpa (Franch.) C. Y. Wu ex H. W. Li又称地金莲，是芭蕉科地涌金莲属植物。植株丛生，具水平向根状茎。假茎矮小，高不及60厘米，基径约15厘米，基部有宿存的叶鞘。叶片长椭圆形，长达0.5米，宽约20厘米，先端锐尖，基部近圆形，两侧对称，有白粉。花序直立，直接生于假茎上，密集如球穗状，长20-25厘米，苞片干膜质，黄色或淡黄色，有花2列，每列4-5花；合生花被片卵状长圆形，先端具5齿裂，离生花被片先端微凹，凹陷处具短尖头。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地涌金莲被佛教寺院定为“五树六花”之一，也是傣族文学作品中善良的化身和惩恶的象征。原产中国云南，四川省也有分布，为中国特产花卉。'
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
      title: '地涌金莲',
      //path: '/pages/allplants/plant/diyongjinlian/diyongjinlian',
      path: '/pages/allplants/allplants?pageName=diyongjinlian',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/diyongjinlian.jpg'

    }
  }

})