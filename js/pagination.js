(function (factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(["jquery"], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {

    //配置参数
    var defaults = {
        total: 0, //数据总条数
        totalPage: 1, //总页数,默认为1
        pageSize: 10, //每页显示的条数
        pageList:[10,20,50],
        curpage: 1, //当前第几页
        showNum: 7, //mode为unfixed时显示当前选中页前后页数，mode为fixed显示页码总数
        startPage:1,
        endPage:1,
        showSelect:false,
        callback: function () {} //回调
    };

    var Pagination = function (element, options) {
        //全局变量
        var opts = options, //配置
            curpage, //当前页
            $document = $(document),
            $obj = $(element); //容器

        /**
         * 设置总页数
         * @param {int} page 页码
         * @return opts.totalPage 总页数配置
         */
        this.calTotalPage = function () {
            opts.totalPage = opts.total && opts.pageSize ? Math.ceil(parseInt(opts.total) / opts.pageSize) : opts.totalPage;
        };

        /**
         * 获取总页数
         * 如果配置了总条数和每页显示条数，将会自动计算总页数并略过总页数配置，反之
         * @return {int} 总页数
         */
        this.getTotalPage = function () {
            return opts.total && opts.pageSize ? Math.ceil(parseInt(opts.total) / opts.pageSize) : opts.totalPage;
        };

        /**
         * 获取当前页
         * @return {int} 当前页码
         */
        this.getCurpage = function () {
            return curpage;
        };
        this.getPageSize = function () {
        	return opts.pageSize;
        };

		this.computePageNum = function(){
			if(opts.totalPage <= opts.showNum){
				opts.startPage = 1;
				opts.endPage = opts.totalPage;
				return;
			}
			var start,end;
			var left = parseInt((opts.showNum -1)/2);
			start = curpage - left;
			if(start <= 0){
				start = 1;
			}
			end = start + opts.showNum -1;
			if(end > opts.totalPage){
				end = opts.totalPage;
			}
			if(end == opts.totalPage && start > 1 && (end-start +1) < opts.showNum){
				start = (end - opts.showNum + 1);
				if(start <= 0){
					start = 1;
				}
			}
			opts.startPage = start;
			opts.endPage = end;
		};
        
		
		this.bindSelect = function($obj){
			var that = this;
            
			$obj.find("select").change(function(){
            	var value = $(this).val();
            	opts.pageSize = value;
            	that.calTotalPage();
            	that.filling(1);
            	
            	if (that.getTotalPage() == '0') {
	                $obj.hide();
	            } else {
	                $obj.show();
	            }
            	
                typeof opts.callback === 'function' && opts.callback(that);
            });
		},
		
        //绑定事件
        this.eventBind = function () {
            var that = this;
            
            var index = 1;
            if(opts.showSelect){
            	this.bindSelect($obj);
            }
            
            $obj.off().on('click', '.pg_nums a', function () {
        	    //总页数
            	var totalPage = that.getTotalPage();
            	if($(this).hasClass("pg_pre")){
            		//上一页
            		if($(this).hasClass("disable")){
						return;
					}
            		if ($obj.find('.cur_page').text() <= 1) {
                        $(this).addClass('disable');
                        return false;
                    } else {
                        index = parseInt($obj.find('.cur_page').text()) - 1;
                    }
            	}else if($(this).hasClass("pg_next")){
            		//下一页
            		if($(this).hasClass("disable")){
						return;
					}
            		if ($obj.find('.cur_page').text() >= totalPage) {
                        $(this).addClass('disable');
                        return false;
                    } else {
                        index = parseInt($obj.find('.cur_page').text()) + 1;
                    }
            	}else if($(this).hasClass("pg_first")){
            		//首页
            		index = 1;
            	}else if($(this).hasClass("pg_last")){
            		//最后一页
            		index = totalPage;
            	}else if($(this).hasClass("pg_num")){
            		//页数点击
            		index = parseInt($(this).text());
            	}
                that.filling(index);
                typeof opts.callback === 'function' && opts.callback(that);
            });
        };

		/**
         * 填充数据
         * @param {int} 页码
         */
        this.filling = function (index) {
            var innerHTML = '';
            curpage = parseInt(index) || parseInt(opts.curpage); //当前页码
            var totalPage = this.getTotalPage(); //获取的总页数
            var pageSize = this.getPageSize();
            
            if(opts.showSelect){
            	innerHTML += "<select class='pg_size'>";
           		var pageList = opts.pageList;
	            if(pageList){
	            	for(var idx=0 ; idx < pageList.length ; idx ++){
	            		var selected = "";
	            		if(pageSize == pageList[idx]){
	            			selected = "selected";
	            		}
	            		innerHTML += "<option "+ selected +">"+ pageList[idx] +"</option>";
	            	}
	            }
	            innerHTML += "</select>";
            }
            
            innerHTML += "<div class='pg_label'>共<span>"+ opts.total +"</span>条数据</div><div class='pg_nums'>"
            if(curpage == 1){
				innerHTML += "<a href='javascript:void(0);' class='pg_first'>首页</a><a href='javascript:void(0);' class='pg_pre disable'>上一页</a>";
			}else{
				innerHTML += "<a href='javascript:void(0);' class='pg_first'>首页</a><a href='javascript:void(0);' class='pg_pre'>上一页</a>";
			}
            
            this.computePageNum();
            
            var start = opts.startPage;
            var end = opts.endPage;
            
            for(var _index = opts.startPage; _index <= opts.endPage; _index ++){
				if(_index == curpage){
					innerHTML += "<a href='javascript:void(0);' class='pg_num cur_page'>" + _index + "</a>";
				}else{
					innerHTML += "<a href='javascript:void(0);' class='pg_num'>" + _index + "</a>";
				}
			}
			if(curpage == opts.totalPage){
				innerHTML += "<a href='javascript:void(0);' class='pg_next disable'>下一页</a><a href='javascript:void(0);' class='pg_last'>末页</a>";
			}else{
				innerHTML += "<a href='javascript:void(0);' class='pg_next'>下一页</a><a href='javascript:void(0);' class='pg_last'>末页</a>";
			}
            innerHTML +="</div><div class='clear'></div>";
            
            $obj.empty().html(innerHTML);
            this.bindSelect($obj);
        };

        //初始化
        this.init = function () {
        	this.calTotalPage();
            this.filling(opts.curpage);
            this.eventBind();
            if (this.getTotalPage() == '0') {
                $obj.hide();
            } else {
                $obj.show();
            }
        };
        this.init();
    };

    $.fn.pagination = function (parameter, callback) {
        if (typeof parameter == 'function') { //重载
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function () {};
        }
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {
            var pagination = new Pagination(this, options);
            options.callback(pagination);
        });
    };

}));