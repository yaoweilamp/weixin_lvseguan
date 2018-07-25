// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/lvseguan.wav'
var finialTime = '01:08'
var max = 68
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;园博会绿色馆定位为大型生态温室，会时承担花卉植物展示功能，其独特的建筑类型与展览内容形成了绿色馆的特色。建筑以“绿色为名”，一是因为展览的内容为植物，二是为了表达低碳生活的理念，打造绿色建筑，展示绿色梦想。\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;绿色馆分为棕榈园、芭蕉园、竹园、中庭园四大园区，为广大游客展示北方地区少见的热带、亚热带园林观赏植物。全馆搭配智能展示系统：植物全息投影可以展示植物的立体图像，并配有专业语音讲解。植物智能识别系统让游客可以通过手机扫描二维码或者扫描照片，来识别植物名称及相关信息。参观者还可以通过手机来体验展馆导览服务，不用导游，自主完成位置定位、语音讲解、游览路线推荐、VR全景体验等功能。'
Page({
  onLoad: function(options) {
    this.setData({
      title: options.title
    })

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
    imgUrls: [
      'http://www.tianqiaokeji.com/wx_miniprogram/image/house01.png',
      'http://www.tianqiaokeji.com/wx_miniprogram/image/house02.png',
      'http://www.tianqiaokeji.com/wx_miniprogram/image/swiper01.png',
      'http://www.tianqiaokeji.com/wx_miniprogram/image/swiper02.png'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    height:0,

    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00',
    finialPlayTime: finialTime,
    max: max,

    texts: texts
  },

  setContainerHeight:function(e){
    this.setData({
      height:400
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
    //app.globalData.backgroundAudioPlaying = true
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
      title: '绿色馆介绍',
      path: '/pages/index/green_Introduce/green_Introduce'

    }
  }

})