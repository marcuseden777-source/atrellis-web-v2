gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// CANVAS SETUP
// =========================================================================

const canvas = document.getElementById("video-canvas");
const context = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderFrame(); // repaint on resize
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// =========================================================================
// FRAME SEQUENCE SETUP
// =========================================================================

const TOTAL_FRAMES = 259;
const FRAME_PREFIX = "assets/frames/ezgif-frame-";

// Pad frame number to 3 digits: 1 → "001"
function getFramePath(i) {
    return FRAME_PREFIX + String(i).padStart(3, "0") + ".jpg";
}

// Preload all frames into an Image array
const frames = [];
let framesLoaded = 0;
const FRAMES_NEEDED_TO_START = 30; // unlock after first 30 frames — rest load in background

const framesReadyPromise = new Promise(resolve => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
            framesLoaded++;
            if (framesLoaded === FRAMES_NEEDED_TO_START) resolve(); // unlock early
        };
        img.onerror = () => {
            framesLoaded++;
            if (framesLoaded === FRAMES_NEEDED_TO_START) resolve();
        };
        frames.push(img);
    }
});

// =========================================================================
// CANVAS RENDER
// =========================================================================

const animationState = { frame: 0 };

function renderFrame() {
    const img = frames[Math.round(animationState.frame)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover: scale to fill, centre-crop
    const scale = Math.max(cw / iw, ch / ih);
    const drawW = iw * scale;
    const drawH = ih * scale;
    const offsetX = (cw - drawW) / 2;
    const offsetY = (ch - drawH) / 2;

    context.clearRect(0, 0, cw, ch);
    context.drawImage(img, offsetX, offsetY, drawW, drawH);
}

// =========================================================================
// GSAP SCROLL TIMELINE
// =========================================================================

function initScrollTimeline() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#scroll-spacer",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
        }
    });

    // 0. Scroll Prompt Fade Out (instantly on scroll)
    tl.to("#scroll-prompt", { opacity: 0, pointerEvents: "none", duration: 0.05 }, 0);

    // 1. Scrub through all frames
    tl.to(animationState, {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        duration: 1,
        onUpdate: renderFrame
    }, 0);

    // 2. DESIGN CARD (~50% through scroll)
    tl.fromTo("#design-card", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.1 }, 0.5);
    tl.to("#design-card", { opacity: 0, duration: 0.05 }, 0.65);

    // 3. BUILD CARD (~70% through scroll)
    tl.fromTo("#build-card", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.1 }, 0.7);
    tl.to("#build-card", { opacity: 0, duration: 0.05 }, 0.82);

    // 4. FINAL CTA & FOOTER Reveal (~90%)
    tl.fromTo(".start-journey-btn", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.9);
    tl.to(".footer-strip", { opacity: 1, duration: 0.1 }, 0.9);

    // Paint the first frame immediately
    renderFrame();
}

// =========================================================================
// PAGE TRANSITION
// =========================================================================

function triggerJourney() {
    gsap.to("body", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => { window.location.href = "services.html"; }
    });
}

// =========================================================================
// PRELOADER — waits for all frames + page load
// =========================================================================

document.body.style.overflow = "hidden";

const pageReadyPromise = new Promise(resolve => {
    // Use DOMContentLoaded — NOT window 'load' which waits for ALL 259 images
    if (document.readyState !== "loading") resolve();
    else document.addEventListener("DOMContentLoaded", resolve);
});

// =========================================================================
// PRELOADER FAIL-SAFE LOGIC
// =========================================================================

document.body.style.overflow = "hidden";

function dismissPreloader() {
    console.log("Dismissing Preloader...");
    const preloader = document.getElementById("site-preloader");
    const preloaderVideo = document.getElementById("preloader-video");
    
    if (!preloader || preloader.classList.contains("hidden")) return;

    if (preloaderVideo) preloaderVideo.pause();
    preloader.classList.add("hidden");
    document.body.style.overflow = "auto";
    
    // Initial draw and timeline setup
    renderFrame();
    initScrollTimeline();

    // Remove from DOM entirely after fade
    setTimeout(() => {
        if (preloader && preloader.parentNode) preloader.remove();
    }, 1000);
}

// Global hook for the HTML fallback
window.forceDismissPreloader = dismissPreloader;

const preloaderVideo = document.getElementById("preloader-video");

// 1. If video ends, attempt to dismiss (if frames are ready)
if (preloaderVideo) {
    preloaderVideo.addEventListener("ended", () => {
        if (framesLoaded >= FRAMES_NEEDED_TO_START) {
            dismissPreloader();
        } else {
            preloaderVideo.currentTime = 0;
            preloaderVideo.play();
        }
    });
}

// 2. If frames finish loading, attempt to dismiss (if video has finished one loop or isn't playing)
const checkInterval = setInterval(() => {
    if (framesLoaded >= FRAMES_NEEDED_TO_START) {
        // If we have enough frames, don't keep the user waiting forever
        // We'll give it a moment for the video, but otherwise force it
        if (!preloaderVideo || preloaderVideo.paused || preloaderVideo.currentTime > 2) {
            clearInterval(checkInterval);
            dismissPreloader();
        }
    }
}, 500);

// 3. Absolute MAX wait time (12 seconds)
setTimeout(dismissPreloader, 12000);