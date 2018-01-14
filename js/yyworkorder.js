$(function(){
	$("body").on("click",".yyw_content.ct .ct_item",function(){
		var is_checked = $(this).hasClass("checked");
		if(is_checked){
			$(this).removeClass("checked");
		}else{
			$(this).addClass("checked");
		}
	});
	var ue = UE.getEditor('container', {
	    toolbars: [
	        [	
	            'source', //源代码
	            'formatmatch', //格式刷
		        'removeformat', //清除格式
	            'undo', //撤销
		        'redo', //重做
		        'bold', //加粗
		        'italic', //斜体
		        'underline', //下划线
		        'strikethrough', //删除线
		        'fontfamily', //字体
		        'fontsize', //字号
		        'forecolor', //字体颜色
		        'backcolor', //背景色
		        'time', //时间
		        'date', //日期
		        'justifyleft', //居左对齐
		        'justifyright', //居右对齐
		        'justifycenter', //居中对齐
		        'justifyjustify', //两端对齐
		        'insertorderedlist', //有序列表
		        'insertunorderedlist', //无序列表
		        'fullscreen', //全屏
		        'lineheight', //行间距
		        'inserttable', //插入表格
		    ]
	    ],
	    initialFrameHeight:200,
	    autoHeightEnabled: true,
	    autoFloatEnabled: false
	});
});
