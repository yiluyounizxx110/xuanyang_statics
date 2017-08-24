$(function(){
	$(".shop_type_select").change(function(){
		if($(this).val() == 1 || $(this).val() == 2){
			$(".shop_grade_select").removeClass("none");
		}else{
			$(".shop_grade_select").addClass("none");
		}
	})
	var data1 = [
		{name:"java",id:1},
		{name:"c",id:2},
		{name:"c++",id:3},
		{name:"jedis",id:4},
		{name:"test",id:5}
	];
	$(".shop_industry_select").autocomplete(data1,{
		matchContains: true,
		minChars: 0,
		formatItem: function(data, i, total) {  
            return data.name; 
        },  
        formatMatch: function(data, i, total) {  
            return data.name;  
        },  
        formatResult: function(data) {  
            return data.name;  
        }
	}).result(function(event, item) {
	    $("#suggest14").attr("data",item.id);
	});
	/*$(".shop_industry_select").autocomplete(emails, {
		minChars: 0,
		width: 310,
		matchContains: "word",
		autoFill: false,
		formatItem: function(row, i, max) {
			return i + "/" + max + ": \"" + row.name + "\" [" + row.to + "]";
		},
		formatMatch: function(row, i, max) {
			return row.name + " " + row.to;
		},
		formatResult: function(row) {
			return row.to;
		}
	});*/
//	$(".shop_industry_select").autocomplete(data,{
      /*minLength: 0,
      source: data,
      focus: function( event, ui ) {
        $( ".shop_industry_select" ).attr("data",ui.item.value);
        return false;
      },
      select: function( event, ui ) {
      	$( ".shop_industry_select" ).attr("data",ui.item.label );
      	$( ".shop_industry_select" ).attr("label",ui.item.value );
        return false;
      }*/
//      minChars: 0,  
//      max: 5,  
//      autoFill: true,  
//      mustMatch: true,  
//      matchContains: true,  
//      scrollHeight: 220,  
//      formatItem: function (data, i, total) {  
//          return "<I>" + data[0] + "</I>";  
//      }, formatMatch: function (data, i, total) {  
//          return data[0];  
//      }, formatResult: function (data) {  
//          return data[0];  
//      }      
//  })
});
