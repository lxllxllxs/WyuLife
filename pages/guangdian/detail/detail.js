Page({
  onLoad:function(options){ 
  // 页面初始化 options为页面跳转所带来的参数 
    wx.setNavigationBarTitle({
    title: options.content
    })
 /*   this.setData(
      {
        videoUrl:options.videoUrl,
        imgUrl:options.imgUrl,
        content:options.content,
        createDate:options.createDate,
      }
    )*/
}
})

