(() => {
  // ---------- 공통: 인라인 header color 제거(최우선) ----------
  const header = document.querySelector("header");
  const stripInlineHeaderColor = () => {
    if (!header) return;
    header.style.removeProperty("color"); //  element.style { color: ... } 제거
  };

  // DOMContentLoaded + load + resize 때마다 정리
  document.addEventListener("DOMContentLoaded", stripInlineHeaderColor);
  window.addEventListener("load", stripInlineHeaderColor);
  window.addEventListener("resize", stripInlineHeaderColor);

  // ---------- 모바일 메뉴 ----------
  const openBtn = document.querySelector("header .btn-menu a");
  const closeBtn = document.querySelector("header .btn-close");
  const overlay = document.querySelector(".menu-overlay");

  const openMenu = () => document.body.classList.add("menu-open");
  const closeMenu = () => document.body.classList.remove("menu-open");

  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openMenu();
      stripInlineHeaderColor();
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);

  // ---------- HERO 라인 드로잉 (네 기존 코드 유지형, 안전하게 감싸기) ----------
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.gsap) return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const hero = document.querySelector(".hero");
    const path = hero?.querySelector(".hero-line-path");
    const tracer = hero?.querySelector(".hero-line-tracer");
    if (!hero || !path) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const len = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: len,
      strokeDashoffset: len,
      opacity: 0,
      filter: "url(#heroGlow)"
    });
    if (tracer) gsap.set(tracer, { opacity: 0 });

    if (reduceMotion) {
      gsap.set(path, { strokeDashoffset: 0, opacity: 1, filter: "none" });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top 70%",
        toggleActions: "play none none reset"
      },
      defaults: { ease: "none" }
    });

    tl.to(path, { opacity: 1, duration: 0.15 }, 0);
    tl.to(path, { strokeDashoffset: 0, duration: 1.2 }, 0);
    tl.to(path, { filter: "url(#heroGlow)", duration: 0.01 }, 0);
    tl.to(path, { filter: "none", duration: 0.25, ease: "power1.out" }, 0.95);

    if (tracer) {
      tl.to(tracer, { opacity: 1, duration: 0.1, ease: "power1.out" }, 0.03);
      tl.to(tracer, {
        duration: 1.2,
        ease: "none",
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false }
      }, 0);
      tl.to(tracer, { opacity: 0, duration: 0.15, ease: "power1.out" }, 1.05);
    }
  });

  // ---------- 아코디언(통합): TYPE + RANGE + INGREDIENTS ----------
  document.addEventListener("DOMContentLoaded", () => {
    if (!window.gsap) return;

    const items = [];

    // TYPE (filter-group)
    const typeGroup = document.querySelector(".filter .filter-group");
    if (typeGroup) {
      const trig = typeGroup.querySelector(".acc-trigger, .name-box > a");
      const panel = typeGroup.querySelector(".acc-panel, ul.list");
      if (trig && panel) items.push({ item: typeGroup, trigger: trig, panel });
    }

    // Category items
    document.querySelectorAll(".filter .Category .acc-item").forEach((li) => {
      const trig = li.querySelector(".acc-trigger");
      const panel = li.querySelector(".acc-panel");
      if (trig && panel) items.push({ item: li, trigger: trig, panel });
    });

    if (!items.length) return;

    // 초기: 전부 접기 (390px 이하에서는 적용 안함)
    const isMobile390 = window.matchMedia("(max-width: 390px)").matches;
    items.forEach(({ panel }) => {
      if (!isMobile390) {
        gsap.set(panel, { height: 0, overflow: "hidden" });
        panel.style.paddingBottom = "0px";
      }
    });

    const closeOne = ({ item, panel }) => {
      item.classList.remove("is-open");
      gsap.killTweensOf(panel);
      gsap.to(panel, {
        height: 0,
        duration: 0.28,
        ease: "power2.inOut",
        onComplete: () => (panel.style.paddingBottom = "0px")
      });
    };

    const openOne = ({ item, panel }) => {
      item.classList.add("is-open");
      gsap.killTweensOf(panel);
      panel.style.paddingBottom = "16px";
      gsap.to(panel, { height: "auto", duration: 0.35, ease: "power2.out" });
    };

    // 클릭 바인딩
    items.forEach((cur) => {
      cur.trigger.addEventListener("click", (e) => {
        e.preventDefault();

        // 같은 그룹 내에서 하나만 열리게: TYPE/Category 전체 중 하나만 열리게
        const isOpen = cur.item.classList.contains("is-open");
        items.forEach((x) => {
          if (x !== cur) closeOne(x);
        });

        if (isOpen) closeOne(cur);
        else openOne(cur);
      });
    });
  });

  // ---------- 가로 스크롤 product pin (네 기존 구조 유지, 안전 리프레시) ----------
  window.addEventListener("load", () => {
    if (!window.gsap) return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".product-list").forEach((wrap, idx) => {
      const swiper = wrap.querySelector(".shop-swiper");
      const track = wrap.querySelector(".shop-swiper .swiper-wrapper");
      const slides = gsap.utils.toArray(wrap.querySelectorAll(".shop-swiper .swiper-slide"));
      if (!swiper || !track || !slides.length) return;

      gsap.set(track, { x: 0, willChange: "transform" });
      gsap.set(slides, { rotate: 0, x: 0, transformOrigin: "50% 50%", willChange: "transform" });

      const getDistance = () => Math.max(0, track.scrollWidth - swiper.clientWidth);

      // 같은 id 트리거 있으면 제거
      ScrollTrigger.getAll().forEach(st => {
        if (st?.vars?.id === ("hScroll-" + idx)) st.kill();
      });

      gsap.timeline({
        scrollTrigger: {
          id: "hScroll-" + idx,
          trigger: wrap,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      }).to(track, { x: () => -getDistance(), ease: "none" });
    });

    window.addEventListener("resize", () => ScrollTrigger.refresh());
    ScrollTrigger.refresh();
  });

})();


document.addEventListener("DOMContentLoaded", () => {
  const mq = window.matchMedia("(max-width:768px)");
  const titleLink = document.querySelector(".filter .title a");
  const category = document.querySelector(".filter .Category");

  if (!titleLink || !category) return;

  function setup() {
    // 768 아닐 때 원복
    if (!mq.matches) {
      category.classList.remove("is-open");
      titleLink.parentElement?.classList.remove("is-open");
      // 추가한 화살표 제거
      titleLink.querySelectorAll(":scope > .img.is-mobile").forEach(el => el.remove());
      return;
    }

    // ▼ 아이콘(arrow_2.svg) 삽입: 한번만
    if (!titleLink.querySelector(":scope > .img.is-mobile")) {
      const icon = document.createElement("p");
      icon.className = "img is-mobile";
      icon.innerHTML = `<img src="img/arrow_2.svg" alt="">`;
      titleLink.appendChild(icon);
    }

    // 클릭 토글
    titleLink.addEventListener("click", (e) => {
      e.preventDefault();
      category.classList.toggle("is-open");
      titleLink.parentElement?.classList.toggle("is-open");
    });
  }

  setup();
  mq.addEventListener("change", setup);

  // (선택) 바깥 클릭하면 닫기
  document.addEventListener("click", (e) => {
    if (!mq.matches) return;
    const filter = document.querySelector(".filter");
    if (!filter) return;

    if (!filter.contains(e.target)) {
      category.classList.remove("is-open");
      titleLink.parentElement?.classList.remove("is-open");
    }
  });
});


// ---------- ul.list 마우스 드래그 가로 스크롤 ----------
document.addEventListener("DOMContentLoaded", () => {
  const lists = document.querySelectorAll(".filter .filter-group ul.list");

  lists.forEach((list) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    list.addEventListener("mousedown", (e) => {
      isDown = true;
      list.classList.add("dragging");
      startX = e.pageX - list.offsetLeft;
      scrollLeft = list.scrollLeft;
    });

    list.addEventListener("mouseleave", () => {
      isDown = false;
      list.classList.remove("dragging");
    });

    list.addEventListener("mouseup", () => {
      isDown = false;
      list.classList.remove("dragging");
    });

    list.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - list.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도 조절
      list.scrollLeft = scrollLeft - walk;
    });
  });
});
