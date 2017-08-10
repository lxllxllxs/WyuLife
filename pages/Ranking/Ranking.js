var http = require("../../utils/http.js");
Page({
  data:{
    text:"Page Ranking",
    wxUserList:null ,
    icons:[
      'image/top1.png',
      'image/top2.png',
      'image/top3.png',
      'image/top4.png',
      'image/top5.png',
      'image/top6.png',
      'image/top7.png',
      'image/top8.png',
    ],
      tipOffs:[{
      "img":  "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0"
      ,"title":"asdasdwe"
    },{
      "img":  "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0"
      ,"title":"asdasdwe"
    },{
      "img":  "http://wx.qlogo.cn/mmopen/vi_32/X5SMcENRD0N1YIACjicC0slpUtWR5Rd07n3taT48RMr0aMOLCQ1AaPl2LUUdGkjuLeDibXicqVnciagH54UWry5amQ/0"
      ,"title":"asdasdwe"
    },{
      "img":  "http://wx.qlogo.cn/mmopen/vi_32/X5SMcENRD0N1YIACjicC0slpUtWR5Rd07n3taT48RMr0aMOLCQ1AaPl2LUUdGkjuLeDibXicqVnciagH54UWry5amQ/0"
      ,"title":"asdasdwe"
    }
    
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getRank();
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
　　wx.showNavigationBarLoading() //在标题栏中显示加载
     this.getRank();
  },
  getRank:function(){
      var that=this;
      var s=http.generateUrl('tipOff/getRanking');
      console.log(s)
      wx.showLoading({
          title: '加载中',
      })
      wx.request({  
      url:s,
      data:{
      },  
      method:"POST",
      header: {  
          'Content-Type': 'application/json' 
      },  
      success: function(res) {  
        console.log(res.data)
     
        that.setData({
          wxUserList:res.data.wxUserList
        })

      },
      fail:function(res){
        console.log(res.statusCode) 
        wx.showToast({title:'网络异常',image:'../../image/error.png'}); 
      },
      complete: function() {
            wx.hideLoading()
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }  
    })
  }


})
/**
 * 
 *    WxUser{
                id=1,
                tipCount=22,
                adoptCount=1,
                reward=100,
                nickName='lxl',
                openId='oeIkL0Vu57T2RAtDzYlBkR_8sdSs',
                realName='罗学林',
                avatarUrl='http: //wx.qlogo.cn/mmopen/vi_32/X5SMcENRD0N1YIACjicC0slpUtWR5Rd07n3taT48RMr0aMOLCQ1AaPl2LUUdGkjuLeDibXicqVnciagH54UWry5amQ/0'
            }
 * 
 */