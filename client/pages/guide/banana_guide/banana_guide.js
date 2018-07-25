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
      { name: "芭蕉", show: true, search: "芭蕉", url: "../../allplants/plant/bajiao/bajiao", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/bajiao.jpg" },
      { name: "春羽", show: true, search: "春羽", url: "../../allplants/plant/chunyu/chunyu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/chunyu.jpg" },
      { name: "高山榕", show: true, search: "高山榕", url: "../../allplants/plant/gaoshanrong/gaoshanrong", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/gaoshanrong.jpg" },
      { name: "果子蔓", show: true, search: "果子蔓", url: "../../allplants/plant/guoziman/guoziman", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/guoziman.jpg" },
      { name: "黄花美人蕉", show: true, search: "黄花美人蕉", url: "../../allplants/plant/huanghuameiren/huanghuameiren", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/huanghuameiren.jpg" },
      { name: "金脉爵床", show: true, search: "金脉爵床", url: "../../allplants/plant/jinmaijue/jinmaijue", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/jinmaijue.jpg" },
      { name: "孔雀竹芋", show: true, search: "孔雀竹芋", url: "../../allplants/plant/kongque/kongque", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/kongque.jpg" },
      { name: "旅人蕉", show: true, search: "旅人蕉", url: "../../allplants/plant/lvrenjiao/lvrenjiao", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/lvrenjiao.jpg" },
      { name: "尼古拉鹤望兰", show: true, search: "尼古拉鹤望兰", url: "../../allplants/plant/nigula/nigula", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/nigula.jpg" },
      { name: "蝎尾蕉", show: true, search: "蝎尾蕉", url: "../../allplants/plant/xieweijiao/xieweijiao", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/xieweijiao.jpg" }
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