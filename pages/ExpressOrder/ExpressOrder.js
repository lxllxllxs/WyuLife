var http = require("../../utils/http.js");
Page({
  data:{
    otherOrderList:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var userInfo=wx.getStorageSync('userInfo')
    var userNum=userInfo.userNum;
    this.getUserOtherOrderList(userNum);
  },
    getUserOtherOrderList:function(userNum){
      var that=this;
      wx.request({  
      url:http.generateUrl('express/getUserOtherOrderList'),
       method:"POST",
      data:{
        userNo:userNum
      },  
      success: function(res) {  
         console.log(res.data)
        if(res.data.result==0){
            wx.showToast({title:'暂无订单'}); 
            return;
        }
        that.setData({
          otherOrderList:res.data.otherOrderList
        })
      },
      fail:function(res){
         wx.showToast({title:'网络异常',image:'../../image/error.png'}); 
      }
    })
  },
})