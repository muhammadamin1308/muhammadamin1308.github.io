import hangmanImg from "../assets/projects/hangman.png";
import steamImg from "../assets/projects/steam.png";
import chatImg from "../assets/projects/chatgramer.png";
import pomoImg from "../assets/projects/pomodoro.png";
import paperImg from "../assets/projects/paper.png";

const projects = [
  {
    title: "Hangman",
    image: hangmanImg,
    description: "Classic Hangman game with keyboard support and animations.",
    tech: ["JavaScript", "HTML", "CSS"],
    demo: "https://muhammadamin1308.github.io/hangman-game/",
    repo: "https://github.com/muhammadamin1308/hangman-game",
  },
  {
    title: "Steam Academy",
    image: steamImg,
    description: "A lightweight store UI demonstrating product lists and filters.",
    tech: ["React", "TypeScript"],
    demo: "https://steam-academy.netlify.app/",
  },
  {
    title: "Chatgramer",
    image: chatImg,
    description: "Realtime chat with WebSocket and simple moderation tools.",
    tech: ["Node.js", "WebSocket", "Javascript"],
    demo: "https://chatgramer.onrender.com/",
    repo: "https://github.com/muhammadamin1308/chatgramer/tree/dev",
  },
  {
    title: "Pomodoro Timer",
    image: pomoImg,
    description: "Minimal Pomodoro timer with notifications and persistent settings.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://mshspomodoro.netlify.app/",
    repo: "https://github.com/muhammadamin1308/pomodoro-timer",
  },
  {
    title: "Paper - Book Shop",
    image: paperImg,
    description: "Simple notes app with markdown support and local storage.",
    tech: ["TypeScript", "Tailwind", "React"],
    demo: "https://e-commerce-wkcm.onrender.com/"
  },
];

const ProjectCard = ({ p }: { p: typeof projects[number] }) => (
  <article className="group bg-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="relative h-48 md:h-40 lg:h-44 w-full overflow-hidden bg-slate-800">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <h3 className="absolute left-4 bottom-3 text-white text-lg font-semibold">{p.title}</h3>
    </div>

    <div className="p-4">
      <p className="text-sm text-slate-300 mb-3">{p.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {p.tech.map((t) => (
          <span key={t} className="text-xs bg-white/15 text-white px-3 py-1 rounded-full">{t}</span>
        ))}
      </div>
      <div className="flex gap-3">
          {p.demo && (
            <a href={p.demo} className="inline-block px-4 py-2 rounded-full border border-white/10 text-sm text-[#4254bd] hover:bg-white/10">Demo</a>
          )}
          {p.repo && (
            <a href={p.repo} className="inline-block px-4 py-2 rounded-full border border-white/10 text-sm text-white hover:bg-white/10">Repo</a>
          )}
      </div>
    </div>
  </article>
);

const Projects = () => {
  return (
    <section id="projects" data-section className="bg-black w-screen py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-xl md:text-5xl text-center text-white font-medium tracking-wide mb-16 neon-text">
            Projects
          </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
