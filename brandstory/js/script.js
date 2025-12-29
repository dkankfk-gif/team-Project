    $(document).on('click', 'a[href="#"]', function(e){
    e.preventDefault();
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
