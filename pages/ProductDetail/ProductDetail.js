var http = require("../../utils/http.js");
Page({
  data:{
    productInfo:null,
    index:0;
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
        header: {  
          'Content-Type': 'application/json' 
      },  
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
  modelChange: function(e) {
    console.log('radio发生change事件，携带value值为：',e.currentTarget.dataset.index);
  }
})
