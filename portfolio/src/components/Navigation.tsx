import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full px-4 md:px-16 py-2 md:py-4 bg-transparent z-50">
      <nav className=" mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className={`text-3xl font-bold hover:text-[#4254bd] transition-colors duration-500 ${isScrolled ? 'text-white' : 'text-gray-600'}`}>
          Muhammadamin
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 hover:text-[#4254bd] transition-colors duration-500 ${isScrolled ? 'text-white' : 'text-gray-600'}`}
        >
          <svg
            className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-gray-600'} duration-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Nav links */}
        <ul
          className={`${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          } lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto absolute lg:relative top-full lg:top-auto left-0 lg:left-auto right-0 lg:right-auto bg-black/95 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none border-t lg:border-t-0 border-gray-800 lg:border-0 transition-all duration-300 ease-in-out flex flex-col lg:flex-row w-full lg:w-auto py-4 lg:py-0 gap-1 lg:gap-6`}
        >
          <li className="group transition-colors">
            <a
              href="/Muhammadamin_Sharifjonov_CV.pdf"
              download
              aria-label="Download CV"
              className={`text-lg block py-2 px-3 group-hover:text-[#4254bd] ${isScrolled ? 'text-white' : 'text-gray-600'} duration-500 flex items-center`}
            >
              <svg aria-hidden="true" className="w-5 h-5 mr-1" viewBox="0 0 128 128" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M64 20c-1.7 0-3 1.3-3 3v58.8L46.1 66.9c-1.2-1.2-3.1-1.2-4.2 0-1.2 1.2-1.2 3.1 0 4.2l20 20c.6.6 1.4.9 2.1.9s1.5-.3 2.1-.9l20-20c1.2-1.2 1.2-3.1 0-4.2-1.2-1.2-3.1-1.2-4.2 0L67 81.8V23C67 21.3 65.7 20 64 20zM98.2 113.8c0-1.7-1.3-3-3-3H32.8c-1.7 0-3 1.3-3 3s1.3 3 3 3h62.4C96.9 116.8 98.2 115.4 98.2 113.8z" />
              </svg>
              <span>Download CV</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
