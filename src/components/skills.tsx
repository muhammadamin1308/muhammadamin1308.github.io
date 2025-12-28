import javascriptIcon from "../assets/skills/javascript.svg";
import typescriptIcon from "../assets/skills/typescript.svg";
import reactIcon from "../assets/skills/react.svg";
import nodeIcon from "../assets/skills/nodejs.svg";
import expressIcon from "../assets/skills/express-js.svg";
import restApiIcon from "../assets/skills/rest-api.svg";
import pgIcon from "../assets/skills/postgresql.svg";
import htmlIcon from "../assets/skills/html.svg";
import cssIcon from "../assets/skills/css.svg";
import tailwindIcon from "../assets/skills/tailwindcss.svg";
import gitIcon from "../assets/skills/git.svg";
import githubIcon from "../assets/skills/github.svg";

const skills = [
  { name: "JavaScript", icon: javascriptIcon },
  { name: "TypeScript", icon: typescriptIcon },
  { name: "React", icon: reactIcon },
  { name: "Node.js", icon: nodeIcon },
  { name: "Express", icon: expressIcon },
  { name: "REST API", icon: restApiIcon },
  { name: "PostgreSQL", icon: pgIcon },
  { name: "Git", icon: gitIcon },
  { name: "GitHub", icon: githubIcon },
  { name: "HTML", icon: htmlIcon },
  { name: "CSS", icon: cssIcon },
  { name: "Tailwind", icon: tailwindIcon },
];

const SkillPill = ({ name, icon }: { name: string; icon: string | null }) => (
  <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/5 text-white/90 text-lg flex-shrink-0">
    {icon ? (
      <img src={icon} alt={`${name} icon`} className="w-7 h-7" />
    ) : (
      // simple fallback SVG for missing icons (TypeScript / Git)
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        <rect width="24" height="24" rx="4" fill="#0ea5e9" />
        <text x="50%" y="57%" textAnchor="middle" fontSize="10" fontWeight={700} fill="white">{name.split(" ")[0].slice(0,2)}</text>
      </svg>
    )}
    <span className="opacity-90 text-center truncate max-w-[10rem] md:max-w-[14rem]">{name}</span>
  </div>
);

const Skills = () => {
  // Duplicate array for seamless marquee effect
  const display = [...skills, ...skills];

  return (
    <section aria-label="Skills" className="mt-10 w-full overflow-hidden">
      <div className="relative">
        <div className="skills-track flex gap-6 items-center">
          {display.map((s, i) => (
            <SkillPill key={`${s.name}-${i}`} name={s.name} icon={s.icon} />
          ))}
        </div>
          {/* Reverse track for mobile only */}
          <div className="md:hidden mt-4">
            <div className="skills-track-reverse inline-flex gap-6 items-center">
              {display.map((s, i) => (
                <SkillPill key={`rev-${s.name}-${i}`} name={s.name} icon={s.icon} />
              ))}
            </div>
          </div>
      </div>

      <style>{`
        .skills-track { display: inline-flex; gap: 1.5rem; padding: 0.25rem 0; animation: marquee 18s linear infinite; }
        .skills-track:hover { animation-play-state: paused; }
        .skills-track-reverse { display: inline-flex; gap: 1.5rem; padding: 0.25rem 0; animation: marquee 18s linear infinite reverse; }
        .skills-track-reverse:active { animation-play-state: paused; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
};

export default Skills;
