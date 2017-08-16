var http = require("../../utils/http.js");
var wyuApi = require("../../utils/WyuApi.js");
Page({ 
 data: { 
 }, 
 appLogin:function(e){
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
             wyuApi.getFirstCookie();
         }else{
             wx.showToast({ 
              title: '登录成功', 
              icon: 'success', 
              duration: 2000 
              }) 
          //准备跳转或关闭
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