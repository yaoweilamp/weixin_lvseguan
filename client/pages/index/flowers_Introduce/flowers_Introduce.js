var app = getApp()
var util = require('../../../util/util.js')
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/flowers.wav'
var finialTime = '00:18'
var max = 18
var texts = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 中庭园位于绿色馆北侧，占地约2万平米，以展示各种美丽花卉和珍稀彩叶树木为主，包含二乔玉兰、紫薇、木槿、珍珠绣线菊等数十种花卉植物，是花卉爱好者的必游之园。'
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
    clubs: [
      {
        image: 'http://www.tianqiaokeji.com/wx_miniprogram/image/baibujizhu.jpg', name: '白哺鸡竹',
        url: '../../allplants/plant/baibujizhu/baibujizhu' },
      {
        image: 'http://www.tianqiaokeji.com/wx_miniprogram/image/mujin.jpg', name: '木槿',
        url: '../../allplants/plant/mujin/mujin' },
      {
        image: 'http://www.tianqiaokeji.com/wx_miniprogram/image/erqiaoyulan.jpg', name: '二乔玉兰',
        url: '../../allplants/plant/erqiaoyulan/erqiaoyulan' },
      {
        image: 'http://www.tianqiaokeji.com/wx_miniprogram/image/baihuadaye.jpg', name: '白花大叶醉鱼草',
        url: '../../allplants/plant/baihuadaye/baihuadaye' },
      {
        image: 'http://www.tianqiaokeji.com/wx_miniprogram/image/ziwei.jpg', name: '紫薇',
        url: '../../allplants/plant/ziwei/ziwei' }
    ],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    height: 0,

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

  //触摸开始事件
  touchstart: function (e) {
    console.log(e.touches[0].pageX);
    this.data.touchDot = e.touches[0].pageX;
    var that = this;
    this.data.interval = setInterval(function () {
      that.data.time += 1;
    }, 100);
  },
  //触摸移动事件
  touchmove: function (e) {
    let touchMove = e.touches[0].pageX;
    let touchDot = this.data.touchDot;
    let time = this.data.time;
    console.log("touchMove: " + touchMove + ", touchDot: " + touchDot + ", diff: " + (touchMove - touchDot));
    //向左滑动
    if (touchMove - touchDot <= -40 && time < 10 && !this.data.done) {
      console.log("向左滑动");
      this.data.done = true;
      this.scrollLeft();
    }
    //向右滑动
    if (touchMove - touchDot >= 40 && time < 10 && !this.data.done) {
      console.log("向右滑动");
      this.data.done = true;
      this.scrollRight();
    }
  },
  //触摸结束事件
  touchend: function (e) {
    clearInterval(this.data.interval);
    this.data.time = 0;
    this.data.done = false;
  },

  //向左滑动事件
  scrollLeft() {
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation5 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
    this.animation5 = animation5;

    this.animation1.translateX(-60).opacity(0).step();
    this.animation2.translateX(-140).opacity(0.5).scale(0.8, 0.8).step();
    this.animation3.translateX(-110).opacity(0.5).scale(1, 1).step();
    this.animation4.translateX(-70).opacity(1).scale(1.4, 1.4).step();
    this.animation5.translateX(-30).opacity(0.5).scale(1, 1).step();


    this.setData({
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
      animation5: animation5.export()
    })

    var that = this;
    setTimeout(function () {
      that.animation1.translateX(-50).opacity(0).scale(0.8, 0.8).step({ duration: 0, timingFunction: 'linear' });
      that.animation2.translateX(-40).opacity(0.5).scale(1, 1).step({ duration: 0, timingFunction: 'linear' });
      that.animation3.translateX(0).opacity(1).scale(1.4, 1.4).step({ duration: 0, timingFunction: 'linear' });
      that.animation4.translateX(40).opacity(0.5).scale(1, 1).step({ duration: 0, timingFunction: 'linear' });
      that.animation5.translateX(50).opacity(0).scale(0.8, 0.8).step({ duration: 0, timingFunction: 'linear' });
      that.setData({
        animation1: animation1.export(),
        animation2: animation2.export(),
        animation3: animation3.export(),
        animation4: animation4.export(),
        animation5: animation5.export()
      })
    }.bind(this), 195)

    let array = this.data.clubs;
    let shift = array.shift();
    array.push(shift);

    setTimeout(function () {
      this.setData({
        clubs: array
      })
    }.bind(this), 195)
  },

  //向右滑动事件
  scrollRight() {
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation5 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
    this.animation5 = animation5;

    this.animation1.translateX(30).opacity(0.5).scale(1, 1).step();
    this.animation2.translateX(70).opacity(1).scale(1.4, 1.4).step();
    this.animation3.translateX(110).opacity(0.5).scale(1, 1).step();
    this.animation4.translateX(120).opacity(0).scale(0.8, 0.8).step();
    this.animation5.translateX(130).opacity(0).step();


    this.setData({
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
      animation5: animation5.export()
    })

    var that = this;
    setTimeout(function () {
      that.animation1.translateX(-50).opacity(0).scale(0.8, 0.8).step({ duration: 0, timingFunction: 'linear' });
      that.animation2.translateX(-40).opacity(0.5).scale(1, 1).step({ duration: 0, timingFunction: 'linear' });
      that.animation3.translateX(0).opacity(1).scale(1.4, 1.4).step({ duration: 0, timingFunction: 'linear' });
      that.animation4.translateX(40).opacity(0.5).scale(1, 1).step({ duration: 0, timingFunction: 'linear' });
      that.animation5.translateX(50).opacity(0).scale(0.8, 0.8).step({ duration: 0, timingFunction: 'linear' });
      that.setData({
        animation1: animation1.export(),
        animation2: animation2.export(),
        animation3: animation3.export(),
        animation4: animation4.export(),
        animation5: animation5.export()
      })
    }.bind(this), 195)

    let array = this.data.clubs;
    let pop = array.pop();
    array.unshift(pop);

    setTimeout(function () {
      this.setData({
        clubs: array
      })
    }.bind(this), 195)
  },

  onShareAppMessage: function (res) {
    return {
      title: '中庭园',
      path: '/pages/index/flowers_Introduce/flowers_Introduce',
      imageUrl: 'http://www.tianqiaokeji.com/wx_miniprogram/image/flowers.jpg'

    }
  }

})