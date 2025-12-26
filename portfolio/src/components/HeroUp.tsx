import { useRef, useEffect, useState } from "react";
import hole from "/black_hole.mp4";

const HeroUp = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scale, setScale] = useState(1);
  const [topPosition, setTopPosition] = useState(66.67); // Start at 2/3 (66.67%)
  const [showScrollIcon, setShowScrollIcon] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      video.playbackRate = 0.2;
      video.play().catch(() => {});
    }
    // Pause video and scale it as user scrolls (reference: Hero.tsx)

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Calculate scale: from 1 to 2 based on scroll position
      const scrollProgress = Math.min(scrollPosition / viewportHeight, 1);
      // Disable scale on mobile (tailwind md breakpoint ~768px)
      const isMobile = window.innerWidth < 768;
      const newScale = isMobile ? 1 : 1 + scrollProgress; // scales from 1 to 2 on desktop only
      setScale(newScale);

      // Calculate top position: from 66.67% (2/3) to 33.33% (1/3)
      const newTop = 66.67 - (scrollProgress * 33.34); // moves from 2/3 to 1/3
      setTopPosition(newTop);
      // Hide scroll icon once user has scrolled most of the way
      setShowScrollIcon(scrollProgress < 0.95);

    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    // initial call to set state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} data-section className="h-[100vh] w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed left-1/2 -translate-x-1/2 w-screen md:w-screen h-screen md:h-auto object-cover -z-10 transition-transform duration-100 ease-out"
        style={{
          top: `${topPosition}%`,
          transform: `translate(-50%, -50%) scale(${scale})`
        }}
      >
        <source src={hole} type="video/mp4" />
      </video>

      {/* Scroll down icon (bottom center) */}
      <button
        aria-label="Scroll down"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-10 h-12 rounded-ful text-white backdrop-blur-sm transition-opacity duration-300 ${
          showScrollIcon ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg className="w-6 h-8 animate-bounce" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3v18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 16l-7 7-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-black/10 -z-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between py-10 pt-32 sm:py-16 sm:pt-32 h-full text-center text-white px-6 md:px-36">
        <h1 className="neon-text text-5xl md:text-7xl font-bold mb-4">
          Go beyond IMAGINATION!
        </h1>
      </div>
    </section>
  );
};

export default HeroUp;
