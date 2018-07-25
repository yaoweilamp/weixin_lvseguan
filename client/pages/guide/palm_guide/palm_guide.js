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
      { name: "大王椰子", show: true, search: "大王椰子", url: "../../allplants/plant/dawangyezi/dawangyezi", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/dawangyezi.jpg" },
      { name: "地涌金莲", show: true, search: "地涌金莲", url: "../../allplants/plant/diyongjinlian/diyongjinlian", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/diyongjinlian.jpg" },
      { name: "狐尾椰", show: true, search: "狐尾椰", url: "../../allplants/plant/huweiye/huweiye", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/huweiye.jpg" },
      { name: "蝴蝶兰", show: true, search: "蝴蝶兰", url: "../../allplants/plant/hudielan/hudielan", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/hudielan.jpg" },
      { name: "花叶艳山姜", show: true, search: "花叶艳山姜", url: "../../allplants/plant/huayeyanshan/huayeyanshan", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/huayeyanshan.jpg" },
      { name: "华盛顿棕", show: true, search: "华盛顿棕", url: "../../allplants/plant/huashengdun/huashengdun", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/huashengdun.jpg" },
      { name: "加拿利海枣", show: true, search: "加拿利海枣", url: "../../allplants/plant/jianali/jianali", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/jianali.jpg" },
      { name: "假槟榔", show: true, search: "假槟榔", url: "../../allplants/plant/jiabinglang/jiabinglang", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/jiabinglang.jpg" },
      { name: "酒瓶椰", show: true, search: "酒瓶椰", url: "../../allplants/plant/jiupingna/jiupingna", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/jiupingna.jpg" },
      { name: "冷水花", show: true, search: "冷水花", url: "../../allplants/plant/lengshuihua/lengshuihua", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/lengshuihua.jpg" }
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