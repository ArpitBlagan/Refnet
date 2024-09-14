import gsap from "gsap";

const Line = () => {
  const finalPath = "M 10 150 Q 500 150 990 150";
  return (
    <div
      className="h-[300px] w-[8/12] z-10 flex items-center justify-center pt-0"
      onMouseMove={(event) => {
        const div = event.currentTarget;
        // Calculate mouse position relative to the div
        const rect = div.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        console.log({ mouseX, mouseY });
        let pathe = `M 10 150 Q ${mouseX} ${mouseY} 990 150`;
        gsap.to("svg path", {
          attr: { d: pathe },
          duration: 0.3,
          ease: "power3.out",
        });
      }}
      onMouseLeave={() => {
        console.log("leave");
        gsap.to("svg path", {
          attr: { d: finalPath },
          duration: 1.2,
          ease: "elastic.out(1.0.2)",
        });
      }}
    >
      <svg width="1000" height="300">
        <path
          d="M 10 150 Q 500 150 990 150"
          stroke="white"
          fill="transparent"
        />
      </svg>
    </div>
  );
};

export default Line;
