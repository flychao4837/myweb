'use strict'
//$(function(){
	/*返回*/
	$(".goback").on("click" ,function(){
		$(this).parents(".layout").removeClass('on');
	})
	/*首页JS*/
    var globalAudio = $("#globalAudio");
    var dialog = new Dialog();
    /*tab页面切换*/
    $(".tab-home").on("click" ,function(){
        var that = $(this);
        if(that.hasClass('active')){
            return;
        }else{
        	$(".tab.active").removeClass('active');
        	that.addClass('active');
            globalAudio[0].pause();
            $(".layout.on").removeClass('on');
            $(".content-home").show();
            $(".content-my").hide();
            //TODO 我的滑动页初始位置,
        }
    })
    $(".tab-my").on("click" ,function(){
        var that = $(this);
        if(that.hasClass('active')){
            return;
        }else{
        	$(".tab.active").removeClass('active');
        	that.addClass('active');
            globalAudio[0].pause();
            $(".content-my").show();
            $(".content-home").hide();
            //TODO 我的滑动页初始位置,
        }
    })
    //Main Swiper
    var swiper = new Swiper('.swiper', {
        pagination : '.pagination-home', //分页容器
        loop:false,                  //无缝循环滚动
        grabCursor: true,            //滑动时鼠标样式     
        onImagesReady: function(){
            console.log("onImagesReady");
        }  
    });

    $(".task-tips").on("click" ,function(){
        $(".layout-task-tip-box").show();
    })
    /*关闭周提示*/
    $(".close-task-tip").on("click" ,function(){
        $(".layout-task-tip-box").hide();
        $(".layout-task-progress-box").show()
    })

    /*关闭分享提示*/
    $(".close-task-progress").on("click" ,function(){
        $(".layout-task-progress-box").hide();
    });

    $(".layout-task-progress-box .btn-share").on("click" ,function(){
        alert("微信分享");
    })

    //switchery切换 判断是否有个人录音，来决定是否切换、翻转
    $(".switchery").on("click" ,function(){
        var that = $(this);
        var curIdx = swiper.realIndex;
        var box = $($(".content-home .home-device .swiper-slide")[curIdx]);
        var eleFront = box.find(".listen.default");
        var eleBack = box.find(".listen.my");
        if(that.hasClass('off')){
            eleFront.addClass("out").removeClass("in");
            setTimeout(function() {
                eleBack.addClass("in").removeClass("out");
            }, 225);
        }else{
            eleBack.addClass("out").removeClass("in");
            setTimeout(function() {
                eleFront.addClass("in").removeClass("out");
            }, 225);
        }
        that.toggleClass('off');
        that.toggleClass('on');
    })

    /*朗读录音试听*/
    $(".home-device").on("click" ,".listen", function(){
        var that = $(this);
        var src = that.attr("data-media");
        globalAudio[0].pause();
        globalAudio.off("ended")
        if(that.hasClass('active')){
            globalAudio[0].pause();
            that.removeClass('active');
        }else{
            $(".home-device").find(".listen.active").removeClass('active');
            if(src){
                that.addClass('active');
                globalAudio.attr('src',src);
                globalAudio[0].play()
                globalAudio.on("ended", function(){
                    that.removeClass('active');
                })
            }else{
                console.log("没有找到录音地址")
            }
        }
    })

    /*开启录音页面*/
    $(".action .recorder").on("click" ,function(){
        var curIdx = swiper.realIndex;
        var box = $($(".content-home .home-device .swiper-slide")[curIdx]);
        var bookid = box.attr("data-book-id");
        console.log(bookid);
        dialog.tip("正在加载图片");
        $(".layout-record").show();
        $(".layout-record .swiper-wrapper").append('<div class="swiper-slide"><img src="image/8.jpg"></div>')
        $(".layout-record .swiper-wrapper").append('<div class="swiper-slide"><img src="image/9.jpg"></div>')
        $(".layout-record .swiper-wrapper").append('<div class="swiper-slide"><img src="image/10.jpg"></div>')
        swiper1.init();
        setTimeout(function(){
            dialog.destroy();
        },2000)
    })
    /*录音页幻灯*/
    var swiper1 = new Swiper('.swiper1', {
        //pagination : '.pagination1', //分页容器
        loop:false,                  //无缝循环滚动
        grabCursor: true,            //滑动时鼠标样式     
        onImagesReady: function(){
            console.log("onImagesReady");
        }  
    });
    $(".pagination1 .timer").html("00:00:00");
    var itemlen = $(".swiper-slide").length;
    $(".pagination1 .counter>span").html("1/"+itemlen);

    $('.arrow-left').click(function(e) {
        var idx = swiper1.realIndex;
        var len = swiper1.slides.length;
        var that = $(this);
        e.preventDefault();
        
        swiper1.slidePrev();
        $(".pagination1 .counter>span").html((+swiper1.realIndex+1)+"/"+len);
        $('.arrow-right').addClass('active')
        if(idx==0|| idx==1){
            that.removeClass('active')
        }else{
            that.addClass('active');
        }
    });
    $('.arrow-right').click(function(e) {
        var idx = swiper1.realIndex;
        var len = swiper1.slides.length;
        var that = $(this);
        e.preventDefault();
        swiper1.slideNext();
        $(".pagination1 .counter>span").html((+swiper1.realIndex+1)+"/"+len);
        $('.arrow-left').addClass('active');
        if(idx==len-1|| idx==len-2){
            that.removeClass('active')
        }else{
            that.addClass('active');
        }
        
    });

    $('.pagination1 .swiper-pagination-switch').click(function(){
        swiper1.swipeTo($(this).index())
    })
    /*关闭录音页*/
    $(".layout-record .close-page").on("click" ,function(){
        $(".layout-record").hide();
        globalAudio[0].pause();
        //TOTO 清理录音，微信录音处理，文件本地存储等操作
    })

    /*评分及进度*/
    function initProgress(a,b,c){
    	var num = 66;// 百分制
	    var r = 60; //圆半径
	    var r2 = 129;
	    var percent = num / 100, perimeter = Math.PI * 2 * r;
	    var perimeter2 = Math.PI * 2 * r2;
	    
	    $(".processingbar1 #progress")[0].setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));
	    $(".processingbar2 #progress")[0].setAttribute('stroke-dasharray', perimeter2 * percent + " " + perimeter2 * (1- percent));
	    $(".processingbar3 #progress")[0].setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1- percent));

	    var rate = parseInt($("html").css("font-size"))
	    var size = rate*1.8666666666666667;
	    $(".processingbar1>svg,.processingbar3>svg").attr({width:size,height:size});
	    //$(".processingbar1 .text-info,.processingbar3 .text-info").css({width:size});

	    var size2 = rate*3.7066666666666666;
	    $(".processingbar2>svg").attr({width:size2,height:size2});
	    //$(".processingbar2 .text-info").css({width:size2});
    }
    initProgress();
    /**我的-子页面滑动**/
    $(".content-my").on("click",".userinfo",function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	var that = $(this);
    	var dom = $(".layout-userinfo");
    	dom.fadeIn(200,function(){
    		dom.addClass('on');
    	});
    })
    $(".content-my").on("click",".progress",function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	var that = $(this);
    	var dom = $(".layout-progress");
    	dom.fadeIn(200,function(){
    		dom.addClass('on');
    	});
    })
    $(".content-my").on("click",".history",function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	var that = $(this);
    	var dom = $(".layout-history");
    	dom.fadeIn(200,function(){
    		dom.addClass('on');
    	});
    })
    $(".content-my").on("click",".deposit",function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	var that = $(this);
    	var dom = $(".layout-deposit");
    	dom.fadeIn(200,function(){
    		dom.addClass('on');
    	});
    })
    
//})
