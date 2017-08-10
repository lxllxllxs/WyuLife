var http = require("../../utils/http.js");
Page({
  data:{
    text:"Page TipDetail",
    tipOff:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var tipOffId=options.tipId;
     var title=options.title;
      wx.setNavigationBarTitle({
    title:title
    })

    this.getTipOff(tipOffId);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  getTipOff:function(tipOffId){
    var _this=this;
    wx.showLoading({
      title: '加载中',
  })
      wx.request({       
      url: http.generateUrl('tipOff/getTipOffById'),
      data:{
        tipOffId:tipOffId
      },  
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {
         wx.hideLoading()
        console.log(res.data)
        //设置数据 刷新页面
        _this.setData({
          tipOff:res.data.tipOff
        })
       console.log(_this.data.tipOff) 
      },
      fail:function(res){
         wx.hideLoading()
          wx.showToast({title:'网络异常',image:'../../image/error.png'}); 
        console.log(res.statusCode)  
      }  
    })  
  }


})

/**
 * [
    {
        "tipOffId": "35",
        "content": "sdd",
        "createDate": "2017-05-25 16:46:18",
        "nickName": "",
        "phone": "15019861460",
        "realName": "zxc",
        "title": "asd",
        "type":事件,
        "imgList": "http://www.kpbtv.cn:8080/cs/88lIsNMw.png",
        "videoId": "7",
        "videoUrl": "http://www.kpbtv.cn:8080/cs/hCp5wOiF.mp4"
    }
]
 */