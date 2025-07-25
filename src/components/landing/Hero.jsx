import { animate, motion } from "motion/react";
import { useEffect } from "react";
import ShinyButton from "../ui/ShinyButton";
import StarryHeroBackground from "./StarryBackground";
import { PRELOADER_DURATION } from "../ui/NewPreloader";

const animation = {
  opacity: [0, 1],
  x: ["100%", "0%"],
};
const transition = (duration = 1, delay = 0) => {
  return {
    duration,
    delay,
    ease: [0.76, 0, 0.24, 1],
  };
};

export default function Hero() {
  useEffect(() => {
    animate("#hero h1", animation, transition(1, PRELOADER_DURATION + 0.5));
    animate("#hero h2", animation, transition(1, PRELOADER_DURATION + 0.5));
    animate(
      "header",
      { opacity: [0, 1], y: ["-100%", 0] },
      transition(1, PRELOADER_DURATION + 1.25)
    );
    animate(
      "#right-div",
      { opacity: [0, 1] },
      transition(1, PRELOADER_DURATION + 1)
    );
    animate(
      "#left-div",
      { opacity: [0, 1] },
      transition(1, PRELOADER_DURATION + 1)
    );
    animate(
      "#scroll-down-icon",
      { opacity: [0, 1], y: ["100%", 0] },
      transition(1, PRELOADER_DURATION + 1.15)
    );
    animate("#starry-bg", { opacity: [0, 1] }, transition(2));
  }, []);

  return (
    <>
      <StarryHeroBackground />
      <section
        id="hero"
        className="relative bg-transparent text-[#f7f7f7] px-sectionX-m md:px-sectionX"
      >
        <motion.div
          className="relative h-screen flex flex-col items-stretch justify-end md:justify-between lg:justify-between md:items-stretch py-sectionY-m md:pt-lg gap-md md:gap-lg"
          id="hero-content"
        >
          <div className="select-none flex flex-col gap-4 2xl:gap-4">
            <h1
              className="relative w-full uppercase text-left leading-none whitespace-nowrap"
              style={{
                letterSpacing: "clamp(-0.05em, -0.15em, -0.25em)",
                fontSize: "clamp(2.5rem, 7.5vw, 8rem)",
              }}
            >
              <span>Emre</span> <span>Gundogdu</span>
            </h1>

            <h2 className="h3 font-thin leading-none text-left uppercase tracking-tight">
              Front End Developer
            </h2>
          </div>
          <div className="relative w-full flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between">
            <div id="left-div" className="relative">
              <p
                className="w-full text-left md:w-1/2 lg:w-[33%] md:text-justify font-extralight"
                style={{
                  fontSize: "clamp(1rem, 1vw, 1.25rem)",
                }}
              >
                I build immersive and high-performing web experiences with React
                and Next.js — blending UI/UX design, front-end precision, and
                full-stack capability when projects demand it.
              </p>
            </div>
            <div
              id="right-div"
              className="relative md:flex md:items-end md:justify-end"
            >
              <ShinyButton className="whitespace-nowrap">
                Open to Work
              </ShinyButton>
            </div>
          </div>
          <div
            className="absolute bottom-0   translate-y-1/2 left-1/2 text-5xl text-neutral-200 mb-sectionY-m"
            id="scroll-down-icon"
            aria-hidden
          >
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 247 390"
              style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 1.5,
              }}
              className="w-7 md:w-10 "
            >
              <path
                id="wheel"
                d="M123.359,79.775l0,72.843"
                className="fill-none stroke-current stroke-[30px] md:stroke-[20px] animate-scroll"
              />
              <path
                id="mouse"
                d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
                className="fill-none stroke-current stroke-[5px] md:stroke-[7.5px]"
              />
            </svg>
          </div>
        </motion.div>
      </section>
    </>
  );
}
