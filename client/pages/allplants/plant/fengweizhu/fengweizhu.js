// pages/index/green_Introduce/green_Introduce.js
var app = getApp()
var util = require('../../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/bamboo/fengweizhu.wav'
var finialTime = '01:01'
var max = 61
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;凤尾竹Bambusa multiplex (Lour.) Raeusch. ex Schult. Fernleaf R. A. Young是禾本科簕竹属孝顺竹的变种。植株较高大，杆高可达6米，竿中空，小枝稍下弯，下部挺直，绿色；竿壁稍薄；节处稍隆起，无毛；叶鞘无毛，纵肋稍隆起，背部具脊；叶耳肾形，边缘具波曲状细长繸毛；叶舌圆拱形，叶片线形，上表面无毛，下表面粉绿而密被短柔毛，小穗含小花，中间小花为两性；外稃两侧稍不对称，长圆状披针形，先端急尖；内稃线形，脊上被短纤毛，花药紫色，子房卵球形，羽毛状。成熟颖果未见。\n &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;凤尾竹喜酸性、微酸性或中性土壤，原产越南，我国东南部至西南部亦有分布。'
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
          /*
          if(res.currentPosition == null){
            wx.stopBackgroundAudio()
            res.currentPosition = 0
            
            that.setData({
              playTime: 0,
              formatedPlayTime: util.formatTime(0)
            })
          }*/
          /*
          if (res.currentPosition == null) {
            res.currentPosition = 0
            that.setData({
              playing: false
            })
            app.globalData.backgroundAudioPlaying = false
          }
          */
          //else {
          //  that.setData({
          //    playing: true
          //  })
          //}
          if (res.currentPosition == null) {
            res.currentPosition = 0
          }
          that.setData({
            playTime: res.currentPosition,
            formatedPlayTime: util.formatTime(res.currentPosition)
          })
        },
        /*
        fail: function(res) {
          that.setData({
            playing: false,
            playTime: 0,
            formatePlayTime: util.formatTime(0)
          })
        }
        */
      })
    }
  },

  stop: function(){
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
      title: '凤尾竹',
      //path: '/pages/allplants/plant/fengweizhu/fengweizhu',
      path: '/pages/allplants/allplants?pageName=fengweizhu',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/fengweizhu.jpg'

    }
  }

})