var http = require("../../utils/http.js");
var wyuApi = require("../../utils/WyuApi.js");
Page({ 
 data: { 
   loginFail:0
 }, 
 appLogin:function(e){
      if(this.data.loginFail>=3){
         wx.showToast({ 
              title: '密码错误次数过多 请稍候再试',
         })
        return;
      }
      var that=this;
      var json = e.detail.value;
      console.log(json)
      if(json.userNum.length == 0||json.password.length == 0){
        return;
      }
      var s=http.generateUrl('user/appLogin');
      wx.request({  
      url:s,
      data:json,
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
         console.log(res.data)
         //需要登录学校子系统服务 将wyuApi转成js
         if(res.data.result==0){
            //  wyuApi.getFirstCookie();//没有https  不能自己实现登录
            wx.showToast({ 
              title: res.data.message, 
              }) 
         }else{
           that.data.loginFail=that.data.loginFail+1;
             wx.showToast({ 
              title: '登录成功', 
              icon: 'success', 
              duration: 2000 
              }) 
             //记录 像
             wx.setStorage({ key:"userInfo",data:res.data.userInfo}) 
          //准备跳转或关闭
              wx.navigateBack({
                delta: 1
              })
         }
      }
      })
  },
// 登录 
 login: function () { 
 if(this.data.phone.length == 0 || this.data.password.length == 0){ 
  wx.showToast({ 
  title: '用户名和密码不能为空', 
  icon: 'loading', 
  duration: 2000 
  }) 
}else { 
 // 这里修改成跳转的页面 
  wx.showToast({ 
  title: '登录成功', 
  icon: 'success', 
  duration: 2000 
  }) 
 } 
 } 
}) 