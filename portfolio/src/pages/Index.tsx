import About from "../components/about";
import HeroDown from "../components/heroDown";
import HeroUp from "../components/heroUp";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <>
      <Navigation />
      <HeroUp />
      <HeroDown />
      <About />
      <About />
    </>
  );
};

export default Index;
