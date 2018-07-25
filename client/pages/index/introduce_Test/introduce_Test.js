var devices = getApp().globalData.devices;
var uuids = ['fda50693-a4e2-4fb1-afcf-c6eb07647825', 'fda50693-a4e2-4fb1-afcf-c6eb07641025'];
var key1 = true
var outkey1 = false

Page({

  data: {
    //device:[],
    uuidArray:[
      'FDA50693-A4E2-4FB1-AFCF-C6EB07647825',
      'FDA50693-A4E2-4FB1-AFCF-C6EB07641025'
    ],
  },

  /*
  onLoad: function (options) {
    var devices = [];

    // 开始扫描
    wx.startBeaconDiscovery({
      uuids: uuidArray,
      //uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07647825','FDA50693-A4E2-4FB1-AFCF-C6EB07641025'],
      success: function () {
        console.log("开始扫描设备...");
        // 监听iBeacon信号
        wx.onBeaconUpdate(function (res) {
          // 请注意，官方文档此处又有BUG，是res.beacons，不是beacons。
          if (res && res.beacons && res.beacons.length > 0) {
            devices = res.beacons;
            // 此处最好检测rssi是否等于0，等于0的话信号强度等信息不准确。我是5秒内重复扫描排重。
            wx.navigateTo({
              url: '../../about/about'
            })
          }
        });
      }
    });

    // 超时停止扫描
    setTimeout(function () {
      wx.stopBeaconDiscovery({
        success: function () {
          console.log("停止设备扫描！");
          console.log(devices);
        }
      });
    }, 5 * 1000);
  },
  */


  onShow: function () {
    var that = this;
    //var devices = [];
    var uuids = ['fda50693-a4e2-4fb1-afcf-c6eb07647825', 'fda50693-a4e2-4fb1-afcf-c6eb07641025'];
    //监测蓝牙状态的改变
    wx.onBluetoothAdapterStateChange(function (res) {
      if (res.available) {//如果用户打开蓝牙，开始搜索IBeacon
        searchBeacon();
      }
    })

    //搜索beacons
    searchBeacon();
    //获取beacon
    if (devices.length > 0){
      getibeacon();
    }

  

    //搜索函数
    function searchBeacon() {
      //检测蓝牙状态
      wx.openBluetoothAdapter({
        success: function (res) {//蓝牙状态：打开
          wx.startBeaconDiscovery({//开始搜索附近的iBeacon设备
            //uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07647825', 'FDA50693-A4E2-4FB1-AFCF-C6EB07641025'],//参数uuid
            uuids: ['fda50693-a4e2-4fb1-afcf-c6eb07647825', 'fda50693-a4e2-4fb1-afcf-c6eb07641025'],//参数uuid
            success: function (res) {
              wx.onBeaconUpdate(function (res) {//监听 iBeacon 设备的更新事件  
                //wx.getBeacons( {//获取所有已搜索到的iBeacon设备
                //  success: function (res){
                    //console.log("成功了吗？？？？")
                    //console.log(res.beacons.length)
                    if (res && res.beacons && res.beacons.length > 0) {
                      //console.log("说句话呀？？？？")
                      devices = res.beacons;
                      // 此处最好检测rssi是否等于0，等于0的话信号强度等信息不准确。我是5秒内重复扫描排重。
                    }
                    for (var i = 0; i < devices.length; i++) {
                      //console.log('key1*********' + key1);
                      if (devices[i].uuid === uuids[0] && key1 === true) {
                        console.log('*****************123456*********');
                        setTimeout(function () {
                          wx.navigateTo({
                            //url: '../../about/about'
                            //url: '../about/about'
                            url: '../palm_Introduce/palm_Introduce'
                          })
                        }, 2000);
                        //关掉开关
                        key1 = false;
                      }
                    }

                    //是否离开了信号范围
                    function outrange() {
                      //console.log("11111111" + res.beacons.length)
                      var i = devices.length;
                      while (i--) {
                        if (devices[i].uuid === uuids[0]) {
                          return false
                        }
                      }
                      return true
                    }

                    //outkey1 = outrange();
                    // 实际会延迟5秒才触发方法
                    setTimeout(function () {
                      outkey1 = outrange()
                    }, 5000);
                    console.log('outkey1' + outkey1);

                    //当outkey1为true时表示出了信号范围，将开关key1打开
                    if (outkey1) {
                      key1 = true
                    }
                    //console.log('key1' + key1);

                
                    /*
                    for (var i = 0; i < devices.length; i++) {
                      console.log('devices[0]' + res.beacons[0].uuid);
                      console.log('devices[1]' + res.beacons[1].uuid);
                      console.log('uuids[0]' + uuids[0]);
                      console.log('uuids[1]' + uuids[1]);
                      if (devices[i].uuid === uuids[0]) {
                        wx.navigateTo({
                          url: '../../about/about'
                        })
                      }
                      if (devices[i].uuid == uuids[1]) {
                        wx.navigateTo({
                          url: '../flowers_Introduce/flowers_Introduce'
                        })
                      }
                    }
                    */

                  //}
                //})
              });
              
            },
            fail: function (res) {
              //先关闭搜索再重新开启搜索,这一步操作是防止重复wx.startBeaconDiscovery导致失败
              stopSearchBeacom();
            }
          });

          //wx.onBeaconServiceChange(function (res) {
          //  if (res.available) {//如果IBeacon服务的状态变化
          //    wx.getBeacons({//监听 iBeacon 设备的更新事件  
          //      success: function (res) {
          //        console.log("成功了吗？？？？")
          //        console.log(devices.length)
                  //if (res && res.beacons && res.beacons.length > 0) {
                  // console.log("说句话呀？？？？")
                  //devices = res.beacons;
                  // 此处最好检测rssi是否等于0，等于0的话信号强度等信息不准确。我是5秒内重复扫描排重。
                  //}
          //        for (var i = 0; i < devices.length; i++) {
          //          console.log('devices[0]' + res.beacons[0].uuid);
          //          console.log('devices[1]' + res.beacons[1].uuid);
          //          console.log('uuids[0]' + uuids[0]);
          //          console.log('uuids[1]' + uuids[1]);
          //          if (devices[i].uuid === uuids[0]) {
          //            wx.navigateTo({
          //              url: '../../about/about'
          //            })
          //          }
          //          if (devices[i].uuid == uuids[1]) {
          //            wx.navigateTo({
          //              url: '../flowers_Introduce/flowers_Introduce'
          //            })
          //          }
          //        }
          //     }
          //    })
          //  }
          //})
          
        },
        fail: function (res) {//蓝牙状态：关闭
          wx.showToast({ title: "请打开蓝牙", icon: "none", duration: 2000 })
        }
      })
    }

    
    function getibeacon() {
      wx.getBeacons({//获取所有已搜索到的iBeacon设备
        uuid: 'fda50693-a4e2-4fb1-afcf-c6eb07647825',
        success: function (res) {
          console.log("111111111111")
          if (res && res.beacons && res.beacons.length > 0) {
            console.log("2222222222")
            devices = res.beacons;
            // 此处最好检测rssi是否等于0，等于0的话信号强度等信息不准确。我是5秒内重复扫描排重。
            console.log("devices.length" + devices.length)
          }
          for (var i = 0; i < devices.length; i++) {
            console.log('devices[0]' + res.beacons[0].uuid);
            console.log('devices[1]' + res.beacons[1].uuid);
            console.log('uuids[0]' + uuids[0]);
            console.log('uuids[1]' + uuids[1]);
            if (devices[i].uuid === uuids[0]) {
              wx.navigateTo({
                url: '../../about/about'
                //url: '../about/about'
              })
            }
            if (devices[i].uuid == uuids[1]) {
              wx.navigateTo({
                url: '../flowers_Introduce/flowers_Introduce'
              })
            }
          }
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

  //app.js里的onShow
  /*
  onShow: function () {
    console.log('App Show')
    
    var that = this;
    var devices = [];
    var uuids = ['fda50693-a4e2-4fb1-afcf-c6eb07641025', 'fda50693-a4e2-4fb1-afcf-c6eb07647825'];
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
            //uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07641025', 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825'],//参数uuid
            uuids: ['fda50693-a4e2-4fb1-afcf-c6eb07641025', 'fda50693-a4e2-4fb1-afcf-c6eb07647825'],//参数uuid
            success: function (res) {
              wx.onBeaconUpdate(function (res) {//监听 iBeacon 设备的更新事件  
                //wx.getBeacons( {//获取所有已搜索到的iBeacon设备
                //  success: function (res){
                console.log("成功了吗？？？？")
                console.log(res.beacons.length)
                if (res && res.beacons && res.beacons.length > 0) {
                  //console.log("说句话呀？？？？")
                  devices = res.beacons;
                  // 此处最好检测rssi是否等于0，等于0的话信号强度等信息不准确。我是5秒内重复扫描排重。
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
          wx.showToast({ title: "请打开蓝牙", icon: "none", duration: 5000 })
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
    
  },*/

  onHide: function () {

    //获取beacon
    getibeacon();


    function getibeacon() {
      wx.getBeacons({//获取所有已搜索到的iBeacon设备
        success: function (res) {
          console.log("111111111111")
          if (res && res.beacons && res.beacons.length > 0) {
            console.log("2222222222")
            devices = res.beacons;
            // 此处最好检测rssi是否等于0，等于0的话信号强度等信息不准确。我是5秒内重复扫描排重。
          }
          for (var i = 0; i < devices.length; i++) {
            console.log('devices[0]' + res.beacons[0].uuid);
            console.log('devices[1]' + res.beacons[1].uuid);
            console.log('uuids[0]' + uuids[0]);
            console.log('uuids[1]' + uuids[1]);
            if (devices[i].uuid === uuids[0]) {
              wx.navigateTo({
                url: '../../about/about'
                //url: '../about/about'
              })
            }
            /*
            if (devices[i].uuid == uuids[1]) {
              wx.navigateTo({
                url: '../flowers_Introduce/flowers_Introduce'
              })
            }
            */
          }
        }
      })
    }
  }

  
})