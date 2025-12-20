import { useRef, useEffect } from "react";
import hole from "/black_hole.mp4";
import { Link } from "react-router";
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.2;
    }
  }, []);

  return (
    <section className="h-[85vh] w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-10 left-0 w-screen h-screen object-cover -z-10"
      >
        <source src={hole} type="video/mp4" />
      </video>

      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-black/50 -z-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between py-10 sm:py-16 h-full text-center text-white px-6 md:px-36">
        <h1 className="neon-text text-4xl md:text-6xl font-bold mb-4">
          I build web systems, not just interfaces
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
