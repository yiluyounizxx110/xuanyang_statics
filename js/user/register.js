$(function(){
	initPage();
});
function initPage(){
	$("input.agree").click(function(){
		var tag = $("input.agree").prop("checked");
		if(tag){
			$(".register_btn").removeClass("disable");
		}else{
			$(".register_btn").addClass("disable");
		}
	});
	$(".register_btn").click(function(){
		alert();
	});
}
