$(function(){
	wx.config({
		debug: false,
		appId: 'wx50a3dfbc40d2d623',
		timestamp: 1494942693,
		nonceStr: '89be8675f7c79ed8072bdcf16176fefa',
		signature: '6bbe4ab6eca160aee4665de97c6b6bbe66a8760d',
		jsApiList: [
			'checkJsApi',
			'startRecord',
			'stopRecord',
			'onVoiceRecordEnd',
			'playVoice',
			'onVoicePlayEnd',
			'pauseVoice',
			'stopVoice',
			'uploadVoice',
			'downloadVoice',
			'downloadImage',
			'getNetworkType',
			'closeWindow',
			'chooseWXPay',
		]
	});

	function chcekWx(){
		wx.checkJsApi({
			jsApiList: [
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'onVoicePlayEnd',
				'pauseVoice',
				'stopVoice',
				'uploadVoice',
				'downloadVoice',
			],
			success: function (res) {
				//alert(JSON.stringify(res));
			}
	    });
	}
	var voice = {
	    localId: '',
	    serverId: ''
	};
	var list =[]
	var showMsg = function(msg){
		$(".msg").append('<p>'+msg+'</p>');
	}
	var timer;
	//开始录音
	$(".start").on("click", function(){
		var that = $(this);
		startrecord();
	})
	//停止录音
	$(".stop").on("click", function(){
		stoprecord();
	})
	//下载录音、播放
	$(".play").on("click", function(){
		// if (voice.serverId == '') {
		//   alert('请先使用 uploadVoice 上传声音');
		//   return;
		// }
		wx.downloadVoice({
		  	serverId: "guVjSLHhdAbf9c1v5x4jFQyQrIH_uVJlJQz2MhascV0M4dVahiHOrcro0ItGXcRS",
		  	success: function (res) {
		    	showMsg('下载语音成功，localId 为' + res.localId);
		    	var localId = res.localId;
		    	wx.playVoice({
				  	localId: localId
				});
				wx.onVoicePlayEnd({
					complete: function (res) {
						showMsg('录音（' + res.localId + '）播放结束');
					}
				});
		  	}
		});
	})

	function startrecord(){
		wx.startRecord({
	      	cancel: function () {
	        	alert('用户拒绝授权录音');
	      	},
	      	success: function(){
	      		showMsg('开始录音');
	      		$(".start").html("录音中...");
	      		// timer = setTimeout(function(){
	      		// 	stoprecord();
	      		// }, 5000)

				//监听录音自动停止 录音超过1分钟
				wx.onVoiceRecordEnd({
				    complete: function (res) {
				    	showMsg('录音时间已超过一分钟');
				    	voice.localId = res.localId;
				    	var item = {
							localId : res.localId,
							serverId: "",
						}
						list.push(item);
						showMsg('录音一分钟' + res.localId);
						if(list.length <10){
							showMsg("onVoiceRecordEnd  list ="+list.length);
							startrecord();
						}else{
							showMsg("录满10个了 上传第一个录音文件 id是 "+list[0].localId)
							//uploadLocal(list[0].localId);
							doUpload();
						}
				    },
				    fail: function(){
				    	showMsg('录音失败');
				    }
				});
	      	}
	    });
	}
	function stoprecord(cb){
		wx.stopRecord({
	 		success: function (res) {
	 			$(".start").html("开始录音")
	 			showMsg('录音停止' + res.localId);
				var item = {
					localId : res.localId,
					serverId: "",
				}
				list.push(item);
				if(list.length <10){
					showMsg("list ="+list.length);
					startrecord();
				}else{
					clearTimeout(timer);
					showMsg("录满10个了 上传第一个录音文件 id是 "+list[0].localId)
					//uploadLocal(list[0].localId);
					//doUpload();
				}
			},
	  		fail: function (res) {
	  			clearTimeout(timer);
	    		showMsg(JSON.stringify(res));
	  		}
		});
	}
	function uploadLocal(id,i){
		showMsg("开始上传 id="+id)
		if (id == '') {
		  	showMsg('请先使用 startRecord 接口录制一段声音');
		  	return;
		}
		wx.uploadVoice({
			localId: id,
			isShowProgressTips:0,
			success: function (res) {
			    showMsg('上传语音成功，serverId 为' + res.serverId);
			    list[i].serverId = res.serverId;
			    voice.serverId = res.serverId;
			    //checkUpload();
			},
			fail: function (res) {
        		showMsg(JSON.stringify(res));
      		}
		});
	}
	function doUpload(){
		//这里 for循环会同时上传全部录音
		for(var i=0,len=list.length;i<len;i++){
			var item = list[i];
			if(!item.serverId){
				uploadLocal(item.localId,i)
			}
		}
		return false;
	}

	/**********************************************************
	// 4 音频接口
	// 4.2 开始录音
	document.querySelector('#startRecord').onclick = function () {
		wx.startRecord({
		  cancel: function () {
		    alert('用户拒绝授权录音');
		  }
		});
	};

	// 4.3 停止录音
	document.querySelector('#stopRecord').onclick = function () {
		wx.stopRecord({
		  success: function (res) {
		    voice.localId = res.localId;
		  },
		  fail: function (res) {
		    alert(JSON.stringify(res));
		  }
		});
	};

	// 4.4 监听录音自动停止
	wx.onVoiceRecordEnd({
		complete: function (res) {
		  voice.localId = res.localId;
		  alert('录音时间已超过一分钟');
		}
	});
	// 4.5 播放音频
	document.querySelector('#playVoice').onclick = function () {
		if (voice.localId == '') {
		  	alert('请先使用 startRecord 接口录制一段声音');
		  	return;
		}
		wx.playVoice({
		  	localId: voice.localId
		});
	};

	// 4.6 暂停播放音频
	document.querySelector('#pauseVoice').onclick = function () {
		wx.pauseVoice({
		  	localId: voice.localId
		});
	};

	// 4.7 停止播放音频
	document.querySelector('#stopVoice').onclick = function () {
		wx.stopVoice({
		  	localId: voice.localId
		});
	};

    // 4.8 监听录音播放停止
	wx.onVoicePlayEnd({
		complete: function (res) {
			alert('录音（' + res.localId + '）播放结束');
		}
	});

	// 4.8 上传语音
	document.querySelector('#uploadVoice').onclick = function () {
		if (voice.localId == '') {
		  	alert('请先使用 startRecord 接口录制一段声音');
		  	return;
		}
		wx.uploadVoice({
			localId: voice.localId,
			success: function (res) {
			    alert('上传语音成功，serverId 为' + res.serverId);
			    voice.serverId = res.serverId;
			}
		});
	};

	// 4.9 下载语音
	document.querySelector('#downloadVoice').onclick = function () {
		if (voice.serverId == '') {
		  alert('请先使用 uploadVoice 上传声音');
		  return;
		}
		wx.downloadVoice({
		  serverId: voice.serverId,
		  success: function (res) {
		    alert('下载语音成功，localId 为' + res.localId);
		    voice.localId = res.localId;
		  }
		});
	};

  ******************************************/
})
