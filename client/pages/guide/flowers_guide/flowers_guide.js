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
      { name: "二乔玉兰", show: true, search: "二乔玉兰", url: "../../allplants/plant/erqiaoyulan/erqiaoyulan", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/erqiaoyulan.jpg" },
      { name: "金焰绣线菊", show: true, search: "金焰绣线菊", url: "../../allplants/plant/jinyanxiu/jinyanxiu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/jinyanxiu.jpg" },
      { name: "白花大叶醉鱼草", show: true, search: "白花大叶醉鱼草", url: "../../allplants/plant/baihuadaye/baihuadaye", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/baihuadaye.jpg" },
      { name: "金叶复叶槭", show: true, search: "金叶复叶槭", url: "../../allplants/plant/jinyefuye/jinyefuye", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/jinyefuye.jpg" },
      { name: "栾树", show: true, search: "栾树", url: "../../allplants/plant/luanshu/luanshu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/luanshu.jpg" },
      { name: "木槿", show: true, search: "木槿", url: "../../allplants/plant/mujin/mujin", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/mujin.jpg" },
      { name: "油松", show: true, search: "油松", url: "../../allplants/plant/yousong/yousong", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/yousong.jpg" },
      { name: "珍珠绣线菊", show: true, search: "珍珠绣线菊", url: "../../allplants/plant/zhengzhuxiu/zhengzhuxiu", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/zhengzhuxiu.jpg" },
      { name: "紫红叶鸡爪槭", show: true, search: "紫红叶鸡爪槭", url: "../../allplants/plant/zihongye/zihongye", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/zihongye.jpg" },
      { name: "紫薇", show: true, search: "紫薇", url: "../../allplants/plant/ziwei/ziwei", src: "http://www.tianqiaokeji.com/wx_miniprogram/image/ziwei.jpg" }

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