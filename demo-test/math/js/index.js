$(function(){
	var win = $(window);
	var origin = window.location.origin;
	var rootpath = window.location.pathname;
	var sp = rootpath.lastIndexOf("/")
	rootpath = rootpath.substring(0,sp);
	rootpath = origin+rootpath+"/";
	var bgW = 1024;
	var gbH = 768;
	var imgscalewithheight = 1;
	var gbRatio = 1024/768;
	//场景及其元素
	var stage = window.stage = {};
	var stageDom = $(".stage,.scene");

	stage.target = 0;
	stage.fileList={};
	stage.sceneList=[];
	stage.TotalScene = 12;//总的章节、场景数
	//场景内行为处理
	var scene = {
		globalAudio : $("#globalAudio"),
		backgroundsound : $("#backgroundsound"),
		scene_8_backgroundsound : $("#scene_8_backgroundsound"),
		headertool : $(".headertool"),
		footertool : $(".footertool"),
		am_step_1 : $("#am_step_1"),
		cat_step_2: $("#cat_step_2"),
		timer:void(0),
		scene_0 :{
			dom: $(".scene_0"),
			enter:function(){
				stage.visible($(".gohome"))
				scene.headertool.show();
				this.dom.fadeIn(function(){
					scene.backgroundsound[0].play();
					scene.headertool.fadeIn();
				})
			},
			exit : function(cb){
				stage.disvisible($(".gohome"))
				this.dom.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
		scene_1 : {
			dom : $(".scene_1"),
			subdom : $(".scene_1_1"),
			enter : function(cb){
				scene.scene_0.exit();
				scene.globalAudio.attr("src","javascript:void(0)")
				this.dom.removeClass().addClass("scene scene_1");
				alphaspeak.stop();
				amspeak.stop();
				amask.stop();
				scene.footertool.show();
				this.subdom.fadeOut(100);
				scene.scene_0.dom.fadeOut(100,function(){
					scene.scene_1.dom.fadeIn(600);
				});
				setTimeout(function(){
					amspeak.say();
					scene.am_step_1[0].play();
					scene.am_step_1.on("ended" ,function(){
						scene.cat_step_2[0].play();
					})
					scene.cat_step_2.on("ended" ,function(){
						scene.globalAudio.attr("src" ,stage.fileList['i_step_3'].src);
						scene.globalAudio[0].play();
						var res = alphaspeak.say();
						setTimeout(function(){
							scene.scene_1.dom.addClass('getCatFocus');
							scene.globalAudio.one("ended" ,function(){
								scene.scene_1.dom.addClass('back');
								setTimeout(function(){
									scene.scene_1.dom.removeClass('getCatFocus');
									scene.scene_1.dom.removeClass('back');
									focusPetRoom();
								},900)
							})
						},900)
					})
				},600)
				function focusPetRoom(){
					scene.scene_1.dom.addClass('getHouseFocus');
					setTimeout(function(){
						setTalkInHouse();
					},2000)
				}
				function setTalkInHouse(){
					scene.scene_1.dom.fadeOut()
					scene.scene_1.subdom.fadeIn(400,function(){
						setTimeout(function(){
							scene.globalAudio.attr("src" ,stage.fileList['am_step_4'].src);
							scene.globalAudio[0].play();
							amask.say();
							scene.globalAudio.one("ended" ,function(){
								//TODO 停止人物动画
								amask.stop();
								setTimeout(function(){
									scene.backgroundsound[0].pause();
									stage.goScene(2);
								},2000)
							})
						},2000)
					})
					
				}
			},
			exit : function(cb){
				this.dom.removeClass('getCatFocus');
				this.dom.removeClass('back');
				this.dom.addClass('getHouseFocus');
				amask.stop();
				alphaspeak.stop();
				amspeak.stop();
				scene.globalAudio[0].pause();
				scene.cat_step_2[0].pause();
				scene.am_step_1[0].pause();
				scene.scene_1.dom.fadeOut();
				scene.scene_1.subdom.fadeOut();
			}
		},
		scene_2 : {
			dom : $(".scene_2"),
			enter : function(cb){
				scene.scene_1.exit();
				scene.backgroundsound[0].pause();
				scene.scene_8_backgroundsound[0].pause();
				$(".setmusic").addClass('active');
				this.dom.fadeIn(400,function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				this.dom.hide(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
		scene_3 : {
			dom : $(".scene_3"),
			enter : function(cb){
				scene.backgroundsound[0].pause();
				scene.scene_8_backgroundsound[0].pause();
				this.dom.show(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				this.dom.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
		scene_4 : {
			dom : $(".scene_4"),
			enter : function(cb){
				scene.backgroundsound[0].pause();
				scene.scene_8_backgroundsound[0].pause();
				this.dom.fadeIn(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				this.dom.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
		scene_5 : {
			dom : $(".scene_5"),
			enter : function(cb){
				scene.scene_8_backgroundsound[0].pause();
				scene.backgroundsound[0].pause();
				this.dom.fadeIn(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				this.dom.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
		scene_6 : {
			dom : $(".scene_6"),
			enter : function(cb){
				scene.scene_8_backgroundsound[0].pause();
				scene.backgroundsound[0].pause();
				this.dom.fadeIn(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				this.dom.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
		scene_7 : {
			dom : $(".scene_7"),
			enter : function(cb){
				scene.scene_8_backgroundsound[0].pause();
				scene.backgroundsound[0].pause();
				this.dom.fadeIn(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				this.dom.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		}
	}
	//元素设置显示、隐藏 只设置visible，不设置display
	stage.disvisible = function(dom,speed){
		var dom = $(dom)
		if(speed){

		}else{
			dom.css("visibility","hidden")
		}
	},
	stage.visible = function(dom,speed){
		var dom = $(dom)
		if(speed){

		}else{
			dom.css("visibility","visible")
		}
	},
	stage.Init = function(){
		var winH = win.height();
		var winW = win.width();
		var winRatio = winW/winH;
		imgscalewithheight = winH/768;
		stage.initW=0;
		stage.initH =0;
		stage.time = 0;
		if(winRatio>=gbRatio){//图片宽高比小，以图为准
			//console.log("背景图 比例"+gbRatio)
			stage.initH = winH;
			stage.initW = parseInt(stage.initH*gbRatio);
		}else{//图片宽高比大，以窗口短的一边为准
			//console.log("window 比例"+winRatio)
			stage.initH = winH;
			stage.initW = parseInt(stage.initH*winRatio);
		}
		//console.log(stage.initW+"__"+stage.initH);
		stageDom.css({'width':stage.initW,'height':stage.initH});
		$(".headertool,.footertool").css('width',stage.initW);
		$(".gohome").css('width',stage.initW-120);
		$(".layout_mask ,.rule_intro_box").css({'width':stage.initW,'height':stage.initH});
		//stage.entry(); //缩放屏幕时不再从第一幕开始播放
		stage.scene = scene;
		var tag = $(".stage .scene:visible").attr("data-tag") ||1;
		stage.setPageTag(tag);
		var scaleImage = $(".forscale");
		$.each(scaleImage,function(i, el) {
			var that = $(el);
			//console.log(imgscalewithheight)
			if( that[0].nodeName.toLowerCase() !="img" ){
				that.css("transform","scale("+imgscalewithheight+")")
			}else{
				var originWidth = that.attr("data-width");
				var scaleWidth = originWidth*imgscalewithheight;
				that.css("width",scaleWidth);
			}
		});
	}
	//页面缩放后更改场景尺寸，保持全屏
	win.on("resize" ,function(){
		stage.Init();
	})
	//文件预加载和场景置入
	stage.perLoadFiles = function(){
		var queue = new createjs.LoadQueue();
		var manifest=[
			{id: "background", src:"image/background.jpg"},
			{id: "title", src:"image/class_title.png"},
			{id:"backgroundsound", src:"image/backgroundsound.mp3"},


			{id: "back", src:"image/back.png"},
			{id: "setting", src:"image/setting.png"},
			{id: "menu", src:"image/menu.png"},
			{id: "notice", src:"image/notice.png"},
			{id: "music", src:"image/music.png"},
			{id: "close", src:"image/close.png"},
			{id: "refresh", src:"image/refresh.png"},
			{id: "pre", src:"image/pre.png"},
			{id: "post", src:"image/post.png"},

			{id: "scene_room", src:"image/scene_room.jpg"},
			{id: "alpha_walk", src:"image/scene1/alpha_walk.png"},
			{id: "alpha_say", src:"image/scene1/alpha_say.png"},
			{id: "emma_walk", src:"image/scene1/emma_walk.png"},
			{id: "emma_say", src:"image/scene1/emma_say.png"},
			{id: "rect_say", src:"image/scene1/rect_say.png"},
			
			{id:"talk_1", src:"image/scene1/talk_1.mp3"},
			{id:"talk_2", src:"image/scene1/talk_2.mp3"},
			{id:"talk_3", src:"image/scene1/talk_3.mp3"},
			

		    
		]
		queue.on("complete", handleComplete, this);
		queue.on("progress" ,handleFileProgress);
		queue.on("fileload", handleFileLoad);
	    queue.on("error", loadError);
	    queue.loadManifest( manifest );

		function handleComplete() {
		    $(".scene_0").css("background-image",'url('+rootpath+queue.getItem("background").src+')');
		    $(".scene_1").css("background-image",'url('+rootpath+queue.getItem("scene_room").src+')');
		    
		    $(".scene_0 .title").attr('src',rootpath+queue.getItem("title").src);
		    
		    //css中的 hover，link等样式图先append到页面，避免执行样式规则时，重复请求图片，
		    //单纯的请求图片后并不会改变浏览器中的图片缓存状态
		    $("body").append($('<img src="'+rootpath+queue.getItem("menu").src+'" class="hide">'));
		    $("body").append($('<img src="'+rootpath+queue.getItem("notice").src+'" class="hide">'));
		    $("body").append($('<img src="'+rootpath+queue.getItem("music").src+'" class="hide">'));
		    $("body").append($('<img src="'+rootpath+queue.getItem("close").src+'" class="hide">'));
		    
		    //场景内小元素
		    $(".scene_1 .m_1").css("background-image",'url('+rootpath+queue.getItem("alpha_walk").src+')')
		    $(".scene_1 .m_2").css("background-image",'url('+rootpath+queue.getItem("emma_walk").src+')')
		   	
		    //音效设置
		    scene.backgroundsound.attr("src",rootpath+queue.getItem("backgroundsound").src);
		    scene.backgroundsound[0].pause();
		    scene.backgroundsound[0].volume = 0.4;

		    scene.globalAudio.attr('src',rootpath+queue.getItem("talk_1").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['talk_1'] = queue.getItem("talk_1");
		    scene.globalAudio.attr('src',rootpath+queue.getItem("talk_2").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['talk_2'] = queue.getItem("talk_2");
		    scene.globalAudio.attr('src',rootpath+queue.getItem("talk_3").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['talk_3'] = queue.getItem("talk_3");

		    

		    stage.Init();
		    stage.entry();
		    $(".dialog_global_layout").remove();
		}
		//处理单个文件加载
		function handleFileLoad(event) {
		    //console.log("文件类型: " + event.item.type);
		    if(event.item.type == "image"){
		       // console.log("图片已成功加载");
		    }
		}
		//处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
		function loadError(evt) {
		    console.log("加载出错！",evt.text);
		}
		//已加载完毕进度 
		function handleFileProgress(event) {
		    $(".dialog_global_layout>p").html("已加载 " + (queue.progress*100|0) + " %");
		    $(".dialog_global_layout").show();
		}
	}
	stage.perLoadFiles()
	//头部，底部工具按钮
	stage.menuTool = {
		headertool :{
			dom :$("#headertool"),
		}
	}
	//工具层 按钮动作
	stage.toolmenuAct = function(){
		//展示设置功能层
		$(".headertool").on("click",".setconfig",function(){
			var that = $(this);
			stage.disvisible(that);
			$(".setting_layout").fadeIn('400', function() {
				
			});
		});
		//关闭按钮层
		$(".close_setting_layout").on("click" ,function(){
			$(".setting_layout").fadeOut('fase',function(){
				stage.visible($(".setconfig"))
			});
		})
		//静音
		$(".setmusic").on("click" ,function(){
			var that = $(this);
			if(that.hasClass('active')){
				that.removeClass('active')
				scene.backgroundsound[0].play();
			}else{
				that.addClass('active')
				scene.backgroundsound[0].pause();
			}
		})
		//展示课程目录
		$(".getmenu").on("click" ,function(){
			var that = $(this);
			var menu_layout = $(".nemu_layout");
			if(that.hasClass('active')){
				if(menu_layout.is("visible")){

				}else{
					menu_layout.show();
				}
			}else{
				that.addClass('active');
				menu_layout.show();
			}
		})
		//关闭课程目录层
		$(".close_nemu_layout").on("click" ,function(){
			$(".getmenu").removeClass('active');
			$(".nemu_layout").fadeOut();
		});
		//章节后退
		$(".next").on("click",function(){
			var tag = $(this).attr("data-target");
			if(tag<1){
				alert("已经是第一章了")
				return;
			}else{
				stage.goScene(tag)
			}
		})
		//章节刷新
		$(".reload").on("click" ,function(){
			var tag = $(this).attr("data-target");
			var total = stage.TotalScene;//总的章节、场景数
			if(tag<1){
				alert("已经是第一章了");
				return;
			}else if(tag>total){
				alert("已经是最后一章了");
				return;
			}else{
				stage.goScene(tag);
			}
		})
		//章节前进
		$(".pre").on("click", function(){
			var tag = $(this).attr("data-target");
			var total = stage.TotalScene;//总的章节、场景数
			if(tag<1){
				alert("已经是第一章了");
				return;
			}else if(tag>total){
				alert("已经是最后一章了");
				return;
			}else{
				stage.goScene(tag);
			}
		})
		//目录列表 进入对应章节
		$(".menu_list").on("click" ,"a",function(){
			var that =  $(this);
			var tag = that.attr("data-target");
			stage.goScene(tag);
		})
		//规则
		$(".getnotice").on("click" ,function(){
			$(".rule_intro_box").fadeIn(100,function(){
				scene.globalAudio.attr("src" ,stage.fileList['classring'].src);
				scene.globalAudio[0].play();
			});
		})
		$(".rule_close").on("click" ,function(){
			scene.globalAudio.off("ended");
			scene.globalAudio[0].pause();
			alphaintro.stop();
			emmaintro.stop();
			$(".rule_intro_box").fadeOut();
		})
	}
	//开场进入
	stage.entry = function(){
		stage.bindAct();
		stage.toolmenuAct();
		//展示入口
		scene.scene_0.enter();

		//场景进入按钮动作
		$(".scene_0 .start").on("click" ,function(){
			stage.time=0;
			scene.scene_0.exit(function(){
				stage.setPageTag(1)
				scene.scene_1.enter()
			})
		})
	}
	//跳转到特定章节
	stage.goScene = function(tag){
		if(isNaN(tag)){
			alert("场景帧序数错误，应为数字");
			return false;
		}else if(tag<1){
			alert("已经是第一章了");
			return false;
		}else if(tag > stage.TotalScene){
			alert("已经是最后一章了");
			return false;
		}else{
			var curscene = $(".scene:visible");
			curscene.fadeOut( function() {
				scene["scene_"+tag].enter();
				stage.setPageTag(tag);
			});
		}
	}
	//设置翻页的序数，供章节跳转用
	stage.setPageTag = function(tag){
		var pre = $(".pre");
		var reload = $(".reload");
		var next = $(".next");
		if(tag<1){
			pre.attr("data-target",0);
			reload.attr("data-target",1);
			next.attr('data-target',+tag+1);
		}else if(tag>stage.TotalScene){
			pre.attr("data-target",+stage.TotalScene-1);
			reload.attr("data-target",stage.TotalScene);
			next.attr('data-target',+stage.TotalScene+1);
		}else{
			pre.attr("data-target",+tag-1);
			reload.attr("data-target",tag);
			next.attr('data-target',+tag+1);
		}
	}
	//给个别元素或行为绑定动画或事件
	stage.bindAct = function(){
		$(".scene_2").on("mouseover" ,".sprite" ,function(){
			var that = $(this);
			
			scene.globalAudio.attr("src" ,stage.fileList['mousehover'].src);
			scene.globalAudio[0].play();
			
		})
		$(".scene_2").on("click" ,".sprite" ,function(){
			var that = $(this);
			that.siblings('.sprite').removeClass('active');
			that.addClass('active');
			var sound = that.attr("data-sound");
			var child = $(".cat_3");
			if(sound){
				scene.globalAudio.attr("src" ,stage.fileList[sound].src);
				scene.globalAudio[0].play();
			}
			stage.setPageTag(2);
			
			if(that.data("correct")){
				setTimeout(function(){
					child.css({'left':'25%','top':'28%'});
				},800);
			}
		})
		
		//规则介绍
		$(".rule_intro .alpha_intro").on("click" ,function(){
			scene.globalAudio.off("ended");
			emmaintro.stop();
			scene.globalAudio.attr("src" ,stage.fileList['n_notice_a'].src);
			scene.globalAudio[0].play();
			alphaintro.say();
			scene.globalAudio.one("ended",function(){
				alphaintro.stop();
			})
		});
		$(".rule_intro .emma_intro").on("click" ,function(){
			scene.globalAudio.off("ended");
			alphaintro.stop();
			scene.globalAudio.attr("src" ,stage.fileList['n_content_e'].src);
			scene.globalAudio[0].play();
			emmaintro.say();
			scene.globalAudio.one("ended",function(){
				emmaintro.stop();
			})
		})
	}
	/**帧动画--逐个设置**/
	//场景1-1
	var alphaspeak={
		dom : $(".scene_1 .m_1"),
		timer: void(0),
		say:function(){
			var i = 0;
			alphaspeak.timer =  window.setInterval(frameAnmi, 60);
			//requestAnimationFrame(frameAnmi);
			function frameAnmi() {
			    if (i >9) { 
			    	//i = 0;  //重新开始循环
			    	clearInterval(this.timer); //停止
			    }else{
				    alphaspeak.dom[0].style.backgroundPosition = "-" + i * 227 + "px -2px";
				    i++;
				}
			    //requestAnimationFrame(frameAnmi)
			}
		},
		stop:function(){
			clearInterval(this.timer);
			alphaspeak.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
	var amspeak={
		dom : $(".scene_1 .m_2"),
		timer: void(0),
		say:function(){
			var i = 0;
			amspeak.timer =  window.setInterval(frameAnmi, 100);

			function frameAnmi() {
			    if(i >20) { 
			    	i = 0;  //重新开始循环
			    }else{
				    amspeak.dom[0].style.backgroundPosition = "-" + i * 174 + "px -2px";
				    i++;
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			amspeak.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
	
})

 
