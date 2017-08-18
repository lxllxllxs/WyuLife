//app.js
var http = require("utils/http.js");
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
/*    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.askLogin();*/
    // this.cs_login();

  },
   cs_login:function(){
    var that = this;
    var userInfo=wx.getStorageSync('userInfo');
    var userNum=userInfo.userNum;
    var password=userInfo.password;
     console.log(userInfo)
    if(userInfo.lenght>0){
      console.log('准备静默登录')
       wx.request({  
      url:http.generateUrl('user/appLogin'),
      data:{
        userNum:userNum,
        password:password
      },
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
         console.log(res.data)
         //需要登录学校子系统服务 将wyuApi转成js
         if(res.data.result==0){
            //  wyuApi.getFirstCookie();//没有https  不能自己实现登录
              wx.setStorage({ key:"userInfo",data:null}) 
                console.log('静默登录失败！')
         }else{
           console.log('静默登录成功！')
         }
      }
      })
    }
  },
   //为了获取openId,获取用户信息不需要openId
  askLogin:function(){
       var that = this;
        wx.login({
      success: function(res) {
        if(res.code) {  
          var jscode=res.code
          wx.getUserInfo({  
                    success: function (res) {  
                        var objz={};  
                        objz.avatarUrl=res.userInfo.avatarUrl;  
                        objz.nickName=res.userInfo.nickName;  
                        wx.setStorageSync('userInfo', objz);//存储userInfo  
                    }  
           });  
          var d=that.globalData;//这里存储了appid、secret、token串    
          wx.request({    
              url:http.generateUrl('login/getOpenId'),   
              data: {
                  JSCODE: jscode
              },    
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
               header: {  
                    'Content-Type': 'application/json' 
                },  
              success: function(res){   
                  var obj={};  
                  obj.openId=res.data.openid; 
                  obj.expires_in=Date.now()+res.data.expires_in;    
                  console.log(obj);  
                  wx.setStorageSync('openId', obj);//存储openid    
                  that.getUserInfo();
              }
            }) 
      }else{
      } 
    }});   
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              console.log('获取用户信息')
              console.log(that.globalData.userInfo)
              typeof cb == "function" && cb(that.globalData.userInfo)
              console.log('检查服务器WxUser用户信息.')
              that.checkWxUser();
            }
          })
        }
      });
    }
  },
   checkWxUser:function(){
    var that = this;
     wx.request({  
      url: http.generateUrl('login/checkWxUser'),  
      data:{
        nickName:wx.getStorageSync('userInfo').nickName,
        avatarUrl:wx.getStorageSync('userInfo').avatarUrl,
        openId:wx.getStorageSync('openId').openId
      },  
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
        console.log(res.data)
      },
      fail:function(res){
        console.log(res)  
      },
    })  
  },
  globalData:{
    // appid:'wx3d1f38bb3b5274fd',//appid需自己提供 （lxl）
    // secret:'150d95a75576629fd54c2828dbe69a0a',//secret需自己提供(lxl)
      appid:'wxc7fe345a2825d1d9',//appid需自己提供 （单位）
    	secret:'6caf6df09610647eeb94c084df77cdda',
    userInfo:null,
  }
})





