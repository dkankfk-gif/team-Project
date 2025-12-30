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

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".product .rightbox").forEach((box) => {
    gsap.fromTo(
      box,
      { autoAlpha: 0, x: 100 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: box.closest(".product .inner") || box,
          start: "top 80%",
          toggleActions: "play none none none" 
        }
      }
    );
  });
});




document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();
  const target = ".product .visual .img img";

  // ✅ 1910px 이상에서만 product 이미지 GSAP 실행
  mm.add("(min-width: 1911px)", () => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".product",
        start: "top top",
        end: "+=1400",
        scrub: 3,
        pin: true
      }
    });

    tl.fromTo(
      target,
      { scale: 1, yPercent: 0 },
      { scale: 1.12, yPercent: 0, ease: "none", duration: 0.45 }
    );

    tl.to(target, {
      scale: 0.9,
      yPercent: 28,
      ease: "power2.out",
      duration: 0.35
    });

    tl.to(target, {
      yPercent: 55,
      ease: "none",
      duration: 0.4
    });

    // ⬅️ breakpoint 벗어나면 이 타임라인만 제거
    return () => {
      tl.kill();
      ScrollTrigger.refresh();
    };
  });

  // ✅ 1910px 이하: product 이미지만 GSAP 효과 제거
  mm.add("(max-width: 1910px)", () => {
    gsap.set(target, {
      clearProps: "transform"
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.set(".TopTitle .left .img img", { opacity: 1 });

  gsap.fromTo(
    ".TopTitle .left .img img",
    { yPercent: 50 },
    {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".TopTitle",
        start: "top 90%",
        end: "top 40%",   // 이 구간 동안 계속 움직임
        scrub: 1,         // ⭐ 스크롤에 따라 계속 반응 (고정 X)
        // markers: true
      }
    }
  );
});


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 항상 보이게
  gsap.set(".Hydration .img", { opacity: 1 });

  gsap.fromTo(
    ".Hydration .img",
    { yPercent: 60 },          // 아래에서 시작
    {
      yPercent: 0,             // 제자리까지 올라옴
      ease: "none",
      scrollTrigger: {
        trigger: ".Hydration",
        start: "top 90%",
        end: "top 40%",        // 이 구간 동안 계속 움직임
        scrub: 1,              // ⭐ 스크롤에 붙어서 반응 (고정 안 됨)
        // markers: true
      }
    }
  );
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".product .leftbox .tit",
    { yPercent: 40, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".product",
        start: "top 80%",
        toggleActions: "play reverse play reverse", // 반복(들어오면 등장, 나가면 다시 숨김)
        // markers: true
      }
    }
  );
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".all_About .topBox p",
    { yPercent: 40, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".all_About",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
        // markers: true
      }
    }
  );
});


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const triggerEl = ".TopTitle";

  gsap.fromTo(
    ".TopTitle .right_txt .en_s .en",
    { yPercent: 60, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    }
  );

  gsap.fromTo(
    ".TopTitle .right_txt .en_s",
    { yPercent: 30, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const triggerEl = ".Hydration";

  gsap.fromTo(
    ".Hydration .textBox .en span",
    { yPercent: 50, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 60%",
        toggleActions: "play reverse play reverse"
      }
    }
  );

  gsap.fromTo(
    ".Hydration .textBox .en",
    { yPercent: 40, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.35,
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 60%",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});
  

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const triggerEl = ".Recommended";

  // 1) p.col 먼저
  gsap.fromTo(
    ".Recommended .inner .top_tit p.col",
    { yPercent: 40, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
        // markers: true
      }
    }
  );

  // 2) p.center 나중 (살짝 딜레이)
  gsap.fromTo(
    ".Recommended .inner .top_tit p.center",
    { yPercent: 40, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.35, // ⭐ 여기 숫자 키우면 더 늦게 옴 (0.25~0.6 추천)
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});



document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const el = document.querySelector(".Hydration .drop");
  console.log("drop exists?", !!el);

  gsap.fromTo(
    ".Hydration .drop",
    { y: 50 },
    {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".Hydration",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        //markers: true
      }
    }
  );

  ScrollTrigger.refresh();
});


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".Search .inner .txtB .Tit",
    { yPercent: 40, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".Search",
        start: "50% 80%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        //markers: true
      }
    }
  );
});


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const triggerEl = ".Hydration";

  // 1️⃣ 왼쪽 박스
  gsap.fromTo(
    ".Hydration .iner_tit .left_txt",
    { yPercent: 60, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 20%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
        //markers: true
      }
    }
  );

  // 2️⃣ 오른쪽 박스 (조금 늦게)
  gsap.fromTo(
    ".Hydration .iner_tit .right_txt",
    { yPercent: 50, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.25,
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 35%",
        end: "bottom top",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({
    scrollTrigger:{
      trigger:'.TopTitle',
      start:'top top',
      end:'top top',
      scrub: 0,
      //markers:true
    }
  })
  .to('header', {color:'#222',ease:'none',duration:5},0)
  .to('header .menu-icon img',{filter: 'invert(1)', duration: 0})
  .to('header .logo',{filter: 'invert(1)', duration: 0});
});



document.addEventListener("DOMContentLoaded", () => {
  const faqList = document.querySelector(".faq");
  if (!faqList) return;

  function closeItem(item) {
    item.classList.remove("is-open");
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (btn) btn.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;
  }

  function openItem(item) {
    item.classList.add("is-open");
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (btn) btn.setAttribute("aria-expanded", "true");
    if (panel) panel.hidden = false;
  }

  // ✅ 초기 상태 정리: is-open인 항목만 열고 나머지는 닫기
  faqList.querySelectorAll(".faq-item").forEach(item => {
    const panel = item.querySelector(".faq-a");
    const btn = item.querySelector(".faq-q");
    const isOpen = item.classList.contains("is-open");

    if (btn) btn.setAttribute("aria-expanded", String(isOpen));
    if (panel) panel.hidden = !isOpen;
  });

  // ✅ 이벤트 위임: 버튼/안쪽 span/img 눌러도 동작
  faqList.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-q");
    if (!btn) return;

    const item = btn.closest(".faq-item");
    if (!item) return;

    const isAlreadyOpen = item.classList.contains("is-open");

    // 다른 항목은 모두 닫기 (아코디언)
    faqList.querySelectorAll(".faq-item.is-open").forEach(opened => {
      if (opened !== item) closeItem(opened);
    });

    // 현재 항목 토글
    if (isAlreadyOpen) closeItem(item);
    else openItem(item);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".product-section");

  function show(targetClass){
    sections.forEach(sec => {
      sec.classList.toggle("is-active", sec.classList.contains(targetClass));
    });

    // 모든 bar active 동기화
    document.querySelectorAll(".bar a").forEach(a => a.classList.remove("is-active"));
    document.querySelectorAll(`.bar a[data-target="${targetClass}"]`).forEach(a => a.classList.add("is-active"));
  }

  // 처음엔 About 보이기
  show("all_About");

  // 이벤트 위임 (모든 섹션의 bar 클릭 처리)
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".bar a[data-target]");
    if (!a) return;
    e.preventDefault(); // href="#" 점프 방지
    show(a.dataset.target);
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



//gnb컬러변경
gsap.timeline({
    scrollTrigger:{
        trigger:'.TopTitle',
        start:'0% 100%',
        end:'0% 10%',
        scrub:0,
        //markers:true
    }
})
.to('header', {color:'#222',ease:'none',duration:5},0)
.to('header .menu-icon img',{filter: 'invert(1)', duration: 0})
.to('header .logo',{filter: 'invert(1)', duration: 0})

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