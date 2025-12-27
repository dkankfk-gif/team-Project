$(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
});




new Swiper('.best-product', {
    loop: true,
    slidesPerView: "auto",    
    spaceBetween: 32,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    speed: 600,
    watchSlidesProgress: true,

    autoplay: {//자동슬라이드 (false-비활성화)  
    delay: 3800, // 시간 설정
    disableOnInteraction: false,
    }, // false-스와이프 후 자동 재생 
    breakpoints:{
        1440:{
            slidesPerView: "auto",  //브라우저가 1024보다 클 때
            spaceBetween: 20,
        },
        1024:{
            slidesPerView: "auto",  //브라우저가 1024보다 클 때
            spaceBetween: 18,
        },
        768:{
            slidesPerView: "auto",  //브라우저가 768보다 클 때
            spaceBetween: 16,
        },
        620:{
            slidesPerView: "auto",  //브라우저가 768보다 클 때
            spaceBetween: 16,
        }
    },
    
});

new Swiper('.best-product-right', {
    loop: true,
    slidesPerView: "auto",    
    spaceBetween: 32,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    centeredSlides: false,
    autoplay: {//자동슬라이드 (false-비활성화)  
    delay: 3800, // 시간 설정
    disableOnInteraction: false,
    }, // false-스와이프 후 자동 재생 
    breakpoints:{
        1440:{
            slidesPerView: "auto",  //브라우저가 1024보다 클 때
            spaceBetween: 20,
        },
        1024:{
            slidesPerView: "auto",  //브라우저가 1024보다 클 때
            spaceBetween: 18,
        },
        768:{
            slidesPerView: "auto",  //브라우저가 768보다 클 때
            spaceBetween: 16,
        },
        620:{
            slidesPerView: "auto",  //브라우저가 768보다 클 때
            spaceBetween: 16,
        }
    }

});


// svg 길이구하기
$(function(){
    $('.svgAni').find("#svgAni01").each(function(i,path){
        var lenght=path.getTotalLength();
        /* alert(lenght) */
    })
})


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



gsap.timeline({
    scrollTrigger:{
        trigger:'.ingredients',
        start:'0% 100%',
        end:'0% 10%',
        scrub:0,
        //markers:true
    }
})
.to('header', {color:'#222',ease:'none',duration:5},0)
.to('header .menu-icon img',{filter: 'invert(1)', duration: 0})
.to('header .logo',{filter: 'invert(1)', duration: 0})


gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({

  //  PC / 태블릿 가로 (1024px 이상)
  "(min-width: 1024px)": function () {

    gsap.to(".ingredients .visaul-img", {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: ".ingredients",
        start: "20% bottom",
        end: "bottom top",
        scrub: 0.3,
      }
    });

    gsap.to(".ingredients .sub-img.a", {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: ".ingredients",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    gsap.to(".ingredients .sub-img.b", {
      y: 35,
      ease: "none",
      scrollTrigger: {
        trigger: ".ingredients",
        start: "50% bottom",
        end: "80% top",
        scrub: 1.2,
      }
    });

  },

  //  모바일 / 태블릿 세로 (1023px 이하)
  "(max-width: 1023px)": function () {

    gsap.to(".ingredients .visaul-img", {
      y: 60,            
      ease: "none",
      scrollTrigger: {
        trigger: ".ingredients",
        start: "20% bottom",
        end: "bottom top",
        scrub: 0.4,
      }
    });

    gsap.to(".ingredients .sub-img.a", {
      y: 60,           
      ease: "none",
      scrollTrigger: {
        trigger: ".ingredients",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      }
    });

    gsap.to(".ingredients .sub-img.b", {
      y: 35,
      ease: "none",
      scrollTrigger: {
        trigger: ".ingredients",
        start: "50% bottom",
        end: "80% top",
        scrub: 1,
      }
    });

    
  }
});


/* footer */
document.querySelectorAll('footer .top-box .left-box ul').forEach(ul => {
    const tit = ul.querySelector('li.tit');
    if (!tit) return;

    tit.addEventListener('click', () => {
    // 다른 섹션 닫기
    document.querySelectorAll('footer .top-box .left-box ul.open')
        .forEach(other => { if (other !== ul) other.classList.remove('open'); });

    // 현재 토글
    ul.classList.toggle('open');
    });
});






/* 카드 스크롤라 */
window.onload = function() { 

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".materials .list li").forEach((selector) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: selector,
            start: '0% 60%', 
            end: '0% 0%', 
            scrub: 1,
           // markers: true,
        }
    })
    .to(selector,{transform: 'rotateX(-10deg) scale(0.9)', transformOrigin:"top"},0)   
});       
        


gsap.timeline({
    scrollTrigger: {
        trigger: '.connect',
        start: 'top top',  
        end: '0% 0%',
        toggleClass: {targets: '.wrap', className: "on"},
       // markers: true
    } 
})
    
    
}

$(function() {
	$('.animate').scrolla({
		mobile: true, //모바일버전시 활성화
		once: false //스크롤시 딱 한번만 하고싶을땐 true
	});    
    }); 


  // green 블록 자체를 잠깐 고정(pin)
  ScrollTrigger.create({
    trigger: ".vegan .Texture.green",
    start: "top 15%",
    end: "+=200",     // 고정되는 스크롤 길이 (조절)
    pin: true,
    pinSpacing: true
  });

  gsap.to(".vegan .Texture.green .img img", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: ".vegan .Texture.green",
      start: "top 70%",
      end: "bottom 20%",
      scrub: 1
    }
  });



    ScrollTrigger.create({
    trigger: ".vegan .Texture.Cream",
    start: "top 15%",
    end: "+=200",     // 고정되는 스크롤 길이 (조절)
    pin: true,
    pinSpacing: true
  });

  gsap.to(".vegan .Texture.Cream .img img", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: ".vegan .Texture.Cream",
      start: "top 70%",
      end: "bottom 20%",
      scrub: 1
    }
  });

/* gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
  // ✅ 데스크탑만 PIN
  ScrollTrigger.create({
    trigger: ".vegan .Texture.green",
    start: "top 15%",
    end: "+=200",
    pin: true,
    pinSpacing: true,
    anticipatePin: 1
  });

  gsap.to(".vegan .Texture.green .img img", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: ".vegan .Texture.green",
      start: "top 70%",
      end: "bottom 20%",
      scrub: 1
    }
  });

  ScrollTrigger.create({
    trigger: ".vegan .Texture.Cream",
    start: "top 15%",
    end: "+=200",
    pin: true,
    pinSpacing: true,
    anticipatePin: 1
  });

  gsap.to(".vegan .Texture.Cream .img img", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: ".vegan .Texture.Cream",
      start: "top 70%",
      end: "bottom 20%",
      scrub: 1
    }
  });
});

mm.add("(max-width: 768px)", () => {
  // ✅ 모바일: 핀 제거(겹침 방지)
  // 필요하면 이미지 y이동만 남기거나, 아예 다 끄기
  gsap.to(".vegan .Texture.green .img img", {
    yPercent: 6,
    ease: "none",
    scrollTrigger: {
      trigger: ".vegan .Texture.green",
      start: "top 90%",
      end: "bottom 10%",
      scrub: 1
    }
  });

  gsap.to(".vegan .Texture.Cream .img img", {
    yPercent: 6,
    ease: "none",
    scrollTrigger: {
      trigger: ".vegan .Texture.Cream",
      start: "top 90%",
      end: "bottom 10%",
      scrub: 1
    }
  });
}); */



  // cream 이미지: 반대로 위로 살짝 (깊이감)
/*     gsap.to(".vegan .Texture.Cream", {
    y: 200,
    ease: "none",
    scrollTrigger: {
    trigger: ".vegan",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.4
    }
});
 */
//  https://webs.tistory.com/191
    