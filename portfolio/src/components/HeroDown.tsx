import { Link } from "react-router";
const HeroDown = () => {

  return (
    <section data-section className="h-[100vh] w-full overflow-hidden">

      <div className="bottom-24 md:bottom-10 relative z-10 flex flex-col items-center justify-end py-10 pt-32 sm:py-16 sm:pt-32 h-full text-center text-white px-6 md:px-36">
        <div>
          <p className="text-xl pixel md:text-2xl max-w-2xl mb-8">
            Frontend-focused, backend-capable — building scalable interfaces,
            APIs, and real-world systems with React
          </p>
          <Link
            to="#about"
            className=" inset-shadow px-8 py-3 bg-[#4254bd] hover:bg-[#3444a8] rounded-lg text-white font-medium transition-colors"
          >
            View My Work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroDown;
