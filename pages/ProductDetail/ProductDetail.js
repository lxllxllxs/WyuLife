var http = require("../../utils/http.js");
Page({
  data:{
    productInfo:null,
    pindex:0,
    amount:0,
    price:0,
    count:1,
    minusStatus:'disabled',
  },
  onLoad:function(options){
      console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    var pid=options.pId;
    this.getProductInfo(pid);
  },
  //需要传递的参数：产品名，产品id,类型名，类型id,件数，单价,图片链接
  next:function(e){
    var jumpToUrl='../CreateOrder/CreateOrder?index='+this.data.pindex+"&count="+this.data.count;
   wx.navigateTo({
      url:jumpToUrl
      })
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
        wx.setStorage({
            key:"productInfo",
            data:res.data.productInfo
            })
      }
    })
  },
  modelChange: function(e) {
    var model=e.currentTarget.dataset.model;
    var pindex=e.currentTarget.dataset.pindex;
    console.log(pindex);
    this.setData({
      price:model.pmPrice,
      pindex:pindex
    })
  },
  /******加减数量控件****** */
   /* 点击减号 */  
    bindMinus: function() {  
        var count = this.data.count;  
        // 如果大于1时，才可以减  
        if (count > 1) {  
            count --;  
        }  
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = count <= 1 ? 'disabled' : 'normal';  
        // 将数值与状态写回  
        this.setData({  
            count: count,  
            minusStatus: minusStatus  
        });  
    },  
    /* 点击加号 */  
    bindPlus: function() {  
        var count = this.data.count;  
        // 不作过多考虑自增1  
        count ++;  
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus = count < 1 ? 'disabled' : 'normal';  
        // 将数值与状态写回  
        this.setData({  
            count: count,  
            minusStatus: minusStatus  
        });  
    },  
    /* 输入框事件 */  
    bindManual: function(e) {  
        var count = e.detail.value;  
        // 将数值与状态写回  
        this.setData({  
            count: count  
        });  
    }  

})
