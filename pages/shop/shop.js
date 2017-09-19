var http = require("../../utils/http.js");
Page({
  data:{
    categoryList:null,
    productList:null,
    selected:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getShopCategoryList();
  },
    jumpToDetail:function(event){
      //这里是小写
       var pId=event.currentTarget.dataset.pid
      var jumpToUrl='../ProductDetail/ProductDetail?pId='+pId+"&";
       wx.navigateTo({
       url:jumpToUrl
      })
  },
    getProductList:function(cId){
      var that=this;
      var s=http.generateUrl('shop/getProductList');
      wx.request({  
      url:s,
      data:{
        pcId:cId
      },  
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
         console.log(res.data)
        that.setData({
          // productList:res.data.productList
          productList:[
            {"pId":124,"pcId":2,"pTitle":"测试1"},
             {"pId":124,"pcId":2,"pTitle":"测试1"},
            {"pId":124,"pcId":2,"pTitle":"测试1"},
              {"pId":124,"pcId":2,"pTitle":"测试1"},
             {"pId":124,"pcId":2,"pTitle":"测试1"},
            {"pId":124,"pcId":2,"pTitle":"测试1"}
            
          ]
        })
      }
    })
  },
   getShopCategoryList:function(){
      var that=this;
      var s=http.generateUrl('shop/getShopCategoryList');
      wx.request({  
      url:s,
      data:{
      },  
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
         var temp=[];
         console.log(res.data)
        that.setData({
          categoryList:res.data.categoryInfo
        })
        //第一次
        that.getProductList(res.data.categoryInfo[0].categoryId)
      }
    })
  },
  choseCategory: function(event) {
    console.log(event)
    var index=event.currentTarget.dataset.index
    var cId=event.currentTarget.dataset.cag.categoryId
    if(this.data.selected==index){
      return;
    }
      this.setData({
      selected:index
    })
    //调用
    this.getProductList(cId)
  },
})