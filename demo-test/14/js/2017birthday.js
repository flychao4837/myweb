'use strict'
/*
 ** flash播放器 直播流
 ** 参照课堂检测
 */
;
$(function() {
	var swfUrl = "./static/liveplayer.swf";
	var rtmpservers = {
		"mainrtmpservers": [{
			"getserver": "rtmp://wsyz.haibian.com/live_haibian",
			"servername": "网宿线路",
			"rtmpname": "class_detect_1",
			"publishserver": "",
			"servertype": 0
		}, {
			"getserver": "rtmp://wangsu.haibian.com/live_haibian",
			"servername": "兆维线路",
			"rtmpname": "class_detect_1",
			"publishserver": "",
			"servertype": 0
		}, {
			"getserver": "rtmp://getlive.haibian.com/live_haibian",
			"servername": "蓝汛线路",
			"rtmpname": "class_detect_1",
			"publishserver": "",
			"servertype": 0
		}, {
			"getserver": "rtmp://dilian.haibian.com/live_haibian",
			"servername": "帝联线路",
			"rtmpname": "class_detect_1",
			"publishserver": "",
			"servertype": 0
		}],
		"assistrtmpservers": [{
			"serversource": "weiduan",
			"getserver": "rtmp://wsyz.haibian.com/live_haibian",
			"rtmpname": "class_detect_1 "
		}]
	};


	/*课堂检测用到的flash初始话函数*/
	function initSwf() {
		var flashWidth = '1024'
		var flashHeight = '600'
		var swfVersionStr = "11.1.0"
		var xiSwfUrlStr = "http://static.haibian.com/swf/playerProductInstall.swf"
		var flashvars = {
			rtmpservers: encodeURIComponent(JSON.stringify(rtmpservers)),
			version: '201611262101'
		}

		var params = {
			quality: 'high',
			allowscriptaccess: 'always',
			allowfullscreen: 'false',
			allowfullscreenInteractive: 'false',
			bgcolor: '#191919',
			wmode: 'opaque'
		}
		var attributes = {
			id: 'HB_Live',
			name: 'HB_Live',
			align: 'left',
			styleclass: 'swfstyle'
		}
		swfobject.embedSWF(swfUrl,
			"flashContent", flashWidth, flashHeight, swfVersionStr, xiSwfUrlStr, flashvars, params, attributes, flashCallback)
		swfobject.createCSS("#flashContent", "display:block;text-align:left;")
	}

	function flashCallback(obj) {
		console.log(obj)
		if(obj.success != true){
			alert("获取视频失败，请刷新页面或更换线路");
		}else{
			//TODO
		}
	}

	function getSwfByName(movieName) {
		if (navigator.appName.indexOf("Microsoft") != -1) {
			return window[movieName]
		} else {
			return document[movieName]
		}
	}

	function getFlash() {
		// 下载地址
		if (envObj.system === 'mac') {
			location.href = 'http://file.haibian.com/zaixian/soft/mac版flash安装包.zip'
		} else {
			location.href = 'http://file.haibian.com/zaixian/soft/windows版flash安装包.zip'
		}
	}

	function startLive() {
		getSwfByName("HB_Live").startLive()
	}

	function assistStartPublishStream() {
		getSwfByName("HB_Live").assistStartPublishStream()
	}

	function assistEndPublishStream() {
		getSwfByName("HB_Live").assistEndPublishStream()
	}

	function exitFullScreen() {
		getSwfByName("HB_Live").exitFullScreen()
	}
	/*开课时间判断，显示不同的提示信息*/
	//initSwf();
});