$(function(){
	$.fn.myAudioShow = function(opt) {
		var defaults = {
			duration: 1000,
			auto: false, 
			loop: false,
			delays: 3000,
		}
		var _this = this,
			slider = $(_this),
			sliderRollBox = slider.find(".slider-nav"),
			slideritems = slider.find("li.item"),
			sliderLen = slideritems.length, //index=0
			sliderHeight = slideritems.first().height()+3,
			sliderWidth = slideritems.first().width(),
			itemIndex = 0,
			idx = 0,
			sliderTimer,
			options = $.extend(defaults, opt || {}),
			cloneItems = slideritems.clone(true).removeClass('active');

		function init() {
			itemIndex = 0
			sliderRollBox.css({
				top: -itemIndex * sliderHeight,
			});

			bindAct();
		};
		init();

		/*向前翻页*/
		function goPrev() {
			slideritems.stop().animate({
				top: -idx * sliderHeight,
			},options['duration']);
			
		}
		/*向后翻页*/
		function goNext() {
			slideritems.stop().animate({
				top: -idx * sliderHeight,
			},options['duration']);
		}
		//按钮和点击事件
		function bindAct(){
			sliderRollBox.on("click" ,".prev",function(){
				++idx;
				if(idx>(sliderLen-3)){
					idx = sliderLen-3
					return;
				}else{
					goPrev();
				}
			});
			sliderRollBox.on("click" ,".next",function(){
				--idx;
				if(idx<0){
					idx = 0
					return;
				}else{
					goNext();
				}
			})
			sliderRollBox.on("click" ,".item",function(){
				var that = $(this);
				$("#my_audio")[0].pause();
				$("#my_audio").hide();
				if(slideritems.find("li.active").is("visible")){
					slideritems.find("li.active").removeClass('active');
				}else{
					slideritems.find("li.active").fadeIn(16).removeClass('active');
				}
				
				that.addClass('active');
				var index = that.index();
				$(".slider-list li.active").fadeOut(600,function(){
					$(".slider-list li.active").removeClass('active');
					$($(".slider-list li").get(index)).fadeIn(300).addClass('active');
				})
			})
		}
		/*清除定时器*/
		function clearTimeer(sliderTimer) {
			if (sliderTimer) {
				clearTimeout(sliderTimer);
				sliderTimer = undefined;
			}
		}
		/*开始定时动画*/
		function runTimer() {
			sliderTimer = setTimeout(function() {
				++idx;
				sliderRollBox.find("li.active").removeClass('active');
				goNext();
			}, 400);
		}
	};	
})	



