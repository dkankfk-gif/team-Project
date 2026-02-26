/**
 * Package Section - clip-path reveal + 확대 애니메이션
 * Phase 1: clip-path 아치 → 직사각형 (하단 고정, 상단/좌우 열림)
 * Phase 2: thumb_con이 뷰포트 전체를 채우도록 확대 (하단 기준)
 */

gsap.registerPlugin(ScrollTrigger);

$(function () {
    const thumbCon = document.querySelector('.thumb_con');
    const section = document.querySelector('.Package');
    if (!thumbCon || !section) return;

    // 부모 요소들 overflow: visible 설정 (확대 시 잘리지 않도록)
    const middle = document.querySelector('.Package .middle');
    const inner = document.querySelector('.Package .inner');
    if (middle) middle.style.overflow = 'visible';
    if (inner) inner.style.overflow = 'visible';
    thumbCon.style.overflow = 'visible';

    const windowClip = 'inset(5% 5% 0% 5% round 48% 48% 0% 0%)';
    const openClip = 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)';
    const imgEl = document.querySelector('.imgWrap img');

    function createAnimation(startVal, endVal) {
        // 뷰포트 전체 기준으로 확대 비율 계산
        const vw = window.innerWidth;
        const vh = section.getBoundingClientRect().height;
        const thumbRect = thumbCon.getBoundingClientRect();

        const scaleX = vw / thumbRect.width;
        const scaleY = vh / thumbRect.height;
        const scale = Math.max(scaleX, scaleY);

        // thumb_con 하단 중앙 → 뷰포트 하단 중앙으로의 이동량
        const thumbCenterX = thumbRect.left + thumbRect.width / 2;
        const thumbBottomY = thumbRect.bottom;
        const secRect = section.getBoundingClientRect();
        const secCenterX = secRect.left + secRect.width / 2;
        const secBottomY = secRect.bottom;

        const dx = secCenterX - thumbCenterX;
        const dy = secBottomY - thumbBottomY;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.thumb_con',
                start: startVal,
                end: endVal,
                scrub: 1.5,
                markers: false,
                onLeaveBack: function () {
                    if (imgEl) imgEl.style.clipPath = windowClip;
                    section.style.overflow = 'hidden';
                },
                onEnter: function () {
                    section.style.overflow = 'visible';
                },
                onUpdate: function (self) {
                    // Phase 2 시작 시 overflow 해제
                    if (self.progress > 0.4) {
                        section.style.overflow = 'visible';
                    } else {
                        section.style.overflow = 'hidden';
                    }
                }
            }
        });

        // Phase 1: clip-path 아치 → 완전 개방 (하단 0 고정)
        tl.fromTo(imgEl,
            { clipPath: windowClip },
            { clipPath: openClip, ease: 'none', duration: 10 }, 0
        );

        // Phase 2: thumb_con 확대 (하단 기준점) → 뷰포트 전체 채움
        tl.fromTo(thumbCon,
            { scale: 1, x: 0, y: 0, transformOrigin: 'center bottom' },
            {
                scale: scale, x: dx, y: dy,
                transformOrigin: 'center bottom',
                ease: 'none', duration: 10
            },
            10
        );
    }

    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
            createAnimation('0% 20%', '100% 80%');
        },
        "(max-width: 768px)": function () {
            createAnimation('20% 80%', '100% 40%');
        }
    });
})
