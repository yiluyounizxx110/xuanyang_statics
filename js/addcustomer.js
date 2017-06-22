$(function(){
	$(".shop_type_select").change(function(){
		if($(this).val() == 1 || $(this).val() == 2){
			$(".shop_grade_select").removeClass("none");
		}else{
			$(".shop_grade_select").addClass("none");
		}
	})
});
