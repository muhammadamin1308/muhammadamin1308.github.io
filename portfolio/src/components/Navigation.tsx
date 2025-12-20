import { useState } from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full px-4 py-2 md:py-4 md:px-8 bg-transparent">
      <nav className="mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl text-[#4254bd]">
          Muhammadamin
          <p className="neon-text logo-font">coder</p>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-[#4254bd]"
        >
          <svg
            className="w-6 h-6"
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
            isOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row w-full lg:w-auto mt-4 lg:mt-0 gap-1 lg:gap-6`}
        >
          <li>
            <a
              href="#hero"
              className="block py-2 px-3 text-gray-600 hover:text-[#4254bd] transition-colors"
            >
              _hello
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="block py-2 px-3 text-gray-600 hover:text-[#4254bd] transition-colors"
            >
              _skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="block py-2 px-3 text-gray-600 hover:text-[#4254bd] transition-colors"
            >
              _projects
            </a>
          </li>
          <li>
            <a
              href="#footer"
              className="block py-2 px-3 text-gray-600 hover:text-[#4254bd] transition-colors"
            >
              _contact-me
            </a>
          </li>
          <li>
            <Link
              to="/"
              className="block py-2 px-3 text-gray-600 hover:text-[#4254bd] transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="block py-2 px-3 text-gray-600 hover:text-[#4254bd] transition-colors"
            >
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
