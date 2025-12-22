import { useRef, useEffect, useState } from "react";
import hole from "/black_hole.mp4";
import { Link } from "react-router";
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scale, setScale] = useState(1);
  const [topPosition, setTopPosition] = useState(66.67); // Start at 2/3 (66.67%)

  useEffect(() => {
    const video = videoRef.current;
    let isPaused = false;
    
    if (video) {
      video.playbackRate = 0.2;
    }

    // Pause video and scale it as user scrolls
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 1; 

      // Calculate scale: from 1 to 2 based on scroll position
      const scrollProgress = Math.min(scrollPosition / viewportHeight, 1);
      const newScale = 1 + scrollProgress; // scales from 1 to 2
      setScale(newScale);

      // Calculate top position: from 66.67% (2/3) to 33.33% (1/3)
      const newTop = 66.67 - (scrollProgress * 33.34); // moves from 2/3 to 1/3
      setTopPosition(newTop);

      if (video) {
        if (scrollPosition > threshold) {
          if (!isPaused) {
            video.pause();
            isPaused = true;
          }
        } else {
          if (isPaused) {
            video.play().catch(() => {
            });
            isPaused = false;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="h-[200dvh] w-full overflow-hidden">
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

      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-black/10 -z-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between py-10 pt-32 sm:py-16 sm:pt-32 h-full text-center text-white px-6 md:px-36">
        <h1 className="neon-text text-5xl md:text-7xl font-bold mb-4">
          Go beyond IMAGINATION!
        </h1>
        <div>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Frontend-focused, backend-capable — building scalable interfaces,
            APIs, and real-world systems with React
          </p>
          <Link
            to="/blog"
            className=" inset-shadow px-8 py-3 bg-[#4254bd] hover:bg-[#3444a8] rounded-lg text-white font-medium transition-colors"
          >
            View My Work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
