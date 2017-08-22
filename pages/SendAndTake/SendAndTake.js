var http = require("../../utils/http.js");
var util = require("../../utils/util.js");
var app=getApp();
Page({
  data:{
    contactName:"",
    desc:"物品种类、大小、重量、邮寄省份、快递公司等",
    contactPhone:"",
    contactAddr:"",
    formData:"",
    formUrl:"express/createDoorExpressOrder",
    msg:"",
    timeTypeArray:null,
    timeType:0
  },
  //type为1 即取快递
  onLoad:function(options){
    console.log(options)
    var title=options.type==0?'寄快递':'取快递';
    //0 为默认
    if(options.type==1){
        this.setData({
      desc: '粘贴取件短信内容，其他需说明的请注明',
      formUrl:'express/createTakeExpressOrder'
      })
    }
    try {
      this.setData({
      contactName: wx.getStorageSync('contactName'),
      contactPhone:wx.getStorageSync('contactPhone'),
      contactAddr:wx.getStorageSync('contactAddr'),
    })
    } catch (e) { 
      console.log(e)
    }
    
    wx.setNavigationBarTitle({
    title:title
    })
    // 页面初始化 options为页面跳转所带来的参数
     this.setData({
      index: 0
    }),
    this.getTimeTypeList();
  },
  getTimeTypeList:function(){
      var that=this;
      var s=http.generateUrl('shop/getTimeTypeList');
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
         for(var key in res.data){ 
              temp.push(res.data[key]); 
            } 
        that.setData({
          timeTypeArray:temp
        })
      }
    })
  },
   bindPickerChange: function(e) {
    console.log( e.detail.value)
    this.setData({
      timeType: e.detail.value
    })
  },
  //错误提示弹窗
  ohShitfadeOut() {
   wx.showToast({title:this.data.msg,image:'../../image/error.png'});
  },  
  formSubmit: function(e) {  
    var json = e.detail.value;
    if (json.contactName.length==0){
       this.setData({
        msg: "联系人不能为空"
        })
        this.ohShitfadeOut(); 
      return
    }
    if (json.contactPhone==""){
      this.setData({
          isShow:true,
        msg: "手机号不能为空"
        }) 
      this.ohShitfadeOut(); 
      return
    }
    if (json.contactPhone.length != 11) {
             this.setData({
          isShow:true,
        msg: "手机号码无效"
        }) 
      this.ohShitfadeOut(); 
       return
  }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(json.contactPhone)) {
           this.setData({
          isShow:true,
        msg: "手机号码无效"
        }) 
      this.ohShitfadeOut(); 
          return
    }
    if (json.contactAddr==""){
         this.setData({
             isShow:true,
        msg: "联系地址不能为空"
        }) 
        this.ohShitfadeOut(); 
      return
    }
    //添加时间和商家学号 用户id
    json.timeType=this.data.timeType;
    json.userNum=wx.getStorageSync('userInfo').userNum;
     if (json.remark==""){
         this.setData({
             isShow:true,
        msg: "内容不能为空"
        }) 
            this.ohShitfadeOut(); 
      return
    }
    //通过校验 隐藏提示
    this.setData({
      formData:json,
        isShow:false,
    }) 
  //保存 信息
    try {
        wx.setStorageSync('contactName',json.contactName);
        wx.setStorageSync('contactPhone', json.contactPhone);
       wx.setStorageSync('contactAddr', json.contactAddr);
    } catch (e) {   
    }  
    this.commit();
  },  
  /**
 * 最终提交 这里需要传入form
 */
  commit: function(){
    var that = this; 
    console.log('最终提交参数为：'); 
    console.log(this.data.formData);
      wx.request({  
      url: http.generateUrl(this.data.formUrl),
      data: that.data.formData,  
      method:"POST",
      header: {  
          'Content-Type': 'application/json;charset=UTF-8;' 
      },  
      success: function(res) {  
         wx.showToast({
          title:'提交成功！'
         });
      },
      fail:function(res){
        this.setData({
              msg: "提交异常"
        }) 
        this.ohShitfadeOut(); 
        console.log(res.statusCode)  
      }  
    })  
  },

})
