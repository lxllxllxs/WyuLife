var http = require("../../utils/http.js");
Page({  
  data:{
    text:"Page my",
    openId:"",
    index:0,
    userInfo:null,
     images:[
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0"
    ],
    tipOffs:[],
    tipOffsAdopt:null,
    avart:"http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
    
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({
    title:'个人中心'
    })
     try {
      this.setData({
      avart:wx.getStorageSync('userInfo').avatarUrl,
      openId:wx.getStorageSync('openId').openId
    })
    } catch (e) { 
      console.log(e)
    }
  },
  onReady:function(){
    // 页面显示
    this.getMyInfo();
  },
  onShow:function(){
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onPullDownRefresh:function(){
    console.log('--------下拉刷新-------')
/*　　wx.showNavigationBarLoading() //在标题栏中显示加载
     this.getMyInfo();*/
  },
  scrollToRight:function(event){
         console.log(event)
  },
  getMyInfo: function(){
    var that = this; 
       wx.showNavigationBarLoading() //在标题栏中显示加载
      wx.request({  
      url: http.generateUrl('tipOff/getMyInfo'),  
      data:{
        openId:that.data.openId
      },  
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
        console.log(res.data)
        that.setData({
            userInfo:res.data.myInfo
          })
        //同步调用
         that.getMyTipOff();
      },
      fail:function(res){
        console.log(res.statusCode)  
      },
    })  
  },
   jumpToAdmList: function(event) {
    wx.navigateTo({
    url: '../TipOffAdm/TipOffAdm'
      })
  },
   jumpToDetail: function(event) {
    var tipOffId=event.currentTarget.dataset.tipoff.tipOffId
     var title=event.currentTarget.dataset.tipoff.title
    console.log(tipOffId)
    wx.navigateTo({
    url: '../TipDetail/TipDetail?tipId='+tipOffId+'&title='+title
      })
  },
  getMyTipOff: function(){
    var that = this; 
      wx.request({  
      url: http.generateUrl('tipOff/getMyTipOff'),  
      data:{
        openId:that.data.openId
      },  
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
        console.log(res.data)
        that.setData({
            tipOffs:res.data.tipOffList
          })
      },
      fail:function(res){
        console.log(res.statusCode)  
      },
       complete: function() {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
       }
    })  
  },

})