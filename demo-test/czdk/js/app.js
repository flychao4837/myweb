'use strict'
$(function(){
    /*录音页幻灯*/
    var swiper1 = new Swiper('.swiper1', {
        pagination : '.pagination1', //分页容器
        loop:false,                  //无缝循环滚动
        grabCursor: true,            //滑动时鼠标样式     
        onImagesReady: function(){
            console.log("onImagesReady");
        },
        onTransitionEnd:function(swiper1){
        	var idx = swiper1.realIndex;
        	var len = swiper1.slides.length;
        	if(idx==0){
            	$('.arrow-left').removeClass('active')
	        }else{
	            $('.arrow-left').addClass('active');
	        }
	        if(idx==len-1){
	            $('.arrow-right').removeClass('active')
	        }else{
	            $('.arrow-right').addClass('active');
	        }
	        $(".pagination1 .counter>span").html((+swiper1.realIndex+1)+"/"+len);
        }
    });
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

})
