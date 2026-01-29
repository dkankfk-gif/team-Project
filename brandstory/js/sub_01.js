// =========================
// Timeline GSAP (PC=가로 / <=900=세로 sticky)
// - 901px 이상: 가로 핀 + x이동 + stroke baseline 계산
// - 900px 이하: 가로 트리거 제거 + transform 초기화 (세로 sticky는 CSS 담당)
// =========================

gsap.registerPlugin(ScrollTrigger);

function getBaselineY(el) {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);

    const fontSize = parseFloat(style.fontSize) || 0;
    const lineHeight =
        style.lineHeight === "normal"
            ? fontSize * 1.2
            : parseFloat(style.lineHeight) || fontSize * 1.2;

    const baselineOffset = fontSize * 0.18;
    return rect.top + lineHeight - baselineOffset;
}

function setTimelineStrokeToYearBaseline() {
    const list = document.querySelector(".TimeLine .con .list");
    if (!list) return;

    const year = document.querySelector(".TimeLine .con .list .line01 h1"); // 2003 기준
    if (!year) return;

    const listRect = list.getBoundingClientRect();
    const baselineY = getBaselineY(year);
    const yInList = baselineY - listRect.top;

    list.style.setProperty("--stroke-y", `${yInList}px`);
}

window.addEventListener("load", () => {
    ScrollTrigger.matchMedia({
        //  <=900: 세로(sticky) 모드 — 가로 GSAP 끄기
        "(max-width: 900px)": function () {
            const list = document.querySelector(".TimeLine .con .list");
            if (list) gsap.set(list, { clearProps: "transform" });

            // 세로 모드에서도 stroke baseline 쓰고 싶으면 주석 해제
            // setTimelineStrokeToYearBaseline();
            // ScrollTrigger.addEventListener("refresh", setTimelineStrokeToYearBaseline);
        },

        // >=901: PC 가로 모드 — 기존 가로 GSAP
        "(min-width: 901px)": function () {
            const section = document.querySelector(".TimeLine");
            const con = section?.querySelector(".con");
            const list = section?.querySelector(".list");
            if (!section || !con || !list) return;

            const getMaxScrollX = () => Math.max(0, list.scrollWidth - con.clientWidth);

            gsap.to(list, {
                x: () => -getMaxScrollX(),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    start: "top top",
                    end: () => "+=" + getMaxScrollX(),
                    markers: false,
                },
            });

            ScrollTrigger.addEventListener("refreshInit", () => gsap.set(list, { x: 0 }));
            ScrollTrigger.addEventListener("refresh", setTimelineStrokeToYearBaseline);

            setTimelineStrokeToYearBaseline();
            ScrollTrigger.refresh();

            let t;
            window.addEventListener("resize", () => {
                clearTimeout(t);
                t = setTimeout(() => ScrollTrigger.refresh(), 150);
            });
        },
    });
});

// =========================
// toptit 복제 스크립트 (모바일에서 각 li에 toptit 추가)
// =========================

(function () {
    const MQ = window.matchMedia("(max-width: 900px)");

    function applyRepeatTopTit(isMobile) {
        const section = document.querySelector(".TimeLine");
        if (!section) return;

        const original = section.querySelector(".con > .toptit");
        const list = section.querySelector(".con > .list");
        if (!original || !list) return;

        const items = list.querySelectorAll(":scope > li");

        if (isMobile) {
            //  각 li에 없으면 생성
            items.forEach(li => {
                if (li.querySelector(":scope > .toptit.is-cloned")) return;

                const clone = original.cloneNode(true);
                clone.classList.add("is-cloned");         // 구분용
                // (선택) PC용 스타일 영향 없게 클래스 추가로만 제어
                li.insertBefore(clone, li.firstChild);
            });
        } else {
            //  모바일에서 만든 것만 제거
            section.querySelectorAll(".toptit.is-cloned").forEach(el => el.remove());
        }
    }

    // 최초 1회
    applyRepeatTopTit(MQ.matches);

    // 브레이크포인트 변경 감지
    if (MQ.addEventListener) {
        MQ.addEventListener("change", e => applyRepeatTopTit(e.matches));
    } else {
        // 구형 사파리 대응
        MQ.addListener(e => applyRepeatTopTit(e.matches));
    }
})();

// =========================
// Beauty Product 무한 스크롤 애니메이션
// =========================

document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.beauty .beauty-product');
    if (!wrap) return;

    const cols = Array.from(wrap.querySelectorAll('ul.card'));
    const SPEED = 28; // px/sec (18~40 조절 가능)

    /* =====================================================
      1) ul 내부 li 1회 복제 (무한 루프 준비)
    ===================================================== */
    cols.forEach((ul) => {
        if (ul.dataset.loopReady === "1") return;

        const items = Array.from(ul.children);
        items.forEach(li => ul.appendChild(li.cloneNode(true)));

        ul.dataset.loopReady = "1";
    });

    /* =====================================================
      2) offset / half 값
    ===================================================== */
    let offsets = new Array(cols.length).fill(0);
    let halves = new Array(cols.length).fill(0);

    /* =====================================================
      3) 높이 재계산 ( display:none 대응 + 무한루프 방어)
    ===================================================== */
    function recalc() {
        cols.forEach((ul, idx) => {
            const total = ul.scrollHeight;

            //  반응형에서 display:none 되면 scrollHeight = 0
            if (!total || !isFinite(total)) {
                halves[idx] = 0;
                return;
            }

            const half = total / 2;
            if (!half || !isFinite(half)) {
                halves[idx] = 0;
                return;
            }

            halves[idx] = half;

            const isOddCol = (idx % 2 === 0); // 1,3,5열

            // 짝수열은 -half에서 시작
            if (!isOddCol && offsets[idx] === 0) {
                offsets[idx] = -half;
            }

            // offset 범위 정리 ( half=0일 때 while 무한 방지됨)
            if (isOddCol) {
                while (offsets[idx] <= -half) offsets[idx] += half;
                while (offsets[idx] > 0) offsets[idx] -= half;
            } else {
                while (offsets[idx] >= 0) offsets[idx] -= half;
                while (offsets[idx] < -half) offsets[idx] += half;
            }
        });
    }

    /* =====================================================
      4) RAF 애니메이션
    ===================================================== */
    let rafId = null;
    let last = performance.now();

    function start() {
        if (rafId) cancelAnimationFrame(rafId);
        last = performance.now();
        rafId = requestAnimationFrame(tick);
    }

    function tick(now) {
        const dt = (now - last) / 1000;
        last = now;

        cols.forEach((ul, idx) => {
            const half = halves[idx];
            if (!half) return; //  숨겨진 컬럼 스킵

            const isOddCol = (idx % 2 === 0);
            const dir = isOddCol ? -1 : 1;

            offsets[idx] += dir * SPEED * dt;

            // 루프 유지
            if (isOddCol) {
                if (offsets[idx] <= -half) offsets[idx] += half;
            } else {
                if (offsets[idx] >= 0) offsets[idx] -= half;
            }

            ul.style.transform = `translateY(${offsets[idx]}px)`;
        });

        rafId = requestAnimationFrame(tick);
    }

    /* =====================================================
      5) 로드 / 리사이즈 처리 ( 디바운스)
    ===================================================== */
    window.addEventListener('load', () => {
        recalc();
        start();
    });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            recalc();
        }, 120); //  resize 폭주 방지
    });

});

