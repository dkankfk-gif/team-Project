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


