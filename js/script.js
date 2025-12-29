$(document).on('click', 'a[href="#"]', function(e){
  if ($(this).closest('header ul.nav').length) return; // 메뉴는 예외
  e.preventDefault();
});

$(function() {
	$('.animate').scrolla({
		mobile: true, //모바일버전시 활성화
		once: false //스크롤시 딱 한번만 하고싶을땐 true
	});    
    }); 

    /* header */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn  = document.querySelector("header .menu-icon .btn-menu a");
  const closeBtn = document.querySelector("header ul.nav .btn-close");
  const overlay  = document.querySelector(".menu-overlay");

  const openMenu = () => {
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
  };

  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openMenu();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay)  overlay.addEventListener("click", closeMenu);

  // 메뉴 안 링크 누르면 자동 닫기
  document.querySelectorAll("header ul.nav a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });
}); // ✅ 이게 빠지면 전체가 안 먹힘


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
            slidesPerViefoow: "auto",  //브라우저가 1024보다 클 때
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


//ingredients
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
//쇼츠때 다시 흰색으로 변경
gsap.timeline({
    scrollTrigger:{
        trigger:'.short',
        start:'0% 100%',
        end:'0% 10%',
        scrub:0,
        //markers:true
    }
})
.to('header', {color:'#fff',ease:'none',duration:5},0)
.to('header .menu-icon img',{filter: 'invert(0)', duration: 0})
.to('header .logo',{filter: 'invert(0)', duration: 0})


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
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1) 카드 스크롤(각 li)
  gsap.utils.toArray(".materials .list li").forEach((li) => {
    gsap.to(li, {
      rotationX: -10,
      scale: 0.9,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: li,
        start: "top 60%",
        end: "top 0%",
        scrub: 1,
        // markers: true
      }
    });
  });

  


  // 2) sticky 텍스트 (내리면 등장 / 올리면 사라짐)
  const items = gsap.utils.toArray(
    ".materials .fix h2.title, .materials .fix p.en, .materials .fix p.txt"
  );
// 텍스트 애니메이션
  gsap.set(items, { y: 60, opacity: 0 });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".materials",
      start: "2% 70%",
      end: "50% 30%",
      toggleActions: "play none none reverse",
    }
  }).to(items, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12
  });

  // 3) connect 섹션 구간 동안 wrap에 on 클래스 유지
  ScrollTrigger.create({
    trigger: ".connect",
    start: "top top",
    end: "bottom top", // ✅ 핵심: 섹션 끝까지 유지
    toggleClass: { targets: ".wrap", className: "on" },
    // markers: true
  });

  // 비디오/이미지 로드로 레이아웃 변동 있을 때 대비
  ScrollTrigger.refresh();
});



//vegan

  gsap.to(".vegan .Texture.green .img img", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: ".vegan .Texture.green",
      start: "top 70%",
      end: "bottom 50%",
      scrub: 1,
      //markers: true
    }
  });

  gsap.to(".vegan .Texture.Cream .img img", {
    yPercent: -8,
    ease: "none",
    scrollTrigger: {
      trigger: ".vegan .Texture.Cream",
      start: "top 80%",
      end: "bottom 10%",
      scrub: 1,
      //markers: true
    }
  });
  


gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({

  // PC
  "(min-width: 1025px)": function () {
    const lines = gsap.utils.toArray(".vegan .title-box .title, .vegan .title-box .en_s, .vegan .title-box .sub");

    gsap.set(lines, { y: 120, opacity: 0 });

    gsap.to(lines, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.18,
      scrollTrigger: {
        trigger: ".vegan .title-box",
        start: "top 75%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
        // markers: true
      }
    });
  },

  // Tablet
  "(min-width: 769px) and (max-width: 1024px)": function () {
    const lines = gsap.utils.toArray(".vegan .title-box .title, .vegan .title-box .en_s, .vegan .title-box .sub");

    gsap.set(lines, { y: 70, opacity: 0 });

    gsap.to(lines, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: "power3.out",
      stagger: 0.14,
      scrollTrigger: {
        trigger: ".vegan .title-box",
        start: "top 80%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      }
    });
  },

  // Mobile
  "(max-width: 768px)": function () {
    const lines = gsap.utils.toArray(".vegan .title-box .title, .vegan .title-box .en_s, .vegan .title-box .sub");

    gsap.set(lines, { y: 40, opacity: 0 });

    gsap.to(lines, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.10,
      scrollTrigger: {
        trigger: ".vegan .title-box",
        start: "top 85%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      }
    });
  }
});

// 레이아웃 변동(폰트/이미지/비디오) 있을 때 계산 다시
window.addEventListener("resize", () => ScrollTrigger.refresh());







  
//connect
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({

  // ✅ PC (1025px~)
  "(min-width: 1025px)": function () {
    connectMotion({
      a: { from:{x:-220,y:-80},  to:{scrub:1,   start:"top 0%",   end:"top 80%"} },
      b: { from:{x:-260,y:140},  to:{scrub:1.2, start:"top 80%",  end:"50% 45%"} },
      c: { from:{x:260,y:140},   to:{scrub:1.4, start:"30% 60%",  end:"55% 40%"} },
      d: { from:{x:220,y:220},   to:{scrub:1.6, start:"40% 70%",  end:"55% 50%"} },
      t1:{ from:{y:50},          to:{scrub:1.2, start:"60% 70%",  end:"70% 50%"} },
      t2:{ from:{y:70},          to:{scrub:1.3, start:"60% 70%",  end:"70% 50%"} }
    });
  },

  // ✅ Tablet (769px~1024px)
  "(min-width: 769px) and (max-width: 1024px)": function () {
    connectMotion({
      a: { from:{x:-140,y:-60},  to:{scrub:0.9, start:"top 10%",  end:"top 75%"} },
      b: { from:{x:-170,y:110},  to:{scrub:1.0, start:"top 85%",  end:"55% 55%"} },
      c: { from:{x:170,y:110},   to:{scrub:1.1, start:"35% 70%",  end:"60% 55%"} },
      d: { from:{x:140,y:160},   to:{scrub:1.2, start:"45% 75%",  end:"65% 60%"} },
      t1:{ from:{y:40},          to:{scrub:1.0, start:"65% 75%",  end:"78% 55%"} },
      t2:{ from:{y:55},          to:{scrub:1.1, start:"65% 75%",  end:"78% 55%"} }
    });
  },

  // ✅ Mobile (461px~768px)  ※ 너 CSS에서 deco 숨김이면 애니메이션도 안 돌게 처리
  "(min-width: 461px) and (max-width: 768px)": function () {
    // deco가 display:none이면 트리거만 낭비라서 텍스트만 실행 추천
    connectMotion({
      a: { disabled:true },
      b: { disabled:true },
      c: { disabled:true },
      d: { disabled:true },
      t1:{ from:{y:30}, to:{scrub:0.9, start:"20% 45%", end:"50% 30%"} },
      t2:{ from:{y:40}, to:{scrub:1.0, start:"20% 45%", end:"50% 30%"} }
    });
  },

  // ✅ Small (<=460px)
  "(max-width: 460px)": function () {
    connectMotion({
      a: { disabled:true },
      b: { disabled:true },
      c: { disabled:true },
      d: { disabled:true },
      t1:{ from:{y:24}, to:{scrub:0.8, start:"20% 45%", end:"50% 30%"} },
      t2:{ from:{y:32}, to:{scrub:0.9, start:"20% 45%", end:"50% 30%"} }
    });
  }

});


// -------------------------
// 공통 함수 (한 번만 작성)
// -------------------------
function connectMotion(cfg){
  // A~D
  makeFromTo(".connect p.deco.a", cfg.a);
  makeFromTo(".connect p.deco.b", cfg.b);
  makeFromTo(".connect p.deco.c", cfg.c);
  makeFromTo(".connect p.deco.d", cfg.d);

  // Text
  makeFromTo(".connect .text p.sub:nth-child(1)", cfg.t1, { x:0, y:0 });
  makeFromTo(".connect .text p.sub:nth-child(2)", cfg.t2, { x:0, y:0 });
}

function makeFromTo(target, opt, defaultFrom = null){
  if(!opt || opt.disabled) return;

  const fromVars = {
    opacity: 0,
    ...(defaultFrom || {}),
    ...(opt.from || {})
  };

  const toVars = {
    x: 0,
    y: 0,
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".connect",
      start: opt.to?.start || "top 80%",
      end: opt.to?.end || "bottom 20%",
      scrub: opt.to?.scrub ?? 1,
      invalidateOnRefresh: true,
      //markers: true
    }
  };

  gsap.fromTo(target, fromVars, toVars);
}



// shorts
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({

  // ===== 1920+ =====
  "(min-width: 1441px)": function () {
    shortSequence({
      titleY: 120,
      titleStagger: 0.12,
      titleDuration: 0.9,

      cardBigY: 100,
      cardSmallY: 80,

      start: "50% 80%",
      end: "top 45%"
    });
  },

  // ===== 1024 ~ 1440 =====
  "(min-width: 1024px) and (max-width: 1440px)": function () {
    shortSequence({
      titleY: 100,
      titleStagger: 0.11,
      titleDuration: 0.85,

      cardBigY: 90,
      cardSmallY: 70,

      start: "60% 80%",
      end: "70% 50%"
    });
  },

  // ===== 768 ~ 1023 =====
  "(min-width: 768px) and (max-width: 1023px)": function () {
    shortSequence({
      titleY: 70,
      titleStagger: 0.09,
      titleDuration: 0.75,

      cardBigY: 70,
      cardSmallY: 60,

      start: "20% 50%",
      end: "40% 60%"
    });
  },

  // ===== ≤ 767 =====
  "(max-width: 767px)": function () {
    shortSequence({
      titleY: 52,
      titleStagger: 0.08,
      titleDuration: 0.7,

      cardBigY: 60,
      cardSmallY: 50,

      start: "0% 20%",
      end: "40% 40%",
    });
  }

});


// =========================
// SHORT 통합 시퀀스 함수
// =========================
function shortSequence(opt) {
  const section = ".short";
  const titleWrap = ".short .shorts-right .title-box";
  const titleLines = gsap.utils.toArray(
    `${titleWrap} .title, ${titleWrap} .sub`
  );

  const cards = [
    ".short .card-big",
    ".short .card-small .left",
    ".short .card-small .right"
  ];

  // 🔥 깜빡임 방지: 초기 상태 고정
  gsap.set(titleLines, { y: opt.titleY, opacity: 0 });
  gsap.set(cards, { y: opt.cardSmallY, opacity: 0 });

  // 큰 카드만 살짝 더 크게
  gsap.set(".short .card-big", { y: opt.cardBigY });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: opt.start,
      end: opt.end,
      toggleActions: "play none none reverse",
      invalidateOnRefresh: true,
      //markers: true
    }
  });

  // 1️⃣ 타이틀
  tl.to(titleLines, {
    y: 0,
    opacity: 1,
    duration: opt.titleDuration,
    ease: "power3.out",
    stagger: opt.titleStagger
  })

  // 2️⃣ 큰 카드
  .to(".short .card-big", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.3")

  // 3️⃣ 작은 카드 LEFT
  .to(".short .card-small .left", {
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: "power3.out"
  }, "-=0.4")

  // 4️⃣ 작은 카드 RIGHT
  .to(".short .card-small .right", {
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: "power3.out"
  }, "-=0.35");
}


/* footer */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("footer .floating");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

//  https://webs.tistory.com/191
    