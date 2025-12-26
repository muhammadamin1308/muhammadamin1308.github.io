import About from "../components/about";
import Projects from "../components/projects";
import HeroDown from "../components/heroDown";
import HeroUp from "../components/heroUp";
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
