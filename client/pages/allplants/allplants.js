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
      { name: "白哺鸡竹", show: true, search: "白哺鸡竹", url: "plant/baibujizhu/baibujizhu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/baibujizhu.jpg" },
      { name: "菲白竹", show: true, search: "菲白竹", url: "plant/feibaizhu/feibaizhu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/feibaizhu.jpg" },
      { name: "凤尾竹", show: true, search: "凤尾竹", url: "plant/fengweizhu/fengweizhu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/fengweizhu.jpg" },
      { name: "佛肚竹", show: true, search: "佛肚竹", url: "plant/foduzhu/foduzhu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/foduzhu.jpg" },
      { name: "龟甲竹", show: true, search: "龟甲竹", url: "plant/guijiazhu/guijiazhu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/guijiazhu.jpg" },
      { name: "黄金间碧竹", show: true, search: "黄金间碧竹", url: "plant/huangjinjian/huangjinjian", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/huangjinjian.jpg"},
      { name: "龙竹", show: true, search: "龙竹", url: "plant/longzhu/longzhu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/longzhu.jpg" },
      { name: "毛竹", show: true, search: "毛竹", url: "plant/maozhu/maozhu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/maozhu.jpg" },
      { name: "南天竹", show: true, search: "南天竹", url: "plant/nantianzhu/nantianzhu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/nantianzhu.jpg" },
      { name: "紫竹", show: true, search: "紫竹", url: "plant/zizhu/zizhu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/zizhu.jpg" },

      { name: "二乔玉兰", show: true, search: "二乔玉兰", url: "plant/erqiaoyulan/erqiaoyulan", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/erqiaoyulan.jpg" },
      { name: "金焰绣线菊", show: true, search: "金焰绣线菊", url: "plant/jinyanxiu/jinyanxiu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/jinyanxiu.jpg" },
      { name: "白花大叶醉鱼草", show: true, search: "白花大叶醉鱼草", url: "plant/baihuadaye/baihuadaye", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/baihuadaye.jpg" },
      { name: "金叶复叶槭", show: true, search: "金叶复叶槭", url: "plant/jinyefuye/jinyefuye", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/jinyefuye.jpg" },
      { name: "栾树", show: true, search: "栾树", url: "plant/luanshu/luanshu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/luanshu.jpg" },
      { name: "木槿", show: true, search: "木槿", url: "plant/mujin/mujin", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/mujin.jpg" },
      { name: "油松", show: true, search: "油松", url: "plant/yousong/yousong", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/yousong.jpg" },
      { name: "珍珠绣线菊", show: true, search: "珍珠绣线菊", url: "plant/zhengzhuxiu/zhengzhuxiu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/zhengzhuxiu.jpg" },
      { name: "紫红叶鸡爪槭", show: true, search: "紫红叶鸡爪槭", url: "plant/zihongye/zihongye", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/zihongye.jpg" },
      { name: "紫薇", show: true, search: "紫薇", url: "plant/ziwei/ziwei", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/ziwei.jpg" },

      { name: "大王椰子", show: true, search: "大王椰子", url: "plant/dawangyezi/dawangyezi", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/dawangyezi.jpg" },
      { name: "地涌金莲", show: true, search: "地涌金莲", url: "plant/diyongjinlian/diyongjinlian", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/diyongjinlian.jpg"},
      { name: "狐尾椰", show: true, search: "狐尾椰", url: "plant/huweiye/huweiye", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/huweiye.jpg" },
      { name: "蝴蝶兰", show: true, search: "蝴蝶兰", url: "plant/hudielan/hudielan", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/hudielan.jpg" },
      { name: "花叶艳山姜", show: true, search: "花叶艳山姜", url: "plant/huayeyanshan/huayeyanshan", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/huayeyanshan.jpg"},
      { name: "华盛顿棕", show: true, search: "华盛顿棕", url: "plant/huashengdun/huashengdun", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/huashengdun.jpg" },
      { name: "加拿利海枣", show: true, search: "加拿利海枣", url: "plant/jianali/jianali", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/jianali.jpg" },
      { name: "假槟榔", show: true, search: "假槟榔", url: "plant/jiabinglang/jiabinglang", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/jiabinglang.jpg" },
      { name: "酒瓶椰", show: true, search: "酒瓶椰", url: "plant/jiupingna/jiupingna", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/jiupingna.jpg" },
      { name: "冷水花", show: true, search: "冷水花", url: "plant/lengshuihua/lengshuihua", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/lengshuihua.jpg" },

      { name: "芭蕉", show: true, search: "芭蕉", url: "plant/bajiao/bajiao", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/bajiao.jpg" },
      { name: "春羽", show: true, search: "春羽", url: "plant/chunyu/chunyu", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/chunyu.jpg" },
      { name: "高山榕", show: true, search: "高山榕", url: "plant/gaoshanrong/gaoshanrong", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/gaoshanrong.jpg" },
      { name: "果子蔓", show: true, search: "果子蔓", url: "plant/guoziman/guoziman", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/guoziman.jpg" },
      { name: "黄花美人蕉", show: true, search: "黄花美人蕉", url: "plant/huanghuameiren/huanghuameiren", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/huanghuameiren.jpg" },
      { name: "金脉爵床", show: true, search: "金脉爵床", url: "plant/jinmaijue/jinmaijue", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/jinmaijue.jpg" },
      { name: "孔雀竹芋", show: true, search: "孔雀竹芋", url: "plant/kongque/kongque", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/kongque.jpg" },
      { name: "旅人蕉", show: true, search: "旅人蕉", url: "plant/lvrenjiao/lvrenjiao", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/lvrenjiao.jpg" },
      { name: "尼古拉鹤望兰", show: true, search: "尼古拉鹤望兰", url: "plant/nigula/nigula", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/nigula.jpg" },
      { name: "蝎尾蕉", show: true, search: "蝎尾蕉", url: "plant/xieweijiao/xieweijiao", src:"http://www.tianqiaokeji.com/wx_miniprogram/image/xieweijiao.jpg" }
    ]
    wx.setStorage({//获取的时候存储在本地
      key: 'plantList',
      data: plantList,
    })
    this.setData({
      plantList: plantList//页面加载时 显示所有数据
    })
    if(options.pageName){
      wx.navigateTo({
        //url: 'plant/baibujizhu/baibujizhu?pageId=' + options.pageId,
        url: 'plant/' + options.pageName + '/' + options.pageName,
      })
    }
  },

  onShareAppMessage: function (res) {
    return {
      title: '绿色馆植物科普',
      path: '/pages/allplants/allplants'

    }
  }

})