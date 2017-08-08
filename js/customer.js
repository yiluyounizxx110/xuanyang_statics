$(function(){
	$(".customerlist td.collection").click(function(){
		if($(this).hasClass("collected")){
			$(this).removeClass("collected");
		}else{
			$(this).addClass("collected");
		}
	});
})


/*============分页start=============*/
var pagination = {
	total:0,
	pageSize:10,
	curpage:1,
	showNum:7,
	startPage:1,
	endPage:7,
	callback:null,
	init:function(param){
		if(param == null){
			console.error("初始化参数错误");
			return false;
		}
		if(param.total != undefined && param.total > 0){
			pagination.total = param.total;
		}
		if(param.curpage != undefined && param.curpage > 0){
			pagination.curpage = param.curpage;
		}
		if(param.showNum != undefined && param.showNum > 0){
			pagination.showNum = param.showNum;
		}
		if(param.pageSize != undefined && param.pageSize > 0){
			pagination.pageSize = param.pageSize;
		}
		if(param.callback != undefined){
			pagination.callback = param.callback;
		}
		pagination.updatePaginationBar();
//		pagination.excuteCallback();
		pagination.bindEvent();
	},
	//执行回调函数
	excuteCallback:function(){
		if(pagination.callback != null){
			pagination.callback(pagination.pageSize,pagination.curpage);
		}
	},
	//分页条绑定事件
	bindEvent:function(){
		$("#pagination").on("click",".up",function(){
			//上一页
			if($(this).hasClass("up_nocurrent")){
				return;
			}
			pagination.curpage = pagination.curpage -1;
			pagination.updatePaginationBar();
			pagination.excuteCallback();
		});
		$("#pagination").on("click",".down",function(){
			//下一页
			if($(this).hasClass("down_nocurrent")){
				return;
			}
			pagination.curpage = pagination.curpage + 1;
			pagination.updatePaginationBar();
			pagination.excuteCallback();
		});
		$("#pagination").on("click",".pkg_num",function(){
			//页数点击
			if($(this).hasClass("current")){
				return;
			}
			pagination.curpage = parseInt($(this).text());
			pagination.updatePaginationBar();
			pagination.excuteCallback();
		});
		$("#pagination").on("click",".pkg_page_submit",function(){
			//页数跳转确定
			var numText = $("#iptPageTxt").val();
			if($.isNumeric(numText) && numText>=0 && parseInt(numText) <= pagination.total && parseInt(numText) != pagination.curpage){
				pagination.curpage = parseInt(numText);
				pagination.updatePaginationBar();
				pagination.excuteCallback();
			}
			$("#iptPageTxt").val("");
		});
		$("#pagination").on("keypress","#iptPageTxt",function(e){
			//页数跳转回车
			if(e.keyCode >= 48 && e.keyCode <= 57){
				return;
			}
			if(e.keyCode == 13){
				var numText = $("#iptPageTxt").val();
				if($.isNumeric(numText) && numText>=0 && parseInt(numText) <= pagination.total && parseInt(numText) != pagination.curpage){
					pagination.curpage = parseInt(numText);
					pagination.updatePaginationBar();
					pagination.excuteCallback();
				}
				$("#iptPageTxt").val("");
			}
		});
	},
	/*=======分页条更新====*/
	updatePaginationBar:function(){
		if(pagination.total == 0){
			$("#pagination").hide();
		}else{
			$("#pagination").show();
		}
//		console.log("pagination.total =" + pagination.total);
		var innerHTML = "<select class='pg_size'><option>10</option><option>20</option><option>50</option></select>";
		var totalInfo = "<div class='pg_label'>共<span>" + pagination.total + "</span>条</div><div class='pg_nums'>"
		if(pagination.curpage == 1){
			innerHTML += "<a href='javascript:void(0)' class='pg_pre disable'>上一页</a>";
		}else{
			innerHTML += "<a href='javascript:void(0)' class='pg_pre'>上一页</a>";
		}
		pagination.computePageNum();
		for(var _index = pagination.startPage; _index <= pagination.endPage; _index ++){
			if(_index == pagination.curpage){
				innerHTML += "<a href='javascript:void(0)' class='cur_page pg_num'>" + _index + "</a>";
			}else{
				innerHTML += "<a href='javascript:void(0)' class='pg_num'>" + _index + "</a>";
			}
		}
		if(pagination.curpage == pagination.total){
			innerHTML += "<a href='javascript:void(0)'' class='pg_next disable'>下一页</a>";
		}else{
			innerHTML += "<a href='javascript:void(0)'' class='pg_next'>下一页</a>";
		}
		
		$("#pagination").html(innerHTML);
	},
	//计算分页起始和结束页码
	computePageNum:function(){
//		if(pagination.total == 0){
//			
//		}
		if(pagination.total <= pagination.showNum){
			showNum = 1;
			pagination.endPage = pagination.total;
			return;
		}
		var start,end;
		var left = parseInt((pagination.showNum -1)/2);
		start = pagination.curpage - left;
		if(start <= 0){
			start = 1;
		}
		end = start + pagination.showNum -1;
		if(end > pagination.total){
			end = pagination.total;
		}
		if(end == pagination.total && start > 1 && (end-start +1) < pagination.showNum){
			start = (end - pagination.showNum + 1);
			if(start <= 0){
				start = 1;
			}
		}
		pagination.startPage = start;
		pagination.endPage = end;
	}
}