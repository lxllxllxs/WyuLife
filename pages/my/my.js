var http = require("../../utils/http.js");
Page({  
  data:{
    text:"Page my",
    openId:"",
    index:0,
    isLogin:false,
    userInfo:null,
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({
    title:'个人中心'
    })
    var  userInfo=wx.getStorageSync('userInfo')
    var isLogin=typeof userInfo === "object"
     console.log(userInfo)
     try {
      this.setData({
      userInfo:userInfo,
       isLogin:isLogin
    })
    } catch (e) { 
      console.log(e)
    }
  },
  loginPage: function() {
    wx.navigateTo({
    url:'../Login/Login'
  })
  },
  onPullDownRefresh:function(){
    console.log('--------下拉刷新-------')
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

})