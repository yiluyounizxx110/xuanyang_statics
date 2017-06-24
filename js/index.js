var send_timer = null;
$(function(){
	bindEvent();
});
function bindEvent(){
	$(".submitbtn").click(function(){
		$(".login_verify_mobile").removeClass("none");
	});
	$(".verify_code_btn").click(function(){
		if(!$(this).hasClass("send")){
			$(this).addClass("send");
			$(this).html('已发送(<span>90</span>s)');
			send_timer = setInterval(desctime,1000);
		}
	});
	$(".login_verify_mobile_next").click(function(){
		window.open("index.html","_self");
	});
}
function desctime(){
	var time = parseInt($(".verify_code_btn.send span").text());
	if(time == 1){
		clearInterval(send_timer);
		$(".verify_code_btn.send").text("获取验证码").removeClass("send");
	}else{
		$(".verify_code_btn.send span").text(time-1);
	}
}
