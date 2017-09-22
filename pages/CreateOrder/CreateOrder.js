var http = require("../../utils/http.js");
var app=getApp();
Page({
  data:{
    productInfo:null,
    model:null,
    index:0,
    count:0,
    receiveName:"",
    receivePhone:"",
    receiveAddr:"",
    formData:"",
    isHidden:false,
    timeType:["午饭时间","晚饭时间","晚九点之后"],
    typeId:0
  },
  onLoad:function(options){
    try {
      this.setData({
      index:options.index,
      count:options.count,
      receiveName: wx.getStorageSync('receiveName'),
      receivePhone:wx.getStorageSync('receivePhone'),
      receiveAddr:wx.getStorageSync('receiveAddr'),
      productInfo:wx.getStorageSync('productInfo'),
      model:wx.getStorageSync('productInfo').modelList[options.index],
    })
    } catch (e) { 
      console.log(e)
    }
    
    wx.setNavigationBarTitle({
    title:'创建订单'
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
   bindPickerChange: function(e) {
    console.log('', e.detail.value)
    this.setData({
      typeId: e.detail.value
    })
  },
  //错误提示弹窗
  ohShitfadeOut() {
   wx.showToast({title:this.data.msg,image:'../../image/error.png'});
  },  
  formSubmit: function(e) {  
    var json = e.detail.value;
    if (json.receiveName==""){
         this.setData({
             isShow:true,
        msg: "姓名不能为空"
        }) 
        this.ohShitfadeOut(); 
      return
    }
     var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    if (json.receivePhone==""){
      this.setData({
          isShow:true,
        msg: "手机号不能为空"
        }) 
      this.ohShitfadeOut(); 
      return
    }
    if (json.receivePhone.length != 11) {
             this.setData({
          isShow:true,
        msg: "手机号码无效"
        }) 
      this.ohShitfadeOut(); 
       return
  }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(json.receivePhone)) {
           this.setData({
          isShow:true,
        msg: "手机号码无效"
        }) 
      this.ohShitfadeOut(); 
          return
    }
     if (json.receiveAddr==""){
         this.setData({
             isShow:true,
        msg: "地址不能为空"
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
            wx.setStorageSync('receiveName',json.receiveName);
            wx.setStorageSync('receivePhone', json.receivePhone);
              wx.setStorageSync('receiveAddr', json.receiveAddr);
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
    var sum=this.data.model.pmPrice*this.data.count;
    this.data.formData['tokenId']='asd';
    this.data.formData['sum']=sum;
    this.data.formData['userNum']='31120026655';
    this.data.formData['timeType']=this.data.typeId;
    
    var item=new Object();
    item.pmCount=this.data.count;
    item.supplierNum='';
    item.subTotal=sum;
    item.pmId=this.data.model.pmId;
    item.pId=this.data.productInfo.pId;
    var array=[];
    array.push(item);
    this.data.formData['orderItemList']=array;
    console.log(this.data.formData);

      wx.request({  
      url: http.generateUrl('shop/createProductOrder'),
      data: that.data.formData,  
      method:"POST",
      header: {  
          'Content-Type': 'application/json;charset=UTF-8;' 
      },  
      success: function(res) {  
          //跳向新界面 这里需要判断 返回1才跳转
        if(res.data.result!=1){
            wx.showToast({
          title:res.data.message
         });
           that.resetArray();
          return
        }
         wx.showToast({
          title:'下单成功！'
         });
    
         wx.navigateBack({
         delta: 1
        })
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
/*
{"pmPrice":1,"pmTitle":"默认1","pmId":271,"pmBalance":1000}
{
    "tokenId": "9a245240-c839-4b4e-9a19-7fd929bb42e6",
    "sum": 275,
    "receiveAddr": "广东轻工职业技术学院",
    "receiveName": "康健",
    "receivePhone": "1359854785",
    "userNum": "3112002928",
    "timeType": 0,
    "orderItemList": [
        {
            "pmCount": 3,
            "subTotal": 75,
            "pmId": 3,
            "pId": 2,
            "supplierNum": "555555"
        }
    ]

}
*/