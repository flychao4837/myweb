$(function(){
	var win = $(window);
	var origin = window.location.origin;
	var rootpath = window.location.pathname;
	var sp = rootpath.lastIndexOf("/")
	rootpath = rootpath.substring(0,sp);
	rootpath = origin+rootpath+"/";
	var bgW = 1200;
	var gbH = 760;
	var imgscalewithheight = 1;
	var gbRatio = 1200/760;
	//场景及其元素
	var stage = window.stage = {};
	var stageDom = $(".scene");

	stage.target = 0;
	stage.fileList={};
	stage.sceneList=[];
	stage.TotalScene = 6;
	//场景内行为处理
	var scene = {
		timer:void(0),
		globalVideo : $("#my_audio"),
		scene_1 : {
			dom : $(".scene_1"),
			box :$(".box_1"),
			enter : function(cb){
				this.box.fadeIn(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			},
			exit : function(cb){
				this.box.fadeOut(function(){
					if(typeof(cb)==="function"){
						cb.call(cb)
					}
				});
			}
		},
	}
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
		stage.scene = scene;


		var scaleImage = $(".forscale");
		$.each(scaleImage,function(i, el) {
			var that = $(el);
			if( that[0].nodeName.toLowerCase() !="img" ){
				that.css("transform","scale("+imgscalewithheight+")")
			}else{
				var originWidth = that.attr("data-width");
				var scaleWidth = originWidth*imgscalewithheight;
				that.css("width",scaleWidth);
				if(that.hasClass('slider-cover')){
					var sheight = parseInt(imgscalewithheight*506);
					var swidth = parseInt(imgscalewithheight*900)
					var dist = (winH-sheight)/2
					$(".slider-list").css("height",sheight);
					$(".slider,#my_audio").css("margin-top",dist);
					$("#my_audio").css({'width':swidth,'height':sheight});

					var items = $(".scaleitem");
					var itemsHeight = parseInt(imgscalewithheight*146);
					items.css("height",itemsHeight*3);
				}
			}
		});
		
		setTimeout(function(){
			$(".slider").myAudioShow({
	            'duration': 800,
	            'delays': 1600,
	        });
		}, 300)
	}
	win.on("resize" ,function(){
		setTimeout(function(){
			location.reload();
		}, 100);
		return false;
	})
	//文件预加载和场景置入
	stage.perLoadFiles = function(){
		var queue = new createjs.LoadQueue();
		var manifest=[
			//公用资源、开场动画
			{id: "logo", src:"image/logo.png"},
			{id: "scene_1", src:"image/scene_1.png"},
			{id: "scene_2", src:"image/scene_2.png"},
			{id: "scene_3", src:"image/scene_3.png"},
			{id: "scene_5", src:"image/scene_5.png"},
			{id: "scene_6_r", src:"image/scene_6_r.png"},
			{id: "btn_prev", src:"image/btn-prev.png"},
			{id: "btn_next", src:"image/btn-next.png"},

			{id: "btn_play_img", src:"image/btn_play.png"},
			{id: "slider-cover-1", src:"image/slider-cover-1.png"},
			{id: "slider-cover-2", src:"image/slider-cover-2.png"},
			{id: "slider-cover-3", src:"image/slider-cover-3.png"},
			{id: "slider-cover-4", src:"image/slider-cover-4.png"},

			{id: "slider-nav-1", src:"image/slider-nav-1.png"},
			{id: "slider-nav-2", src:"image/slider-nav-2.png"},
			{id: "slider-nav-3", src:"image/slider-nav-3.png"},
			{id: "slider-nav-4", src:"image/slider-nav-4.png"},

			// {id: "audio_1", src:"image/audio_1.mp4"},
			// {id: "audio_2", src:"image/audio_2.mp4"},
			// {id: "audio_3", src:"image/audio_3.mp4"},
			// {id: "audio_4", src:"image/audio_4.mp4"},
		]
		queue.on("complete", handleComplete, this);
		queue.on("progress" ,handleFileProgress);
		queue.on("fileload", handleFileLoad);
	    queue.on("error", loadError);
	    queue.loadManifest( manifest );

		function handleComplete() {

		    $(".scene_1").css("background-image",'url('+rootpath+queue.getItem("scene_1").src+')');
		    
		    $(".logo").attr('src',rootpath+queue.getItem("logo").src);
		    $(".scene_2").css("background-image",'url('+rootpath+queue.getItem("scene_2").src+')');
		    $(".scene_3").css("background-image",'url('+rootpath+queue.getItem("scene_3").src+')');
		    $(".scene_5").css("background-image",'url('+rootpath+queue.getItem("scene_5").src+')');
		    $(".scene_6_r").css("background-image",'url('+rootpath+queue.getItem("scene_6_r").src+')');

		    $(".prev").css("background-image",'url('+rootpath+queue.getItem("btn_prev").src+')');
		    $(".next").css("background-image",'url('+rootpath+queue.getItem("btn_next").src+')');
		    //$("body").append($('<img src="'+rootpath+queue.getItem("notice").src+'" class="hide">'));
		    //$(".btn_play_img").attr('src',rootpath+queue.getItem("btn_play_img").src);
		    $(".btn_play").css("background-image",'url('+rootpath+queue.getItem("btn_play_img").src+')');

		    $(".slider-cover-1").attr('src',rootpath+queue.getItem("slider-cover-1").src);
		    $(".slider-cover-2").attr('src',rootpath+queue.getItem("slider-cover-2").src);
		    $(".slider-cover-3").attr('src',rootpath+queue.getItem("slider-cover-3").src);
		    $(".slider-cover-4").attr('src',rootpath+queue.getItem("slider-cover-4").src);

		    $(".slider-nav-1").attr('src',rootpath+queue.getItem("slider-nav-1").src);
		    $(".slider-nav-2").attr('src',rootpath+queue.getItem("slider-nav-2").src);
		    $(".slider-nav-3").attr('src',rootpath+queue.getItem("slider-nav-3").src);
		    $(".slider-nav-4").attr('src',rootpath+queue.getItem("slider-nav-4").src);
		    // scene.globalVideo.attr('src',rootpath+queue.getItem("audio_1").src)
		    // scene.globalVideo[0].pause();
		    // stage.fileList['audio_1'] = queue.getItem("audio_1");

		    // scene.globalVideo.attr('src',rootpath+queue.getItem("audio_2").src)
		    // scene.globalVideo[0].pause();
		    // stage.fileList['audio_2'] = queue.getItem("audio_2");

		    // scene.globalVideo.attr('src',rootpath+queue.getItem("audio_3").src)
		    // scene.globalVideo[0].pause();
		    // stage.fileList['audio_3'] = queue.getItem("audio_3");

		    // scene.globalVideo.attr('src',rootpath+queue.getItem("audio_4").src)
		    // scene.globalVideo[0].pause();
		    // stage.fileList['audio_4'] = queue.getItem("audio_4");

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
	//开场进入
	stage.entry = function(){
		stage.bindAct();
		$(".box").show()
		//展示入口
		scene.scene_1.enter();
		stage.scroll();
	}
	//鼠标滚动翻页

	var mousewheelEvent = false,
        scrollAnimate = false,
        isStretch = false,
        delay = 800,
        viewBox = $(".view_box"),
        viewBoxScroller = $(".view_box_scroller"),
        boxid = 1,
        scrollTranslatestu = 0,
        box = $(".box"),
        pages = box.length,
       	viewBoxHeight = win.height();
	stage.scroll = function(){
        function addMouseWheelEvn() {
            setTimeout(function() {
                $(document).on("mousewheel DOMMouseScroll", function(e) {
                    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
                        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
                    if (scrollAnimate) {
                        return false;
                    }
                    if (delta > 0) {
                        // 滚轮向上滚
                        roll('up');

                    } else if (delta < 0) {
                        // 滚轮向下滚
                        roll('down')
                    }
                });
            }, 100);
        }
        addMouseWheelEvn();

        function removeMouseWheelEvn() {
            $(document).off("mousewheel DOMMouseScroll");
        }

        function addkeyEvn() {
            $(document).on('keydown', function(event) {
                if (event.keyCode == '40') {
                    if (boxid == 7) {
                        return;
                    }
                    removeKeyEvn();
                    roll('down');
                }
            });
        }
        function removeKeyEvn() {
            $(document).off('keydown');
            setTimeout(function() {
                addkeyEvn();
            }, 1000);
        }
        addkeyEvn();
        /*页面翻页*/
        function roll(type) {
            var dir = 0;
            mousewheelEvent = true;
            scrollAnimate = true;
            removeMouseWheelEvn();
            $("#my_audio")[0].pause();
            if(boxid==5 || boxid==6){
            	$(".scene_6_l_box").addClass('move');
            }else{
            	$(".scene_6_l_box.move").removeClass('move');
            }
            switch (type) {
                case 'up': //页面向上
                    if (boxid == 1) {
                        scrollAnimate = false;
                        addMouseWheelEvn();
                        boxid = 1;
                    } else {
                    	scrollAnimate = false;
                        scrollBox(+1);
                        --boxid;
                    }
                    break;
                case 'down': //页面向下
                    if (boxid >=pages) {
                        scrollAnimate = false;
                        boxid = pages;
                        addMouseWheelEvn();
                    }else {
                    	scrollAnimate = false;
                        scrollBox(-1)
                        ++boxid;
                    }
                    break;
                default:
                    break;
            }
        }
        /*box块 的上卷动作*/
        function scrollBox(d) {
            var dir = 0;
            var top = parseInt(viewBoxScroller.css("top"));
            dir = d > 0 ? viewBoxHeight : -viewBoxHeight;

            viewBoxScroller.animate({
                'top': top + dir
            }, 1600,'easeInOutQuart', function() {
                scrollAnimate = false;
                addMouseWheelEvn();
            });
        }
        /*后面是否还有可滚动的box区域*/
        var hasNextlBox = function() {
                var box = $($(".box").get(boxid - 1)),
                    nextBox = box.next('.box');
                if (nextBox.length) {
                    return true;
                } else {
                    return false;
                }
            }
            /*前面是否还有可滚动的box区域*/
        var hasPrevBox = function() {
            var box = $($(".box").get(boxid - 1)),
                prevBox = box.prev('.box');
            if (prevBox.length) {
                return true;
            } else {
                return false;
            }
        }
        $(".menu").on("click","a",function(e){
			e.preventDefault();
			e.stopPropagation();
			var that = $(this);
			var id = parseInt(that.attr("data-id"));
			if(id){
				removeMouseWheelEvn();
				viewBoxScroller.animate({
	                'top': -viewBoxHeight*(id-1)
	            }, id*400,'easeInOutQuart', function() {
	                scrollAnimate = false;
	                boxid = id;
	                addMouseWheelEvn();
	            });
			}
		})
	}
	//给个别元素或行为绑定动画或事件
	stage.bindAct = function(){
		$(".slider-list").on("click","li" ,function(e){
			e.preventDefault();
			e.stopPropagation();
			var curCover = $(".slider-list>li.active");
			var tag = curCover.attr("data-audio");
			if(tag){
				//scene.globalVideo.attr("src",stage.fileList[tag].src).show();
				scene.globalVideo.attr("src","image/"+tag+".mp4").show();
				scene.globalVideo[0].play();
				scene.globalVideo.on("ended" ,function(){
					
				})
			}
		})

		$(".btn_play").on("click" ,function(e){
			e.preventDefault();
			e.stopPropagation();
			var curCover = $(".slider-list>li.active");
			var tag = curCover.attr("data-audio");
			if(tag){
				//scene.globalVideo.attr("src",stage.fileList[tag].src).show();
				scene.globalVideo.attr("src","image/"+tag+".mp4").show();
				scene.globalVideo[0].play();
				scene.globalVideo.on("ended" ,function(){
					
				})
			}
		})
	}
})