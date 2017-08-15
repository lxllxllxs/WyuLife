var http = require("../../utils/http.js");
Page({
  data:{
    productInfo:null
  },
  onLoad:function(options){
      console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    var pid=options.pId;
    this.getProductInfo(pid);
  },
  getProductInfo:function(pId){
      var that=this;
      var s=http.generateUrl('shop/getProductInfo');
      wx.request({  
      url:s,
       method:"POST",
      data:{
        pId:pId
      },  
      success: function(res) {  
         console.log(res.data)
        that.setData({
          productInfo:res.data.productInfo
        })
      }
    })
  },
})