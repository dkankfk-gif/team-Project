/**
 * Package Section - Image Zoom Animation
 * GSAP ScrollTrigger를 사용한 이미지 확대 효과
 * 390px 이하에서는 비활성화
 */

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    const section = document.querySelector("#Package");
    const canvas = document.querySelector("#thumbCanvas");
    const frame = document.querySelector("#pkgFrame");
    const copyWrap = document.querySelector("#pkgCopyWrap");

    if (!section || !canvas || !frame || !copyWrap) return;

    // 확대 완료 타겟(요청사항): 1920x1080
    const TARGET_W = 1920;
    const TARGET_H = 1080;

    // 390px 이하 미디어 쿼리 매칭
    const mobileQuery = window.matchMedia("(max-width: 390px)");

    function coverScaleUniform(fromRect, targetW, targetH) {
        // cover 방식: 둘 중 큰 배율로 맞추면 화면을 "덮음"
        const sx = targetW / fromRect.width;
        const sy = targetH / fromRect.height;
        return Math.max(sx, sy);
    }

    // 애니메이션 제거 함수
    function killAnimation() {
        ScrollTrigger.getAll().forEach(st => {
            if (st.vars && st.vars.id === "thumbZoom") st.kill();
        });
        // 초기 상태로 리셋
        gsap.set(canvas, { clearProps: "all" });
        gsap.set(frame, { clearProps: "all" });
        gsap.set(copyWrap, { clearProps: "all" });
    }

    function build() {
        // 390px 이하에서는 애니메이션 비활성화
        if (mobileQuery.matches) {
            killAnimation();
            return;
        }

        // 기존 트리거 제거
        ScrollTrigger.getAll().forEach(st => {
            if (st.vars && st.vars.id === "thumbZoom") st.kill();
        });

        // 초기 상태
        gsap.set(canvas, {
            x: 0,
            y: 0,
            scale: 1,
            borderRadius: "185px 185px 0 0",
            transformOrigin: "50% 50%"
        });

        gsap.set(frame, { opacity: 1 });
        gsap.set(copyWrap, { opacity: 1, filter: "blur(0px)", y: 0 });

        // 현재 thumb 크기(시작 기준)
        const cRect = canvas.getBoundingClientRect();

        if (!cRect.width || !cRect.height) return;

        // 1920x1080을 덮도록(cover) 균일 스케일 계산
        const finalScale = coverScaleUniform(cRect, TARGET_W, TARGET_H);

        /* 추가된 부분: 섹션 좌상단으로 이동해서 왼쪽 공백 제거 */
        const sRect = section.getBoundingClientRect();
        const dx = sRect.left - cRect.left;
        const dy = sRect.top - cRect.top;
        /* 여기까지 */

        // "덮인 상태 유지(pin)"를 위해 end를 넉넉히 줌
        // - end를 길게 줄수록, 확대 완료 상태가 오래 유지됨

        const tl = gsap.timeline({
            scrollTrigger: {
                id: "thumbZoom",
                trigger: canvas,
                start: "top 20%",
                end: "+=180%",
                scrub: 1,
                pin: section,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                /* markers: true */
            }
        });

        // 0~0.75 : 확대 + 라운드 0
        tl.to(canvas, {
            scale: finalScale,
            borderRadius: 0,
            ease: "none",
            duration: 0.75
        }, 0);

        // 0.20~ : 프레임 사라짐(큰 이미지만 남기기)
        tl.to(frame, {
            opacity: 0,
            ease: "none",
            duration: 0.25
        }, 0.20);

        // 0.55~ : copy 사라짐(원하면 유지도 가능)
        tl.to(copyWrap, {
            opacity: 0,
            filter: "blur(6px)",
            y: -16,
            ease: "none",
            duration: 0.25
        }, 0.55);

        // 0.75~1.00 : 확대 완료 "정지 유지" 구간
        // (scrub이라서 end까지 가는 동안 현재 상태 유지됨)
        tl.to({}, { duration: 0.25 }); // 타임라인 길이 확보용 더미
    }

    // 미디어 쿼리 변경 감지
    mobileQuery.addEventListener("change", (e) => {
        if (e.matches) {
            killAnimation();
        } else {
            build();
        }
    });

    // 초기 빌드 (390px 초과일 때만)
    if (!mobileQuery.matches) {
        build();
    }

    window.addEventListener("resize", () => {
        if (!mobileQuery.matches) {
            ScrollTrigger.refresh();
        }
    });

    function getResponsiveConfig() {
        const w = window.innerWidth;

        // 기본값(PC)
        let start = "top 20%";
        let end = "+=180%";
        let targetW = 1920;
        let targetH = 1080;

        // 태블릿/모바일: 현재 뷰포트 기준으로 "화면가득" 확대되게
        if (w <= 1024) {
            start = "top 25%";
            end = "+=140%";
            targetW = window.innerWidth;
            targetH = window.innerHeight;
        }
        if (w <= 768) {
            start = "top 30%";
            end = "+=120%";
            targetW = window.innerWidth;
            targetH = window.innerHeight;
        }

        return { start, end, targetW, targetH };
    }
});
