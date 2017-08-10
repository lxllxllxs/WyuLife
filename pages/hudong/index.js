Page({
  data: {
    tuCaoList:[],
    message:"hello"
  },
    lastId:99999,
    onReady: function() {
      console.log("onReady"+this.data.tuCaoList.length)
      this.getTuCaoList();
  },
  tapName: function(event) {
    console.log(event)
  },
  getTuCaoList: function(event) {
    var that = this
    wx.request({
      url: 'http://123.207.13.169:8080/cs/tucao/getTuCaoList', //仅为示例，并非真实的接口地址
      method:"post",
      data: {
        tuCaoId: that.lastId,
        pageSize: 15
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        console.log(res.data)
        var list=res.data.tuCaoList
        if(list.length<1){
          return
        }
        console.log(list[0].content);
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
    wx.stopPullDownRefresh()
    console.log(res.data)
  }
})
  },
   onPullDownRefresh: function(){
     var last=this.data.tuCaoList.length-1
      this.lastId=this.data.tuCaoList[last].id;
      this.getTuCaoList();
  },
  changeMessage:function(){
     this.setData({
            message:"fuck"
          })
  }
})

