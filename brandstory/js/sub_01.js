// =========================
// [구버전] Timeline GSAP — 주석 처리
// =========================
/*
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

    const year = document.querySelector(".TimeLine .con .list .line01 h1");
    if (!year) return;

    const listRect = list.getBoundingClientRect();
    const baselineY = getBaselineY(year);
    const yInList = baselineY - listRect.top;

    list.style.setProperty("--stroke-y", `${yInList}px`);
}

window.addEventListener("load", () => {
    ScrollTrigger.matchMedia({
        "(max-width: 900px)": function () {
            const section = document.querySelector(".TimeLine");
            const list = document.querySelector(".TimeLine .con .list");
            if (!section || !list) return;
            gsap.set(list, { clearProps: "transform" });
            const cards = gsap.utils.toArray(".TimeLine .con .list > li");
            if (!cards.length) return;
            gsap.set(list, { position: "relative", overflow: "hidden" });
            cards.forEach((card, i) => {
                gsap.set(card, {
                    position: "absolute", top: 0, left: 0, width: "100%", zIndex: i + 1,
                });
            });
            const setListHeight = () => {
                const h = cards[0].offsetHeight;
                gsap.set(list, { height: h });
            };
            setListHeight();
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section, pin: true, scrub: 1,
                    start: "top top",
                    end: () => "+=" + (window.innerHeight * cards.length),
                    invalidateOnRefresh: true, onRefresh: setListHeight,
                }
            });
            cards.forEach((card, i) => {
                if (i === 0) return;
                tl.fromTo(card,
                    { yPercent: 100 }, { yPercent: 0, duration: 1, ease: "none" },
                    (i - 1) * 2.0
                );
            });
        },
        "(min-width: 901px)": function () {
            const section = document.querySelector(".TimeLine");
            const con = section?.querySelector(".con");
            const list = section?.querySelector(".list");
            if (!section || !con || !list) return;
            const getMaxScrollX = () => Math.max(0, list.scrollWidth - con.clientWidth);
            gsap.to(list, {
                x: () => -getMaxScrollX(), ease: "none",
                scrollTrigger: {
                    trigger: section, pin: true, scrub: 1,
                    anticipatePin: 1, invalidateOnRefresh: true,
                    start: "top top", end: () => "+=" + getMaxScrollX(), markers: false,
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

// toptit 복제 스크립트
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
            items.forEach(li => {
                if (li.querySelector(":scope > .toptit.is-cloned")) return;
                const clone = original.cloneNode(true);
                clone.classList.add("is-cloned");
                li.insertBefore(clone, li.firstChild);
            });
        } else {
            section.querySelectorAll(".toptit.is-cloned").forEach(el => el.remove());
        }
    }
    applyRepeatTopTit(MQ.matches);
    if (MQ.addEventListener) {
        MQ.addEventListener("change", e => applyRepeatTopTit(e.matches));
    } else {
        MQ.addListener(e => applyRepeatTopTit(e.matches));
    }
})();
*/


// =========================
// [신규] TimeLine GSAP 가로 스크롤 (tl- 접두사 구조)
// - 1024px 이상: pin + 가로 슬라이드
// - 1023px 이하: (추후 반응형 세로 sticky 추가 예정)
// =========================

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    const mm = gsap.matchMedia();

    // ── 1024px 이상: 가로 슬라이드 ──
    mm.add("(min-width: 1024px)", () => {
        const tlSection = document.querySelector(".TimeLine");
        const tlList = document.querySelector(".TimeLine .tl-list");
        if (!tlSection || !tlList) return;

        const scrollAmount = () => tlList.scrollWidth - window.innerWidth;

        gsap.to(tlList, {
            x: () => -scrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: tlSection,
                start: "top top",
                end: () => "+=" + (scrollAmount() + window.innerHeight * 1.0),
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            }
        });

        // 리사이즈 시 ScrollTrigger 갱신
        let resizeT;
        window.addEventListener("resize", () => {
            clearTimeout(resizeT);
            resizeT = setTimeout(() => ScrollTrigger.refresh(), 150);
        });
    });

    // ── 1023px 이하: 세로 sticky 스크롤 ──
    mm.add("(max-width: 1023px)", () => {
        const tlSection = document.querySelector(".TimeLine");
        const tlList = document.querySelector(".TimeLine .tl-list");
        if (!tlSection || !tlList) return;

        const cards = gsap.utils.toArray(".TimeLine .tl-list > li");
        if (!cards.length) return;

        // 리스트를 relative/overflow:hidden, 카드를 absolute로 겹침
        gsap.set(tlList, { position: "relative", overflow: "visible" });
        cards.forEach((card, i) => {
            gsap.set(card, {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: i + 1,
            });
        });

        // 리스트 높이 = 6번 카드(마지막) 콘텐츠 높이 기준
        const setListHeight = () => {
            // 모든 카드의 인라인 height 제거 → 콘텐츠 기반 높이 복원
            cards.forEach(c => { c.style.height = "auto"; });
            // 480px 이하: 가장 높은 카드 기준 / 그 이상: 6번 카드 기준
            const h = window.innerWidth <= 480
                ? Math.max(...cards.map(c => c.offsetHeight))
                : cards[cards.length - 1].offsetHeight;
            tlList.style.height = h + "px";
            cards.forEach(c => { c.style.height = h + "px"; });
        };
        setListHeight();

        // 타임라인: 각 카드가 아래에서 위로 올라옴
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: tlSection,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => "+=" + (window.innerHeight * cards.length),
                invalidateOnRefresh: true,
                onRefresh: setListHeight,
            }
        });

        // 1번 카드 내용을 충분히 볼 수 있도록 홀드 타임 추가
        const holdFirst = 1.5; // 1번→2번 사이 추가 대기 (조절 가능)

        cards.forEach((card, i) => {
            if (i === 0) return;
            const startPos = holdFirst + (i - 1) * 2.0;
            tl.fromTo(card,
                { yPercent: 100 },
                { yPercent: 0, duration: 1, ease: "none" },
                startPos
            );
        });

        // 리사이즈 시 갱신
        let resizeT;
        window.addEventListener("resize", () => {
            clearTimeout(resizeT);
            resizeT = setTimeout(() => {
                setListHeight();
                ScrollTrigger.refresh();
            }, 150);
        });
    });
});

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

