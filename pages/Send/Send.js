var http = require("../../utils/http.js");
var app=getApp();
Page({
  data:{
    text:"Page TipOff",
    j: 1,//帧动画初始图片  
    isSpeaking: false,//是否正在说话  
    voices: [],//音频数组  
    images:[
/*      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0",
      "http://pic.baike.soso.com/ugc/baikepic2/7216/cut-20160224171724-1530083365.jpg/0"*/
    ],
    videos:[],
    realName:"",
    nickName:"",
    openId:"",
    phone:"",
    avatarUrl:"",
    formData:"",
    isHidden:false,
    videoId:"",
    msg:"",
    totop:"title",
    imgIds:[],
    array:['求助','寻人','爆料','正能量','交通']
  },
  onLoad:function(options){
    try {
      this.setData({
      realName: wx.getStorageSync('realName'),
      phone:wx.getStorageSync('phone'),
      nickName:wx.getStorageSync('userInfo').nickName,
      avatarUrl:wx.getStorageSync('userInfo').avatarUrl,
      openId:wx.getStorageSync('openId').openId

    })
    } catch (e) { 
      console.log(e)
    }
    
    wx.setNavigationBarTitle({
    title:'我要报料'
    })
    // 页面初始化 options为页面跳转所带来的参数
     this.setData({
      index: 0
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
      index: e.detail.value
    })
  },
   delImage:function(event){
    var that=this;
    var imgIndex=event.currentTarget.dataset.imgindex;
    console.log('选中的是'+imgIndex);
    //images中移除
    this.data.images.splice(imgIndex, 1);
      console.log(this.data.images);
    this.setData({
      images: this.data.images
    })
  } , 
  delVideo:function(){
    this.setData({
      videos: []
    })
  } , 
  add :function(){
    var that=this;
      wx.showActionSheet({
            itemList: ['图片', '视频'],
            success: function(res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                    if(res.tapIndex==0){
                        that.choseImg();
                    }else if(res.tapIndex==1){
                        that.choseVideo();
                    }

                }
            }
        });
  },
  //错误提示弹窗
  ohShitfadeOut() {
   wx.showToast({title:this.data.msg,image:'../../image/error.png'});
  },  
  /**
   * 处理流程：
   * 1：检查必填项
   * 2.检查有无图片 有上传完图片再下一步
   * 3.检查有无视频 上传
   * 4.提交参数:title,content,realName,phone,imgIds,videoId
   */
  formSubmit: function(e) {  
    var json = e.detail.value;
    if (json.title.length==0){
       this.setData({
        msg: "标题不能为空"
        })
        this.ohShitfadeOut(); 
      return
    }
    if (json.realName==""){
         this.setData({
             isShow:true,
        msg: "姓名不能为空"
        }) 
        this.ohShitfadeOut(); 
      return
    }
     var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
   /*   if (!patrn.exec(json.realName)) {
         this.setData({
             isShow:true,
        msg: "姓名只能为中文"
        }) 
        this.ohShitfadeOut(); 
            return ;
      }*/
    if (json.phone==""){
      this.setData({
          isShow:true,
        msg: "手机号不能为空"
        }) 
      this.ohShitfadeOut(); 
      return
    }
    if (json.phone.length != 11) {
             this.setData({
          isShow:true,
        msg: "手机号码无效"
        }) 
      this.ohShitfadeOut(); 
       return
  }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(json.phone)) {
           this.setData({
          isShow:true,
        msg: "手机号码无效"
        }) 
      this.ohShitfadeOut(); 
          return
    }
     if (json.content==""){
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
            wx.setStorageSync('realName',json.realName);
            wx.setStorageSync('phone', json.phone);
        } catch (e) {   
           
        }  
    //准备上传图片
    if(this.data.images.length>0){
        this.uploadImage();
        //没有图片 检查视频
    }else if(this.data.videos.length>0){
        this.uploadVideo() ;
        //都没有 直接提交
    }else{
      this.commit();
    } 
  },  

/**
 * 最终提交 这里需要传入form
 */
  commit: function(){
    var that = this; 
    console.log('最终提交参数为：'); 
    this.data.formData['imgIds']=this.data.imgIds;
     this.data.formData['videoId']=this.data.videoId;
    console.log(this.data.formData);
      wx.request({  
      url: http.generateUrl('tipOff/publishTipOff'),
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
          title:'提交成功！'
         });
        console.log(res.data)
        var tipId=res.data.tipId;
        var title =that.data.formData.title+'(预览)'
       wx.navigateTo({
          url: '../TipDetail/TipDetail?tipId='+tipId+'&title='+title
        })
      },
      fail:function(res){
        this.setData({
              msg: "提交异常"
        }) 
        this.resetArray();
        this.ohShitfadeOut(); 
        console.log(res.statusCode)  
      }  
    })  
  },

  resetArray:function(){
        this.setData({
                    imgIds:[]
                })
  },

  //获取文件列表
  getSavedFiles:function(){
      //获取录音音频列表  
          var _this = this;  
        wx.getSavedFileList({  
          success: function (res) {  
            var voices = [];  
             console.log("查找已保存文件");  
            for (var i = 0; i < res.fileList.length; i++) {  
              //格式化时间  
              var createTime = new Date(res.fileList[i].createTime)  
              //将音频大小B转为KB  
              var size = (res.fileList[i].size / 1024).toFixed(2);  
              var voice = { filePath: res.fileList[i].filePath, createTime: createTime, size: size };  
              console.log("文件路径: " + res.fileList[i].filePath)  
              console.log("文件时间: " + createTime)  
              console.log("文件大小: " + size)  
              voices = voices.concat(voice);  
            }  
            _this.setData({  
              voices: voices  
            })  
          },
            fail:function(res){
              console.log("操作失败");  
        }  
        })  
  },
  //录制或选择视频
   choseVideo: function() {
        var that = this
        wx.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 60,
      camera: 'back',
            success: function(res) {
              var tempFilePath=res.tempFilePath
              //需要保存在本地
                console.log("tempFilePath: " + tempFilePath)  
              //持久保存  
 /*             wx.saveFile({  
                tempFilePath: tempFilePath,  
                success: function (res) {  
                  //持久路径  
                  //本地文件存储的大小限制为 100M  
                  var savedFilePath = res.savedFilePath  
                  console.log("savedFilePath: " + savedFilePath)  
                },
                fail:function(res){
                   that.setData({
                    msg: res
                  }) 
                  that.ohShitfadeOut(); 
                  console.log(res)  
                }  
              })  */
              var tempList=new Array();
              tempList[0]=res.tempFilePath
                that.setData({
                    videos:tempList
                })
            }, 
            fail:function(res){
                console.log(res)  
            }  
        })
    },

 /* 函数描述：作为上传文件时递归上传的函数体体；
   * 参数描述： 
   * filePaths是文件路径数组
   * successUp是成功上传的个数
   * failUp是上传失败的个数
   * i是文件路径数组的指标
   * length是文件路径数组的长度
   */      
    uploadDIY(filePaths,successUp,failUp,i,length,type){
      var _this=this;
      wx.showLoading({
        title:"正在上传文件"
        });
      wx.uploadFile({
                    url: http.generateUrl('common/upLoad'),
                    filePath: filePaths[i],
                    name: 'fileData',
                    formData:{
                      'type': type
                    },
                    success: (resp) => {
                     var ids=_this.data.imgIds;
                      console.log('第'+i);
                     console.log(resp.data);
                      var obj = JSON.parse(resp.data); 
                       ids.push(obj.id);
                         _this.setData({
                          imgIds: ids
                         })
                        successUp++;
                    },
                    fail: (res) => {
                        failUp ++;
                    },
                    complete: () => {
                      wx.hideLoading();
                        i ++;                        
                        if(i == length){                      
                          //后面开始提交 视频
                          if(_this.data.videos.length>0){
                            _this.uploadVideo();
                          }else{
                            //没有视频 直接提交表单
                            _this.commit();
                          }
                        }
                        else
                        {  //递归调用uploadDIY函数
                            _this.uploadDIY(filePaths,successUp,failUp,i,length,type);
                        }
                    },
                });
  },
  uploadImage:function(){
      var successUp = 0; //成功个数
      var failUp = 0; //失败个数
      var length = this.data.images.length; //总共个数
      var i = 0; //第几个
      this.uploadDIY(this.data.images,successUp,failUp,i,length,0);
  },

  uploadVideo:function(){
     var _this=this;
      wx.showLoading({
        title:"正在上传文件"
        });
   wx.uploadFile({
              //  url: 'http://123.207.94.51:8080/web-ssm/common/upLoad', 
                    url: http.generateUrl('common/upLoad'), 
                    // url: 'http://www.kpbtv.cn:81/common/upLoad', 
                    filePath: _this.data.videos[0],
                    name: 'fileData',
                    formData:{
                      'type': 1
                    },
                    success: (resp) => {
                      console.log(resp.data);
                      var obj = JSON.parse(resp.data); 
                         _this.setData({
                          videoId:obj.id
                         })

                      //最终提交 表单
                       _this.commit();
                    },
                    fail: (res) => {
                      this.setData({
                        msg: "提交异常"
                      }) 
                      this.ohShitfadeOut(); 
                      console.log(res)  
                    },
                    complete: () => {
                        wx.hideLoading();
                    },
                });
  },

      //拍摄或选择图片 这里要根据可用最大数量变动 
    choseImg:function(){
      var that=this;
      var length=this.data.images.length;
      if(9-length<=0){q
         this.setData({
          msg: "最多九张图！"
        }) 
        this.ohShitfadeOut(); 
        return;
      }
      wx.chooseImage({
      count: 9-length, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempList=that.data.images.concat(res.tempFilePaths);
         that.setData({
                    images: tempList
                })
           }
        })
       console.log(that.data.images)    
    }

})
