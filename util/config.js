var myhttp = {};

// myhttp.baseURL = 'http://121.196.26.204:8000/' ;
myhttp.baseURL = "http://localhost:8000/" ;
 
myhttp.post = function(url,param,cb){
	uni.request({
	    url: myhttp.baseURL + url,
	    data: param,
		method: 'POST' ,
	    header:{//设置请求头
			'content-type': 'application/json' ,
			"x-token": uni.getStorageSync('token')
		},
	    success: (res) => {
			 if(res&&res.statusCode==200&&res.data&&res.data.errno==0){
				 cb(res.data.data);
			 }else{
				 if(res.data&&res.data.errmsg&&res.data.errmsg.length>0){
					 uni.showToast({title: res.data.errmsg,icon:"none"});
				 }else{
					 uni.showToast({title: '请求数据异常，请稍后重试！',icon:"none"});	
				 }           
			   }   
			}
	});
}
 
export default myhttp;