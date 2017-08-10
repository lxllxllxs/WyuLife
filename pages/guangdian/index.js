Page({
  enablePullDownRefresh: true,
   lower:function(e){
      var last=this.data.tuCaoList.length-1
      this.lastId=this.data.tuCaoList[last].id;
      this.getTuCaoList();
      this.setData({
        hidden:false
      })
  },
  data: {
    hidden:true,
    noMore:false,
    tuCaoList:[],
    message:"hello"
  },
    lastId:99999,
    onReady: function() {
      console.log("onReady"+this.data.tuCaoList.length)
      this.getTuCaoList();
  },
  jumpToDetail: function(event) {
    var tucao=event.currentTarget.dataset.tucao
    console.log(tucao)
    wx.navigateTo({
    url: 'detail/detail?content='+tucao.content+'&imgUrl='+tucao.imgUrl
})
  },
  getTuCaoList: function(event) {
    var that = this
    wx.request({
      url: 'http://www.wyulife.cn:8080/cs/tucao/getTuCaoList', //仅为示例，并非真实的接口地址
      method:"post",
      data: {
        tuCaoId: that.lastId,
        pageSize: 15
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        var list=res.data.tuCaoList
        if(list.length<1){
          that.setData({
            noMore:true
          })
          return
        }
        console.log(list[0].content);
        //初次
        if(that.data.tuCaoList.length<1){
            that.setData({
            tuCaoList:list
          })
      }else{
         that.data.tuCaoList=that.data.tuCaoList.concat(list);
          that.setData({
            tuCaoList:that.data.tuCaoList
          })
      }
  },fail:function(res){
    console.log(res.data)
  },complete: function() {
    // complete
     that.setData({
        hidden:true
      })
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})
  },
/*   onPullDownRefresh: function(){
     wx.showNavigationBarLoading() //在标题栏中显示加载
     var last=this.data.tuCaoList.length-1
      this.lastId=this.data.tuCaoList[last].id;
      this.getTuCaoList();
  },
  // 上拉加载回调接口
  onReachBottom: function () {
     console.log("bottomm  sasdadasd")
},*/
 
  changeMessage:function(){
     this.setData({
            message:"fuck"
          })
  }
})

