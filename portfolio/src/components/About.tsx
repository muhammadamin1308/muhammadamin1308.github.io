import bro from "/bro.png";
import githubIcon from "../assets/socials/github.png";
import linkedinIcon from "../assets/socials/linkedin.png";
import instagramIcon from "../assets/socials/instagram.png";
import telegramIcon from "../assets/socials/telegram.png";
import Skills from "./skills";
const About = () => {
  return (
    <>
      <section
        data-section
        id="about"
        className="shadow bg-black w-screen min-h-screen flex flex-col justify-center items-center"
      >
        <div className="max-w-6xl w-full mx-auto px-6 md:px-12 pt-20">
          <h2 className="text-xl md:text-5xl text-center text-white font-medium tracking-wide mb-16 neon-text">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-12">
            {/* Left column: avatar, location, socials */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-slate-800">
                {/* Replace /avatar.jpg with your image */}
                <img
                  src={bro}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-6 flex items-center text-slate-300 text-sm md:text-base">
                <svg
                  className="w-5 h-5 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9" r="2.2" fill="currentColor" />
                </svg>
                <span className="ml-3">Tashkent, Uzbekistan</span>
              </p>

              <div className="mt-6 flex items-center gap-4">
                {/* GitHub */}
                <a
                  href="https://github.com/muhammadamin1308/"
                  aria-label="GitHub"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                >
                  <img
                    src={githubIcon}
                    alt="GitHub"
                    className="w-full h-full object-contain"
                  />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/muhammadamin-sharifjonov/"
                  aria-label="LinkedIn"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                >
                  <img
                    src={linkedinIcon}
                    alt="LinkedIn"
                    className="w-full h-full object-contain"
                  />
                </a>

                {/* Telegram */}
                <a
                  href="@Disnotdewrst"
                  aria-label="Telegram"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                >
                  <img
                    src={telegramIcon}
                    alt="Telegram"
                    className="w-full h-full object-contain"
                  />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/_mshsacc/"
                  aria-label="Instagram"
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                >
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="w-full h-full object-contain"
                  />
                </a>
              </div>
            </div>

            {/* Right column: CTA, name, title, description */}
            <div className="md:w-2/3 text-center md:text-start flex flex-col justify-center items-center md:items-start">
              <h1 className="md:mt-6 text-4xl md:text-7xl font-extrabold text-white leading-tight">
                Muhammadamin Sharifjonov
              </h1>
              <p className="mt-2 text-lg md:text-xl text-slate-400">
                Full-Stack Developer | React, Node.js
              </p>

              <p className="mt-6 text-base md:text-lg text-slate-300 max-w-3xl">
                Self-taught Full-Stack Developer from Uzbekistan, specializing
                in modern web technologies and open-source development.
                Passionate about building scalable applications with React.
              </p>
            </div>
          </div>
        </div>
      <div className="mt-8 w-full">
        <Skills />
      </div>
      </section>
    </>
  );
};

export default About;
