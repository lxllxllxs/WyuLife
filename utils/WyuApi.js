/*
	private  String getFirstCookie() throws IOException {
		final String main="http://jwc.wyu.cn/student/";
		Map<String,String> headers= new HashMap<>();
		Map<String, String> params = new HashMap<>();
		HttpURLConnection connection= SoapUtils. call(params, headers,main);
		if (connection!=null&&connection.getResponseCode()==200){
			String  firstCookie = "Set-Cookie"+"="+connection.getHeaderField("Set-Cookie");
			System.out.println("获取firstCookie成功！"+firstCookie);
			return firstCookie;
		}
		return "error";
	}*/
 function getFirstCookie() {
      wx.request({  
      url: "http://jwc.wyu.cn/student/",
      method:"GET",
      header: {  
          'Content-Type': 'application/json;charset=UTF-8;' 
      },  
      success: function(res) {  
        console.log(res.data)
      },
      fail:function(res){
        console.log(res.statusCode)  
      }
      })     
}
module.exports = {
  getFirstCookie: getFirstCookie
}
