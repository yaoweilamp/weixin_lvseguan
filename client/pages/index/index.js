var app = getApp()
var dataUrl = 'http://www.tianqiaokeji.com/wx_miniprogram/audio/lvseguan.wav'
var devices = getApp().globalData.devices;
var uuids = ['fda50693-a4e2-4fb1-afcf-c6eb07641001', 'fda50693-a4e2-4fb1-afcf-c6eb07641002', 'fda50693-a4e2-4fb1-afcf-c6eb07641003', 'fda50693-a4e2-4fb1-afcf-c6eb07641004'];
var key1 = getApp().globalData.key1;
var key2 = getApp().globalData.key2;
var key3 = getApp().globalData.key3;
var key4 = getApp().globalData.key4;

Page({
  onLoad: function(){
    //每次加载页面的时候打开开关
    key1 = true;
    key2 = true;
    key3 = true;
    key4 = true;
  },

  onShow: function () {
    //console.log('key1^^^^'+key1)
    
    var that = this;
    //var devices = [];
    var uuids = ['fda50693-a4e2-4fb1-afcf-c6eb07641001', 'fda50693-a4e2-4fb1-afcf-c6eb07641002',         'fda50693-a4e2-4fb1-afcf-c6eb07641003', 'fda50693-a4e2-4fb1-afcf-c6eb07641004'];
    //监测蓝牙状态的改变
    wx.onBluetoothAdapterStateChange(function (res) {
      if (res.available) {//如果用户打开蓝牙，开始搜索IBeacon
        searchBeacon();
      }
    })

    //搜索beacons
    searchBeacon();



    //搜索函数
    function searchBeacon() {
      //检测蓝牙状态
      wx.openBluetoothAdapter({
        success: function (res) {//蓝牙状态：打开
          wx.startBeaconDiscovery({//开始搜索附近的iBeacon设备
            //uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07647825', 'FDA50693-A4E2-4FB1-AFCF-C6EB07641025'],//参数uuid
            uuids: ['fda50693-a4e2-4fb1-afcf-c6eb07641001', 'fda50693-a4e2-4fb1-afcf-c6eb07641002', 'fda50693-a4e2-4fb1-afcf-c6eb07641003', 'fda50693-a4e2-4fb1-afcf-c6eb07641004'],//参数uuid
            success: function (res) {
              wx.onBeaconUpdate(function (res) {//监听 iBeacon 设备的更新事件
                //console.log("成功了吗？？？？")
                //console.log(res.beacons.length)
                if (res && res.beacons && res.beacons.length > 0) {
                  devices = res.beacons;
                  // 此处最好检测rssi是否等于0，等于0的话信号强度等信息不准确。我是5秒内重复扫描排重。
                }
                for (var i = 0; i < devices.length; i++) {
                  //console.log('key1*********' + key1);
                  if (devices[i].uuid === uuids[0] && devices[i].accuracy < 2 && key1 === true) {
                    //console.log('*****************123456*********');
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../index/banana_Introduce/banana_Introduce'
                      })
                    }, 2000);
                    //关掉开关
                    key1 = false;
                  }
                  if (devices[i].uuid === uuids[1] && devices[i].accuracy < 2 && key2 === true) {
                    //console.log('*****************654321*********');
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../index/flowers_Introduce/flowers_Introduce'
                      })
                    }, 2000);
                    //关掉开关
                    key2 = false;
                  }
                  if (devices[i].uuid === uuids[2] && devices[i].accuracy < 2 && key3 === true) {
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../index/bamboo_Introduce/bamboo_Introduce'
                      })
                    }, 2000);
                    //关掉开关
                    key3 = false;
                  }
                  if (devices[i].uuid === uuids[3] && devices[i].accuracy < 2 && key4 === true) {
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../index/palm_Introduce/palm_Introduce'
                      })
                    }, 2000);
                    //关掉开关
                    key4 = false;
                  }

                  //当设备离开一定的范围时
                  //if (devices[i].uuid === uuids[0]) {
                  //  console.log('devices[i].accuracy' + devices[i].accuracy);
                  //}
                  if (devices[i].uuid === uuids[0] && devices[i].accuracy >10 && key1 ===false){
                    key1 = true;
                  }
                  //if (devices[i].uuid === uuids[1]) {
                  //  console.log('devices[i].accuracy' + devices[i].accuracy);
                  //}
                  if (devices[i].uuid === uuids[1] && devices[i].accuracy > 10 && key2 === false) {
                    key2 = true;
                  }
                  if (devices[i].uuid === uuids[2] && devices[i].accuracy > 10 && key3 === false) {
                    key3 = true;
                  }
                  if (devices[i].uuid === uuids[3] && devices[i].accuracy > 10 && key4 === false) {
                    key4 = true;
                  }
                }


              });

            },
            fail: function (res) {
              //先关闭搜索再重新开启搜索,这一步操作是防止重复wx.startBeaconDiscovery导致失败
              stopSearchBeacom();
            }
          });

        },
        fail: function (res) {//蓝牙状态：关闭
          wx.showToast({ title: "请打开蓝牙", icon: "none", duration: 2000 })
        }
      })
    }

    //关闭成功后开启搜索
    function stopSearchBeacom() {
      wx.stopBeaconDiscovery({
        success: function () {
          searchBeacon();
        }
      })
    }
    
  },

  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  onHide: function(){
    clearInterval(this.updateInterval)
    wx.stopBackgroundAudio()
  },

  onUnload: function () {
    clearInterval(this.updateInterval)
    wx.stopBackgroundAudio()
  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    //每次下拉刷新的时候打开开关
    key1 = true;
    key2 = true;
    key3 = true;
    key4 = true;
    //console.log("key1*********"+key1);
  },

  onShareAppMessage: function (res) {
    return {
      title: '绿色馆',
      path: '/pages/index/index'

    }
  },

  

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://www.tianqiaokeji.com/wx_miniprogram/image/swiper01.png',
      'http://www.tianqiaokeji.com/wx_miniprogram/image/swiper02.png',
      'http://www.tianqiaokeji.com/wx_miniprogram/image/swiper03.png',
      'http://www.tianqiaokeji.com/wx_miniprogram/image/swiper04.png'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    playing: false,

    x: 0,

    btnhidden1: true,
    btnhidden2: true,
    btnhidden3: false,
    btnhidden4: true,
    landmark_index: 1,
    landmark_image1: 'http://www.tianqiaokeji.com/wx_miniprogram/image/Bamboo_landmark.png',
    landmark_image2: 'http://www.tianqiaokeji.com/wx_miniprogram/image/flowers_landmark.png',
    landmark_image3: 'http://www.tianqiaokeji.com/wx_miniprogram/image/palm_landmark.png',
    landmark_image4: 'http://www.tianqiaokeji.com/wx_miniprogram/image/banana_landmark.png'
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
  },
  

  changeLocation1: function (e) {
    this.setData({
      x: 60,
      landmark_index: 4,
      btnhidden1: false,
      btnhidden2: true,
      btnhidden3: true,
      btnhidden4: true
    });
  },

  changeLocation2: function (e) {
    this.setData({
      x: -10,
      landmark_index: 2,
      btnhidden2: false,
      btnhidden1: true,
      btnhidden3: true,
      btnhidden4: true
    });
  },

  changeLocation3: function (e) {
    this.setData({
      x: -80,
      landmark_index: 1,
      btnhidden3: false,
      btnhidden1: true,
      btnhidden2: true,
      btnhidden4: true
    });
  },

  changeLocation4: function (e) {
    this.setData({
      x: 0,
      landmark_index: 3,
      btnhidden4: false,
      btnhidden1: true,
      btnhidden2: true,
      btnhidden3: true,
    });
  },

  hyh: function (e) {
    var index = this.data.landmark_index;
    index += 1;
    if (index > 4) {
      index = 1;
    }
    if (index == 1) {
      this.changeLocation3()
    }
    if (index == 2) {
      this.changeLocation2()
    }
    if (index == 3) {
      this.changeLocation4()
    }
    if (index == 4) {
      this.changeLocation1()
    }
    this.setData({
      landmark_index: index
    })
  }

})