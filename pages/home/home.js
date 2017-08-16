Page({
  data:{
    text:"Page home",
    menu:[
      {'text':'查成绩','img':'../../image/adopt.png'},
      {'text':'课程表','img':'../../image/adopt.png'},
      {'text':'寄快递','img':'../../image/adopt.png'},
      {'text':'取快递','img':'../../image/adopt.png'},
    ]

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
        console.log('--------下拉刷新-------')
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
 jumpTo: function(event) {
   //从0开始
    var menu=event.currentTarget.dataset.menu
    console.log(menu)
    var jumpToUrl;
    //1取0寄
    switch (menu){
      case 0:
      jumpToUrl='../SendAndTake/SendAndTake';
      break;
       case 1:    jumpToUrl='../SendAndTake/SendAndTake';
      break;
       case 2:    jumpToUrl='../SendAndTake/SendAndTake?type=0&';
      break;
      case 3:    jumpToUrl='../SendAndTake/SendAndTake?type=1&';
      break;
    }
    wx.navigateTo({
    url:jumpToUrl
  })
  },

  loginPage: function() {
    wx.navigateTo({
    url:'../Login/Login'
  })
  },
})