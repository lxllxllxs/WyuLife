var http = require("../../utils/http.js");
Page({
  data:{
    text:"Page TipOffAdm",
    tipOffAdm:null,
    array:[30,50,100]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.showNavigationBarLoading() //在标题栏中显示加载
     this.getTipOffAdm();
        wx.setNavigationBarTitle({
    title:'查看爆料'
    })
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
  onPullDownRefresh:function(){
    console.log('--------下拉刷新-------')
     this.getTipOffAdm();
  },
  jumpToDetail: function(event) {
    var tipOffId=event.currentTarget.dataset.tipoff.tipOffId
      var title=event.currentTarget.dataset.tipoff.title
    console.log(tipOffId)
    wx.navigateTo({
    url: '../TipDetail/TipDetail?tipId='+tipOffId+'&title='+title
  })
  },
  showActionSheet:function(event){
    var that=this;
        wx.showActionSheet({
      itemList: ['￥30', '￥50', '￥100'],
      success: function(res) {
        console.log(res.tapIndex)
        var money=0;
        switch(res.tapIndex){
          case 0:
          money=30;
          break;
           case 1:
            money=50;
          break;
           case 2:
            money=100;
          break;
        }
        that.setAdopt(event,money)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  } , 
  //设置为 采用
  setAdopt:function(event,money){
    var that = this; 
     var tipOffId=event.currentTarget.dataset.tipoff.tipOffId
       console.log(tipOffId)
      wx.request({  
      url: http.generateUrl('tipOff/setAdopt'),  
      data:{
        tipOffId:tipOffId,
        money:money
      },  
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
        console.log(res.data)
        //再刷新一下
        that.getTipOffAdm();
      },
      fail:function(res){
        console.log(res.statusCode)  
        wx.showToast({title:'网络异常',image:'../../image/error.png'}); 
      },
    })  
  },
    //获取所有
    getTipOffAdm:function(){
    var that = this; 
    　wx.showNavigationBarLoading() //在标题栏中显示加载
      wx.request({  
      url: http.generateUrl('tipOff/getTipOffAdm'),  
      data:{
      },  
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
        console.log(res.data)
        that.setData({
            tipOffAdm:res.data.tipOffList
          })
      },
      fail:function(res){
        console.log(res.statusCode)  
        wx.showToast({title:'网络异常',image:'../../image/error.png'}); 
      },
       complete: function() {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }
    })  
  },
})