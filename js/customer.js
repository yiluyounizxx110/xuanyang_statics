$(function(){
	$(".customerlist td.collection").click(function(){
		if($(this).hasClass("collected")){
			$(this).removeClass("collected");
		}else{
			$(this).addClass("collected");
		}
	});
})
