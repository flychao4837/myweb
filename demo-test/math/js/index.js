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
	stage.TotalScene = 6;
	//场景内行为处理
	var scene = {
		globalAudio : $("#globalAudio"),
		backgroundsound : $("#backgroundsound"),
		headertool : $(".headertool"),
		footertool : $(".footertool"),
		timer:void(0),
		scene_0 :{
			dom: $(".scene_0"),
			enter:function(){
				scene.headertool.hide();
				this.dom.fadeIn(function(){
					scene.backgroundsound[0].play();
				})
			},
			exit : function(cb){
				this.dom.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
		scene_1 : {
			dom : $(".scene_1"),
			enter : function(cb){
				scene.backgroundsound[0].pause();
				scene.scene_0.exit();
				scene.globalAudio.attr("src","javascript:void(0)")
				alphaspeak.stop();
				alphamove.stop();
				emmaspeak.stop();
				emmamove.stop();
				squarespeak.stop();
				scene.globalAudio[0].pause();
				alphamove.dom.removeClass('move').show();
				emmamove.dom.removeClass('move').show();
				alphaspeak.dom.hide();
				emmaspeak.dom.hide();
				scene.footertool.show();
				clearTimeout(scene.timer);
				scene.globalAudio.off("ended");
				scene.scene_0.dom.fadeOut(100,function(){
					scene.scene_1.dom.fadeIn(600,function(){
						alphamove.dom.addClass('move');
						emmamove.dom.addClass('move');
						alphamove.say();
						emmamove.say();
						scene.timer = setTimeout(function(){
							alphamove.stop();
							emmamove.stop();
							
							emmaspeak.dom.fadeIn(300,function(){
								//emmamove.dom.fadeOut(16,function(){
									scene.globalAudio.attr("src" ,stage.fileList['talk_1'].src);
									scene.globalAudio[0].play();
									emmamove.dom.hide();
									emmaspeak.say();

									scene.globalAudio.one("ended" ,function(){
										emmaspeak.stop();
										scene.globalAudio.attr("src" ,stage.fileList['talk_2'].src);
										scene.globalAudio[0].play();
										squarespeak.say();

										changetalk();
									})
								//})
							})
						}, 2000)
						
					});
				});
				function changetalk () {
					scene.globalAudio.one("ended" ,function(){
						squarespeak.stop();
						scene.globalAudio.attr("src" ,stage.fileList['talk_3'].src);
						scene.globalAudio[0].play();
						emmaspeak.say();
						squaresay();
					})
				}
				function squaresay(){
					scene.globalAudio.one("ended" ,function(){
						scene.globalAudio[0].pause();
						emmaspeak.stop();
						setTimeout(function(){
							stage.setPageTag(2)
							scene.scene_2.enter()
						}, 600);
					})
				}
			},
			exit : function(cb){
				alphaspeak.stop();
				alphamove.stop();
				emmaspeak.stop();
				emmamove.stop();
				squarespeak.stop();
				clearTimeout(scene.timer);
				alphamove.dom.removeClass('move').show();
				emmamove.dom.removeClass('move').show();
				alphaspeak.dom.hide();
				emmaspeak.dom.hide();
				scene.globalAudio[0].pause();
				scene.globalAudio.off("ended");
			}
		},
		scene_2 : {
			dom : $(".scene_2"),
			enter : function(cb){
				scene.scene_1.exit();
				clearTimeout(scene.timer);
				scene.backgroundsound[0].pause();
				scene.globalAudio[0].pause();
				scene.scene_2.dom.find(".m_1.speak ").hide();
				alphaspeak.stop();
				scene.globalAudio.off("ended");
				$(".scene_2 .sprite.moveout").removeClass('moveout');
				scene.scene_1.dom.fadeOut(100,function(){
					scene.scene_2.dom.fadeIn(400,function(){
						scene.scene_2.dom.find(".m_1.speak ").fadeIn(450,function(){
							scene.globalAudio.attr("src" ,stage.fileList['2_d_1'].src);
							scene.globalAudio[0].play();
							alphaspeak.say();
							scene.globalAudio.one("ended" ,function(){
								alphaspeak.stop();
							})
						})
						
						if(typeof(cb)==="function"){
							cb.call(cb)
						}
					});
				});
			},
			exit : function(cb){
				clearTimeout(scene.timer);
				scene.backgroundsound[0].pause();
				scene.globalAudio[0].pause();
				scene.globalAudio.off("ended");
				this.dom.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
		scene_3 : {
			dom : $(".scene_3"),
			enter : function(cb){
				scene.scene_2.exit();
				scene.backgroundsound[0].pause();
				boom.stop();
				squarespeak1.stop();
				clearTimeout(scene.timer);
				$(".scene_3 .sprite.bomb").show();
				scene.globalAudio[0].pause();
				scene.globalAudio.off("ended");
				this.dom.fadeIn(function(){
					scene.scene_3.dom.find(".square.speak").addClass('active');
					scene.timer = setTimeout(function(){

						scene.globalAudio.attr("src" ,stage.fileList['scene3_rect_sound'].src);
						scene.globalAudio[0].play();
						squarespeak1.say();
						scene.globalAudio.one("ended" ,function(){
							squarespeak1.stop();
							scene.scene_3.dom.find(".square.speak").removeClass('active');
						})

					}, 2800)
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				scene.backgroundsound[0].pause();
				boom.stop();
				squarespeak1.stop();
				clearTimeout(scene.timer);
				$(".scene_3 .sprite.bomb").show();
				scene.globalAudio[0].pause();
				scene.globalAudio.off("ended");
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
				scene.scene_3.exit();
				scene.backgroundsound[0].pause();
				scene.globalAudio[0].pause();
				knock.stop();
				knock.dom.hide();
				scene.globalAudio.off("ended");
				this.dom.fadeIn(function(){

					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				scene.backgroundsound[0].pause();
				scene.globalAudio[0].pause();
				knock.stop();
				knock.dom.hide();
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
				$(".stage").css({'background-color':'#f6f6f6'})
				scene.scene_4.exit();
				scene.backgroundsound[0].pause();
				scene.globalAudio[0].pause();
				scene.scene_5.dom.find(".sprite.active").removeClass('active');
				scene.globalAudio.off("ended");
				this.dom.fadeIn(function(){

					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				$(".stage").css({'background-color':'#f6f6f6'})
				scene.backgroundsound[0].pause();
				scene.globalAudio[0].pause();
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
				$(".stage").css({'background-color':'#f6f6f6'})
				scene.scene_5.exit();
				scene.backgroundsound[0].pause();
				scene.globalAudio[0].pause();
				scene.globalAudio.off("ended");
				clearTimeout(scene.timer);
				this.dom.fadeIn(function(){
					scene.timer = setTimeout(function(){
 						scene.globalAudio.attr("src" ,stage.fileList['scene6_background_sound'].src);
						scene.globalAudio[0].play();
						scene.globalAudio.one("ended" ,function(){
							scene.scene_6.dom.fadeOut(1200, function() {
								//背景变黑
								$(".stage").css({'background-color':'#000'});
							});
						})
					}, 2000)
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				scene.backgroundsound[0].pause();
				scene.globalAudio[0].pause();
				scene.globalAudio.off("ended");
				clearTimeout(scene.timer);
				this.dom.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
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
		if(winRatio>=gbRatio){
			stage.initH = winH;
			stage.initW = parseInt(stage.initH*gbRatio);
		}else{
			stage.initH = winH;
			stage.initW = parseInt(stage.initH*winRatio);
		}
		stageDom.css({'width':stage.initW,'height':stage.initH});
		$(".headertool,.footertool").css('width',stage.initW);
		$(".gohome").css('width',stage.initW-120);
		$(".layout_mask").css({'width':stage.initW,'height':stage.initH});
		stage.scene = scene;
		var tag = $(".stage .scene:visible").attr("data-tag") ||1;
		stage.setPageTag(tag);
		var scaleImage = $(".forscale");
		$.each(scaleImage,function(i, el) {
			var that = $(el);
			if( that[0].nodeName.toLowerCase() !="img" ){
				that.css("transform","scale("+imgscalewithheight+")")
			}else{
				var originWidth = that.attr("data-width");
				var scaleWidth = originWidth*imgscalewithheight;
				that.css("width",scaleWidth);
			}
		});
	}
	win.on("resize" ,function(){
		stage.Init();
	})
	//文件预加载和场景置入
	stage.perLoadFiles = function(){
		var queue = new createjs.LoadQueue();
		var manifest=[
			//公用资源、开场动画
			{id: "background", src:"image/background.jpg"},
			{id: "title", src:"image/class_title.png"},
			{id: "backgroundsound", src:"image/backgroundsound.mp3"},

			{id: "back", src:"image/back.png"},
			{id: "setting", src:"image/setting.png"},
			{id: "menu", src:"image/menu.png"},
			{id: "notice", src:"image/notice.png"},
			{id: "music", src:"image/music.png"},
			{id: "close", src:"image/close.png"},
			{id: "refresh", src:"image/refresh.png"},
			{id: "pre", src:"image/pre.png"},
			{id: "post", src:"image/post.png"},
			{id: "cursor", src:"image/cursor.png"},

			{id: "graph_1", src:"image/graph_1.png"},
			{id: "graph_2", src:"image/graph_2.png"},
			{id: "graph_3", src:"image/graph_3.png"},
			{id: "graph_4", src:"image/graph_4.png"},
			{id: "graph_5", src:"image/graph_5.png"},
			{id: "graph_6", src:"image/graph_6.png"},
			{id: "graph_7", src:"image/graph_7.png"},
			{id: "graph_8", src:"image/graph_8.png"},
			{id: "graph_9", src:"image/graph_9.png"},
			{id: "graph_10", src:"image/graph_10.png"},
			{id: "graph_11", src:"image/graph_11.png"},
			{id: "graph_12", src:"image/graph_12.png"},
			{id: "graph_13", src:"image/graph_13.png"},
			{id: "graph_14", src:"image/graph_14.png"},
			{id: "graph_15", src:"image/graph_15.png"},
			{id: "graph_16", src:"image/graph_16.png"},
			{id: "graph_17", src:"image/graph_17.png"},
			{id: "square_say", src:"image/square_say.png"},
			//场景1
			{id: "scene1_background", src:"image/scene1/scene1_background.jpg"},
			{id: "alpha_walk", src:"image/scene1/alpha_walk.png"},
			{id: "alpha_say", src:"image/scene1/alpha_say.png"},
			{id: "emma_walk", src:"image/scene1/emma_walk.png"},
			{id: "emma_say", src:"image/scene1/emma_say.png"},			
			{id:"talk_1", src:"image/scene1/talk_1.mp3"},
			{id:"talk_2", src:"image/scene1/talk_2.mp3"},
			{id:"talk_3", src:"image/scene1/talk_3.mp3"},

			//场景2
			{id: "scene2_background", src:"image/scene2/scene2_background.png"},
			{id: "question ", src:"image/question .png"},		
			{id:"move_sound", src:"image/scene2/move_sound.mp3"},
			{id:"poke_sound", src:"image/scene2/poke_sound.mp3"},

			{id:"2_d_1", src:"image/scene2/2_d_1.mp3"},
			{id:"2_d_2", src:"image/scene2/2_d_2.mp3"},

			//场景3
			{id: "scene3_background", src:"image/scene3/scene3_background.png"},
			{id: "frame_triangle_bomb", src:"image/scene3/frame_triangle_bomb.png"},			
			{id:"scene3_quadrilateral_sound", src:"image/scene3/scene3_quadrilateral_sound.mp3"},
			{id:"scene3_rect_sound", src:"image/scene3/scene3_rect_sound.mp3"},
			{id:"scene3_triangle_sound", src:"image/scene3/scene3_triangle_sound.mp3"},

			{id:"3_d_1", src:"image/scene3/3_d_1.mp3"},
			//场景4
			{id: "scene4_background", src:"image/scene4/scene4_background.jpg"},
			{id: "frame_knockdoor", src:"image/scene4/frame_knockdoor.png"},			
			{id:"knock_sound", src:"image/scene4/knock_sound.mp3"},
			{id:"4_d_square_1", src:"image/scene4/4_d_square_1.mp3"},

			//场景5
			{id: "scene5_background", src:"image/scene5/scene5_background.png"},
		    
		    {id:"scene6_background_sound", src:"image/scene6/scene6_background_sound.mp3"},
		]
		queue.on("complete", handleComplete, this);
		queue.on("progress" ,handleFileProgress);
		queue.on("fileload", handleFileLoad);
	    queue.on("error", loadError);
	    queue.loadManifest( manifest );

		function handleComplete() {
			stage.cursor = rootpath+queue.getItem("cursor").src;
		    $(".scene_0").css("background-image",'url('+rootpath+queue.getItem("background").src+')');
		    $(".scene_1").css("background-image",'url('+rootpath+queue.getItem("scene1_background").src+')');
		    
		    $(".title").attr('src',rootpath+queue.getItem("title").src);

		    $(".graph_1>img").attr('src',rootpath+queue.getItem("graph_1").src);
		    $(".graph_2>img").attr('src',rootpath+queue.getItem("graph_2").src);
		    $(".graph_3>img").attr('src',rootpath+queue.getItem("graph_3").src);
		    $(".graph_4>img").attr('src',rootpath+queue.getItem("graph_4").src);
		    $(".graph_5>img").attr('src',rootpath+queue.getItem("graph_5").src);
		    $(".graph_6>img").attr('src',rootpath+queue.getItem("graph_6").src);
		    $(".graph_7>img").attr('src',rootpath+queue.getItem("graph_7").src);
		    $(".graph_8>img").attr('src',rootpath+queue.getItem("graph_8").src);
		    $(".graph_9>img").attr('src',rootpath+queue.getItem("graph_9").src);
		    $(".graph_10>img").attr('src',rootpath+queue.getItem("graph_10").src);
		    $(".graph_11>img").attr('src',rootpath+queue.getItem("graph_11").src);
		    $(".graph_12>img").attr('src',rootpath+queue.getItem("graph_12").src);
		    $(".graph_13>img").attr('src',rootpath+queue.getItem("graph_13").src);
		    $(".graph_14>img").attr('src',rootpath+queue.getItem("graph_14").src);
		    $(".graph_15>img").attr('src',rootpath+queue.getItem("graph_15").src);
		    $(".graph_16>img").attr('src',rootpath+queue.getItem("graph_16").src);
		    $(".graph_17>img").attr('src',rootpath+queue.getItem("graph_17").src);
		    
		    $("body").append($('<img src="'+rootpath+queue.getItem("menu").src+'" class="hide">'));
		    $("body").append($('<img src="'+rootpath+queue.getItem("notice").src+'" class="hide">'));
		    $("body").append($('<img src="'+rootpath+queue.getItem("music").src+'" class="hide">'));
		    $("body").append($('<img src="'+rootpath+queue.getItem("close").src+'" class="hide">'));
		    
		    //场景内小元素
		    $(".scene_1 .m_1").css("background-image",'url('+rootpath+queue.getItem("alpha_walk").src+')')
		    $(".scene_1 .m_2").css("background-image",'url('+rootpath+queue.getItem("emma_walk").src+')')

		    $(".scene_1 .m_1.speak ,.scene_2 .m_1.speak").css("background-image",'url('+rootpath+queue.getItem("alpha_say").src+')')
		    $(".scene_1 .m_2.speak").css("background-image",'url('+rootpath+queue.getItem("emma_say").src+')')
		   	$(".scene_1 .square.speak,.scene_3 .square,.scene_4 .square,.scene_6 .square").css("background-image",'url('+rootpath+queue.getItem("square_say").src+')')
		   	
		   	$(".scene_2 .question").attr("src",rootpath+queue.getItem("question ").src)

		   	$(".scene_2").css("background-image",'url('+rootpath+queue.getItem("scene2_background").src+')')
		   	$(".scene_2 .question").attr("src",rootpath+queue.getItem("question ").src)

		   	$(".scene_3").css("background-image",'url('+rootpath+queue.getItem("scene3_background").src+')')
		   	$(".scene_3 .question").attr("src",rootpath+queue.getItem("question ").src)

		   	$(".scene_3 .bomb").css("background-image",'url('+rootpath+queue.getItem("frame_triangle_bomb").src+')')

		   	$(".scene_4").css("background-image",'url('+rootpath+queue.getItem("scene1_background").src+')');
		   	$(".scene_4 .m_1.speak").css("background-image",'url('+rootpath+queue.getItem("alpha_say").src+')')
		    $(".scene_4 .m_2.speak").css("background-image",'url('+rootpath+queue.getItem("emma_say").src+')')
		    $(".scene_4 .knock").css("background-image",'url('+rootpath+queue.getItem("frame_knockdoor").src+')')

		    $(".scene_5").css("background-image",'url('+rootpath+queue.getItem("scene5_background").src+')');

		    $(".scene_6").css("background-image",'url('+rootpath+queue.getItem("scene1_background").src+')');
		    $(".scene_6 .m_1.speak").css("background-image",'url('+rootpath+queue.getItem("alpha_say").src+')')
		    $(".scene_6 .m_2.speak").css("background-image",'url('+rootpath+queue.getItem("emma_say").src+')')
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

		    scene.globalAudio.attr('src',rootpath+queue.getItem("move_sound").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['move_sound'] = queue.getItem("move_sound");
		    scene.globalAudio.attr('src',rootpath+queue.getItem("poke_sound").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['poke_sound'] = queue.getItem("poke_sound");
		    scene.globalAudio.attr('src',rootpath+queue.getItem("2_d_1").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['2_d_1'] = queue.getItem("2_d_1");
		    scene.globalAudio.attr('src',rootpath+queue.getItem("2_d_2").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['2_d_2'] = queue.getItem("2_d_2");

		    scene.globalAudio.attr('src',rootpath+queue.getItem("scene3_quadrilateral_sound").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['scene3_quadrilateral_sound'] = queue.getItem("scene3_quadrilateral_sound");
		    scene.globalAudio.attr('src',rootpath+queue.getItem("scene3_rect_sound").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['scene3_rect_sound'] = queue.getItem("scene3_rect_sound");
		    scene.globalAudio.attr('src',rootpath+queue.getItem("scene3_triangle_sound").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['scene3_triangle_sound'] = queue.getItem("scene3_triangle_sound");
		    scene.globalAudio.attr('src',rootpath+queue.getItem("3_d_1").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['3_d_1'] = queue.getItem("3_d_1");

		    scene.globalAudio.attr('src',rootpath+queue.getItem("knock_sound").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['knock_sound'] = queue.getItem("knock_sound");
		    scene.globalAudio.attr('src',rootpath+queue.getItem("4_d_square_1").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['4_d_square_1'] = queue.getItem("4_d_square_1");

		    scene.globalAudio.attr('src',rootpath+queue.getItem("scene6_background_sound").src)
		    scene.globalAudio[0].pause();
		    stage.fileList['scene6_background_sound'] = queue.getItem("scene6_background_sound");
		    
		    stage.Init();
		    stage.entry();
		    $(".dialog_global_layout").remove();
		}
		//处理单个文件加载
		function handleFileLoad(event) {
		    if(event.item.type == "image"){
		    }
		}
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
			scene.globalAudio.attr("src" ,stage.fileList['poke_sound'].src);
			scene.globalAudio[0].play();
			if(tag<1){
				alert("已经是第一章了")
				return;
			}else{
				stage.goScene(tag)
			}
		})
		//章节刷新
		$(".reload").on("click" ,function(){
			scene.globalAudio.attr("src" ,stage.fileList['poke_sound'].src);
			scene.globalAudio[0].play();
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
			scene.globalAudio.attr("src" ,stage.fileList['poke_sound'].src);
			scene.globalAudio[0].play();
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
		
		$(".scene_2").on("click" ,".sprite" ,function(){
			var that = $(this);
			that.css("cursor",'url('+stage.cursor+'),pointer');
			
			if(that.hasClass('active')){
				if(that.hasClass('move')){
					scene.globalAudio.attr("src" ,stage.fileList['move_sound'].src);
					scene.globalAudio[0].play();
					that.addClass('moveout');
				}else{
					that.addClass('shake animated');
					$(".scene_2 .question").show();
					scene.globalAudio.attr("src" ,stage.fileList['poke_sound'].src);
					scene.globalAudio[0].play();
					setTimeout(function(){
						that.removeClass('shake animated');
					},800)
				}
			}else{
				that.addClass('active');
			}
		})
		$(".scene_2").on("click",'.question',function(){
			scene.globalAudio.attr("src" ,stage.fileList['2_d_2'].src);
			scene.globalAudio[0].play();
		})

		$(".scene_3 .sprite").on("click" ,function(e){
			e.stopPropagation();
			e.preventDefault();
			var that = $(this);
			if(that.hasClass('bomb')){
				if(that.hasClass('active')){
					boom.say();
				}else{
					that.addClass('active');
					scene.globalAudio.attr("src" ,stage.fileList['scene3_triangle_sound'].src);
					scene.globalAudio[0].play();
				}
			}else{
				scene.globalAudio.attr("src" ,stage.fileList['scene3_quadrilateral_sound'].src);
				scene.globalAudio[0].play();
			}
		})
		$(".scene_3").on("click" ,'.question',function(){
			scene.globalAudio.attr("src" ,stage.fileList['2_d_2'].src);
			scene.globalAudio[0].play();
		})
		$(".scene_4").on("click",function(){
			scene.globalAudio.attr("src" ,stage.fileList['poke_sound'].src);
			scene.globalAudio[0].play();
			knock.stop();
			if(!$(".scene_4 .knock:visible")[0]){
				$(".scene_4 .knock").fadeIn(100);
			}
			scene.globalAudio.attr("src" ,stage.fileList['knock_sound'].src);
			scene.globalAudio[0].play();
			knock.say()
			scene.globalAudio.one("ended" ,function(){
				knock.stop();
				$(".scene_4 .knock").fadeOut(100);
				squarespeak2.say();
				scene.globalAudio.attr("src" ,stage.fileList['4_d_square_1'].src);
				scene.globalAudio[0].play();
				scene.globalAudio.one("ended" ,function(){
					squarespeak2.stop();
					setTimeout(function(){
						stage.setPageTag(5)
						scene.scene_5.enter();
					}, 800)
				})
			})
		})
		$(".scene_5").on("click" ,function(){
			scene.globalAudio.attr("src" ,stage.fileList['poke_sound'].src);
			scene.globalAudio[0].play();
			$(".scene_5 .graph_8").addClass('active');
		})
	}
	/**帧动画--逐个设置**/
	//场景1-1
	var alphamove={
		dom : $(".scene_1 .m_1.move"),
		timer: void(0),
		say:function(){
			var i = 0;
			alphamove.timer =  window.setInterval(frameAnmi, 60);

			function frameAnmi() {
			    if (i >20) { 
			    	//i = 0;  //重新开始循环
			    	clearInterval(this.timer); //停止
			    }else{
				    alphamove.dom[0].style.backgroundPosition = "-" + i * 158 + "px -2px";
				    i++;
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			alphamove.dom[0].style.backgroundPosition = "-2px -2px";
		}
	};
	var emmamove={
		dom : $(".scene_1 .m_2.move"),
		timer: void(0),
		say:function(){
			var i = 0;
			emmamove.timer =  window.setInterval(frameAnmi, 100);

			function frameAnmi() {
			    if(i >20) { 
			    	i = 0;  //重新开始循环
			    	clearInterval(this.timer);
			    }else{
				    emmamove.dom[0].style.backgroundPosition = "-" + i * 243 + "px -2px";
				    i++;
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			emmamove.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
	var emmaspeak={
		dom : $(".scene_1 .m_2.speak"),
		timer: void(0),
		say:function(){
			var i = 0;
			emmaspeak.timer =  window.setInterval(frameAnmi, 100);

			function frameAnmi() {
			    if(i >31) { 
			    	i = 0;  //重新开始循环
			    }else{
				    emmaspeak.dom[0].style.backgroundPosition = "-" + i * 255 + "px -2px";
				    i++;
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			emmaspeak.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
	var squarespeak={
		dom : $(".scene_1 .square.speak"),
		timer: void(0),
		say:function(){
			var i = 0;
			squarespeak.timer =  window.setInterval(frameAnmi, 140);
			var t=1;
			function frameAnmi() {
				++t;
				if((t<20 && t>10 )|| (t>30 && t<40)){
					if(i >4) { 
				    	i = 0;  //重新开始循环
				    }else{
					    squarespeak.dom[0].style.backgroundPosition = "-" + i * 182 + "px -2px";
					    i++;
					}
				}else{
					if(i >1) { 
			    		i = 0;  //重新开始循环
				    }else{
					    squarespeak.dom[0].style.backgroundPosition = "-" + i * 182 + "px -2px";
					    i++;
					}
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			squarespeak.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
	var alphaspeak={
		dom : $(".scene_2 .m_1.speak"),
		timer: void(0),
		say:function(){
			var i = 0;
			alphaspeak.timer =  window.setInterval(frameAnmi, 100);

			function frameAnmi() {
			    if(i >23) { 
			    	i = 0;  //重新开始循环
			    }else{
				    alphaspeak.dom[0].style.backgroundPosition = "-" + i * 171 + "px -2px";
				    i++;
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			alphaspeak.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
	var alphaspeak={
		dom : $(".scene_2 .m_1.speak"),
		timer: void(0),
		say:function(){
			var i = 0;
			alphaspeak.timer =  window.setInterval(frameAnmi, 100);
			//requestAnimationFrame(frameAnmi);
			function frameAnmi() {
			    if (i >22) { 
			    	i = 0;  //重新开始循环
			    }else{
				    alphaspeak.dom[0].style.backgroundPosition = "-" + i * 173 + "px -2px";
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
	var squarespeak1={
		dom : $(".scene_3 .square.speak"),
		timer: void(0),
		say:function(){
			var i = 0;
			squarespeak1.timer =  window.setInterval(frameAnmi, 140);

			var t=1;
			function frameAnmi() {
				++t;
				if((t<20 && t>10 )|| (t>30 && t<40)){
					if(i >4) { 
				    	i = 0;  //重新开始循环
				    }else{
					    squarespeak1.dom[0].style.backgroundPosition = "-" + i * 182 + "px -2px";
					    i++;
					}
				}else{
					if(i >1) { 
			    		i = 0;  //重新开始循环
				    }else{
					    squarespeak1.dom[0].style.backgroundPosition = "-" + i * 182 + "px -2px";
					    i++;
					}
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			squarespeak1.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
	var boom={
		dom : $(".scene_3 .bomb"),
		timer: void(0),
		say:function(){
			var i = 0;
			boom.timer =  window.setInterval(frameAnmi, 100);

			function frameAnmi() {
			    if(i >15) { 
			    	//i = 0;  //重新开始循环
			    	clearInterval(this.timer);
			    	boom.dom.hide();
			    }else{
				    boom.dom[0].style.backgroundPosition = "-" + i * 264 + "px -2px";
				    i++;
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			boom.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
	var knock={
		dom : $(".scene_4 .knock"),
		timer: void(0),
		say:function(){
			var i = 0;
			knock.timer =  window.setInterval(frameAnmi, 100);

			function frameAnmi() {
			    if(i >1) { 
			    	i = 0;  //重新开始循环
			    }else{
				    knock.dom[0].style.backgroundPosition = "-" + i * 180 + "px -2px";
				    i++;
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			knock.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
	var squarespeak2={
		dom : $(".scene_4 .square.speak"),
		timer: void(0),
		say:function(){
			var i = 0;
			squarespeak2.timer =  window.setInterval(frameAnmi, 100);

			var t=1;
			function frameAnmi() {
				++t;
				if((t<20 && t>10 )|| (t>30 && t<40)){
					if(i >4) { 
				    	i = 0;  //重新开始循环
				    }else{
					    squarespeak2.dom[0].style.backgroundPosition = "-" + i * 182 + "px -2px";
					    i++;
					}
				}else{
					if(i >1) { 
			    		i = 0;  //重新开始循环
				    }else{
					    squarespeak2.dom[0].style.backgroundPosition = "-" + i * 182 + "px -2px";
					    i++;
					}
				}
			}
		},
		stop:function(){
			clearInterval(this.timer);
			squarespeak2.dom[0].style.backgroundPosition = "-2px -2px";
		}
	}
})

 
