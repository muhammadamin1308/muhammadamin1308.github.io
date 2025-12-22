import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const Loading = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        duration: 4,
        text: "Look up. That's where infinity begins.",
        ease: "none",
        repeat: -1,
        repeatDelay: 1,
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        
        {/* Loading text with neon effect */}
        <h2 ref={textRef} className="neon-text text-2xl font-bold"></h2>
      </div>
    </div>
  );
};

export default Loading;
