// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/baibujizhu.wav'
var finialTime = '00:49'
var max = 49
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 白哺鸡竹Phyllostachys dulcis McClure是禾本科，刚竹属笋用竹植物。竿高可达10米，幼竿逐渐被少量白粉，老竿灰绿色，常有淡黄色或橙红色的隐约细条纹和斑块；竿环甚隆起，高于箨环。箨鞘质薄，箨舌拱形，淡紫褐色，箨片带状，末级小枝叶耳及繸毛易脱落；叶舌显著伸出；叶片下表面被毛，基部之毛尤密。4月下旬笋期。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;笋味鲜美，供食用；竿可作柄材用，分布于中国江苏、浙江，浙江杭州，宜栽植在背风向阳处，喜空气湿润较大的环境。'
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
      title: '白哺鸡竹',
      //path: '/pages/allplants/plant/baibujizhu/baibujizhu',
      //path: '/pages/allplants/allplants?pageId=baibujizhu',
      path: '/pages/allplants/allplants?pageName=baibujizhu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/baibujizhu.jpg'

    }
  }

})