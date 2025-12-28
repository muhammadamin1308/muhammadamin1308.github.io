import About from "../components/About";
import Projects from "../components/projects";
import HeroDown from "../components/HeroDown";
import HeroUp from "../components/HeroUp";
import Navigation from "../components/Navigation";
import ContactMe from "../components/contact-me";

const Index = () => {
  return (
    <>
      <Navigation />
      <HeroUp />
      <HeroDown />
      <About />
      <Projects />
      <ContactMe />
    </>
  );
};

export default Index;
