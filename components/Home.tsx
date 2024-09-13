import { BackgroundBeams } from "@/components/ui/background-beams";

const Home = () => {
  return (
    <div className=" h-[40vh] md:h-[50vh] flex items-center justify-center">
      <BackgroundBeams />
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col gap-2 justify-center">
          <div className="flex items-center flex-col font-mono uppercase">
            <h1 className="text-[6vw] text-semibold text-zinc-700 leading-[.6] tracking-tight">
              The #1 website
            </h1>
            <h1 className="text-[5vw] tracking-tight">
              to show-off your projects.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
