Page({

  data: {
    plantList: []//页面显示的数据
  },
  input1: function (e) {//输入时 实时调用搜索方法
    this.search(e.detail.value)
  },
  search: function (key) {//搜索方法 key 用户输入的查询字段

    var This = this;

    var plantList = wx.getStorage({
      key: 'plantList',
      success: function (res) {//从storage中取出存储的数据
        if (key == "") {//用户没有输入 全部显示
          //for (let i in res.data) {
          //  res.data[i].show = true
          //}
          This.setData({
            plantList: res.data
          })
          return;
        }

        var arr = [];//临时数组 用于存放匹配到的数据
        for (let i in res.data) {

          if (res.data[i].search.indexOf(key) >= 0) {    //查找       
            res.data[i].show = true;//匹配到的数据显示
            arr.push(res.data[i])
          }
        }
        if (arr.length == 0) {
          This.setData({
            plantList: [{ show: true, name: '无相关数据' }]
          })
        } else {
          This.setData({
            plantList: arr//找到的数据在页面显示
          })
        }

      },
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var plantList = [
      { name: "白哺鸡竹", show: true, search: "白哺鸡竹", url: "../../allplants/plant/baibujizhu/baibujizhu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/baibujizhu.jpg" },
      { name: "菲白竹", show: true, search: "菲白竹", url: "../../allplants/plant/feibaizhu/feibaizhu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/feibaizhu.jpg" },
      { name: "凤尾竹", show: true, search: "凤尾竹", url: "../../allplants/plant/fengweizhu/fengweizhu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/fengweizhu.jpg" },
      { name: "佛肚竹", show: true, search: "佛肚竹", url: "../../allplants/plant/foduzhu/foduzhu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/foduzhu.jpg" },
      { name: "龟甲竹", show: true, search: "龟甲竹", url: "../../allplants/plant/guijiazhu/guijiazhu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/guijiazhu.jpg" },
      { name: "黄金间碧竹", show: true, search: "黄金间碧竹", url: "../../allplants/plant/huangjinjian/huangjinjian", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/huangjinjian.jpg" },
      { name: "龙竹", show: true, search: "龙竹", url: "../../allplants/plant/longzhu/longzhu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/longzhu.jpg" },
      { name: "毛竹", show: true, search: "毛竹", url: "../../allplants/plant/maozhu/maozhu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/maozhu.jpg" },
      { name: "南天竹", show: true, search: "南天竹", url: "../../allplants/plant/nantianzhu/nantianzhu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/nantianzhu.jpg" },
      { name: "紫竹", show: true, search: "紫竹", url: "../../allplants/plant/zizhu/zizhu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/zizhu.jpg" }
    ]
    wx.setStorage({//获取的时候存储在本地
      key: 'plantList',
      data: plantList,
    })
    this.setData({
      plantList: plantList//页面加载时 显示所有数据
    })
  }

})