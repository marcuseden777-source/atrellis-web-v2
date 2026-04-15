gsap.registerPlugin(ScrollTrigger);

// Initial Page Load Fade
gsap.from("header", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });

// Scroll Reveal Animations
gsap.utils.toArray('.showcase-reveal').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%", // Trigger when top of element hits 85% down viewport
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});
