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

    /* header */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("header .menu-icon .btn-menu a");
  const closeBtn = document.querySelector("header ul.nav .btn-close");
  const overlay = document.querySelector(".menu-overlay");

  const openMenu = () => {
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden"; // ✅ 스크롤 잠금
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    document.body.style.overflow = ""; // ✅ 원복
  };

  menuBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openMenu();
  });

  closeBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  // ✅ 메뉴 안 링크 누르면 자동 닫기(원하면)
  document.querySelectorAll("header ul.nav a").forEach(a => {
    a.addEventListener("click", closeMenu);
  });
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


    /* header */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("header .menu-icon .btn-menu a");
  const closeBtn = document.querySelector("header ul.nav .btn-close");
  const overlay = document.querySelector(".menu-overlay");

  const openMenu = () => {
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden"; // ✅ 스크롤 잠금
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    document.body.style.overflow = ""; // ✅ 원복
  };

  menuBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openMenu();
  });

  closeBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  // ✅ 메뉴 안 링크 누르면 자동 닫기(원하면)
  document.querySelectorAll("header ul.nav a").forEach(a => {
    a.addEventListener("click", closeMenu);
  });
});

gsap.timeline({
  scrollTrigger:{
    trigger:'.TopTitle',
    start:'top top',
    end:'bottom top',
    scrub: 0,
    markers:true
  }
})
.to('header', {color:'#222',ease:'none',duration:5},0)
.to('header .menu-icon img',{filter: 'invert(1)', duration: 0})
.to('header .logo',{filter: 'invert(1)', duration: 0})

//scrolla.js
$(function() {
	$('.animate').scrolla({
		mobile: true, //모바일버전시 활성화
		once: false //스크롤시 딱 한번만 하고싶을땐 true
	});    
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