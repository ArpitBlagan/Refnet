import { RiArrowRightLine } from "@remixicon/react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import Link from "next/link";

const Card = ({ ele, index }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseSpringX = useSpring(x);
  const mouseSpringY = useSpring(y);
  const rotateX = useTransform(
    mouseSpringY,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );
  const rotateY = useTransform(
    mouseSpringX,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );
  const handleMouseMove = (event: any) => {
    const rct = event.target.getBoundingClientRect();
    const width = rct.width;
    const height = rct.height;
    const mouseX = event.clientX - rct.left;
    const mouseY = event.clientY - rct.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className=" flex flex-col items-center justify-center bg-black px-5  py-10 rounded-t-2xl border border-zinc-800  gap-4"
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeInOut",
      }}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(75px)",
        }}
        className="h-full flex flex-col items-center gap-4"
      >
        <div className="flex items-center justify-center w-full">
          {ele.icon}
        </div>
        <h1 className="font-thin text-3xl text-white mb-4 relative z-50">
          {ele.label}
        </h1>

        <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          {ele.description}
        </p>
        <Link
          href={ele.link}
          className="flex px-4 py-2 gap-1
                    hover:gap-3 duration-300 ease-in-out border border-zinc-700
                    rounded-t-xl w-8/12 flex items-center justify-center text-md"
        >
          {ele.linkText} <RiArrowRightLine className="rotate-[-45deg]" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Card;
