import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Blog from './pages/Blog'
import Loading from './components/Loading'


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
