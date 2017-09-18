"use static";
/*
* 通用dialog插件 支持jQuery和zepto
* 包含tip（可定时关闭）
* alert
* confirm （包含回掉函数，能打开后续的 alert、tip、confirm、notify等）
* notify （通知提示，可定时关闭、可手动关闭）
* author ： yangchao@baichebao.com
* 2015-06-12
* v 0.2 Bate
* 创建一个页面全局通用的 Dialog ，包含各种tip、alert、confirm、等 每种有show()和close()方法,便于手动控制
* dialog的各种状态，每个对象有option参数和单一参数两种传参方式
*/

var win = $(window);
function Dialog(options){
	opt = {
		"mask" : true,
		"time" : 0,
		"msg"  : "Loading...",
		"oktext" : "\u786e\u5b9a", //确定
		"cancaltext" : "\u53d6\u6d88" ,//取消
		"okfun" : undefined,
		"cancalfun" : undefined,
		"confirmtext" :"\u7ee7\u7eed" , //继续
		"confirmfun" : undefined,
		"theme" : "",
		"zIndex" : "9999"
	}
	var options = options || {};
	var that = this ,timmer ;
	that.settings = $.extend({}, opt, options);
	that.count =1000;
	that.dialog="";

	that.destroy = function(){
		that.dialog.remove();
	}
	// tip 弹层
	Dialog.prototype.tip = function(argu){
		var tmp;
		if(typeof(argu) ==="object"){
			var t = argu, msg = t.msg,time = t.time ,icon = t.icon;
			tmp = '<p class="tip_msg '+icon+'">'+ msg +'</p>';
			that.dialog = $('<div>').addClass('dialog_global_layout').css("z-index", +that.settings.zIndex + (that.count++) ).html(tmp).prependTo('body');
			if(time > 0){
				setTimeout(function(){
					that.dialog.remove();
				},time);
			}
		}else if(typeof(argu) ==="string"){
			var msg = argu;
			tmp = '<p class="tip_msg">'+ msg +'</p>';
			that.dialog = $('<div>').addClass('dialog_global_layout').css("z-index", +that.settings.zIndex + (that.count++) ).html(tmp).prependTo('body');
		}else{
			throw "tip argumens type error need String or Object" ;
		}

	}
	// alert 对话框
	Dialog.prototype.alert = function(argu){
		var tmp ;
		if(typeof(argu) ==="object"){
			var msg = argu.msg,oktext = argu.oktext || that.settings.oktext,callback = argu.okfun;
			tmp = '<div class="alert_content"><p class="alert_msg">'+ msg +'</p><div class="alert_btn_list btn_list" ><a class="btn btn_alert">'+oktext+'</a></div></div>';
			that.dialog = $('<div>').addClass('dialog_global_layout').css("z-index", +that.settings.zIndex + (that.count++) ).html(tmp).prependTo('body');
			that.dialog.find(".btn_alert").on("click",function(){
				that.destroy();
				if(typeof(callback) ==="function"){
					callback.call(callback);
				}
			});			

		}else if(typeof(argu)==="string"){
			var msg = argu;
			tmp = '<div class="alert_content"><p class="alert_msg">'+ msg +'</p><div class="alert_btn_list btn_list" ><a class="btn btn_alert">'+that.settings.oktext+'</a></div></div>';
			that.dialog = $('<div>').addClass('dialog_global_layout').css("z-index", +that.settings.zIndex + (that.count++) ).html(tmp).prependTo('body');
			that.dialog.find(".btn_alert").on("click",function(){
				that.destroy();
			});
		}else{
			throw "alert argumens type error need String or Object" ;
		}
	}
	// confirm 提示框
	Dialog.prototype.confirm = function(argu){
		var tmp ;
		if(typeof(argu) ==="object"){
			var msg = argu.msg, cancaltext = argu.cancaltext || that.settings.cancaltext ,callback = argu.okfun ,confirmtext = argu.confirmtext || that.settings.confirmtext;
			tmp = '<div class="alert_content"><p class="alert_msg">'+ msg +'</p><div class="alert_btn_list btn_list" ><a class="btn btn_comfirm_cancel">'+cancaltext+'</a><a class="btn btn_comfirm_ok">'+confirmtext+'</a></div></div>';
			that.dialog = $('<div>').addClass('dialog_global_layout').css("z-index", +that.settings.zIndex + (that.count++) ).html(tmp).prependTo('body');
						that.dialog.find(".btn_comfirm_cancel").on("click",function(){
				that.destroy();
			});
			that.dialog.find(".btn_comfirm_ok").on("click",function(){
				that.destroy();
				if(typeof(callback) ==="function"){
					callback.call(callback);
				}
			});			

		}else if(typeof(argu)==="string"){
			var msg = argu;
			tmp = '<div class="alert_content"><p class="alert_msg">'+ msg +'</p><div class="alert_btn_list btn_list" ><a class="btn btn_comfirm_cancel">'+that.settings.cancaltext+'</a><a class="btn btn_comfirm_ok">'+that.settings.confirmtext+'</a></div></div>';
			that.dialog = $('<div>').addClass('dialog_global_layout').css("z-index", +that.settings.zIndex + (that.count++) ).html(tmp).prependTo('body');
			that.dialog.find(".btn_comfirm_cancel").on("click",function(){
				that.destroy();
			});
			that.dialog.find(".btn_comfirm_ok").on("click",function(){
				that.destroy();
			});	
		}else{
			throw "confirm argumens type error need String or Object" ;
		}
	}
	// 对外关闭接口
	Dialog.prototype.destroy = function(){
		var dom = $(".dialog_global_layout");
		if(that){ //部分情况下 先创建dialog ，调用tip后手动destroy时无法找到diaolog对应的that对象
			that.destroy();
		}else if(dom){
			dom.remove();
		}else{
			throw "Dialog not found" ;
		}

	}
	window.Dialog = Dialog;
}
