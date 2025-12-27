$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});


// svg 길이구하기
// $(function(){
//     $('.svgAni').find("#svgAni02").each(function(i,path){
//         var lenght=path.getTotalLength();
//         //alert(lenght)
//     })
// })



// svg 길이구하기
$(function(){
    $('.svgAni2').find("#svgAni02").each(function(i,path){
        var lenght=path.getTotalLength();
        //alert(lenght)
    })
})


//scrolla.js
$(function() {
	$('.animate').scrolla({
		mobile: true, //모바일버전시 활성화
		once: false //스크롤시 딱 한번만 하고싶을땐 true
	});    
      }); 

