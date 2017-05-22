'use strict'
$(function(){
	$('.hiSlider3').hiSlider({
		isFlexible: true,
		isSupportTouch: true,
		isAuto:false,
		isShowControls:false,
		titleAttr: function(curIdx){
			return $('img', this).attr('alt');
		}
	});
})