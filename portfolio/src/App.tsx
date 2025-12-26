import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Blog from './pages/Blog'
import Loading from './components/Loading'
import gsap from 'gsap'
import { Observer } from 'gsap/all'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(Observer, ScrollToPlugin);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for all resources to load
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    // Wait for DOM to be ready
    const initScrolling = setTimeout(() => {
      // Get all sections with data-section attribute
      const sections = gsap.utils.toArray<HTMLElement>('[data-section]');
      
      if (sections.length === 0) return;

      let currentIndex = 0;
      const animating = { value: false };

      const gotoSection = (index: number) => {
        if (animating.value) return;
        
        index = Math.max(0, Math.min(sections.length - 1, index));
        if (index === currentIndex) return;
        
        animating.value = true;
        currentIndex = index;
        
        gsap.to(window, {
          scrollTo: { y: sections[index], autoKill: false },
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            animating.value = false;
          }
        });
      };

      // Observer for wheel/touch events
      const obs = Observer.create({
        type: "wheel,touch",
        wheelSpeed: -1,
        onDown: () => {
          gotoSection(currentIndex - 1);
        },
        onUp: () => {
          gotoSection(currentIndex + 1);
        },
        tolerance: 10,
        preventDefault: true
      });

      return () => {
        obs.kill();
      };
    }, 100);

    return () => {
      clearTimeout(initScrolling);
      Observer.getAll().forEach(obs => obs.kill());
    };
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <div className="fade-in">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/blog' element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
