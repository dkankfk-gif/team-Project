$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});

new Swiper('.shop-swiper', {
    loop: false,
    slidesPerView: "auto",    
    spaceBetween: 24,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    centeredSlides: false,
    watchOverflow: true,
    autoHeight : true,
});


//스크롤에 따라 gnb가 나타나고 사라지는
var prevScrollTop = 0;
document.addEventListener('scroll', function(){
    var nowScrollTop = $(window).scrollTop();   //먼저 현재값을 저장시킨다
    if(nowScrollTop > prevScrollTop ){
        $('header').addClass('active');
    } else{             //아닐경우
        $('header').removeClass('active');
    }
    prevScrollTop = nowScrollTop;  //항상 스크롤값을 전달해야한다
})
gsap.set('header', { color:'#222' });
gsap.set('header .menu-icon img', { filter:'invert(1)' });
gsap.set('header .logo', { filter:'invert(1)' });