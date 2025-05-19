import { animate, motion } from "motion/react"
import { useEffect } from "react"
import ShinyButton from "../ui/ShinyButton"
import StarryHeroBackground from "./StarryBackground"

const animation = {
  opacity: [0, 1],
  x: ["100%", "0%"],
}
const transition = (duration = 1.5, delay = 0) => {
  return {
    duration,
    delay,
    ease: [0.76, 0, 0.24, 1],
  }
}

export default function Hero() {
  useEffect(() => {
    animate("#hero h1", animation, transition(1.5, 0.1))
    animate("#hero h2", animation, transition(1.5, 0.1))
    animate("header", { opacity: [0, 1], y: ["-100%", 0] }, transition(1, 1.25))
    animate("#right-div", { opacity: [0, 1] }, transition(1, 1))
    animate("#left-div", { opacity: [0, 1] }, transition(1, 1))
    animate(
      "#scroll-down-icon",
      { opacity: [0, 1], y: ["100%", 0] },
      transition(1, 1.15)
    )
    animate("#starry-bg", { opacity: [0, 1] }, transition(2))
  }, [])

  return (
    <>
      <StarryHeroBackground />
      <section
        id="hero"
        className="relative bg-transparent text-[#f7f7f7] px-8 md:px-12"
      >
        <motion.div
          className="relative h-screen flex flex-col items-center justify-center md:justify-between md:items-stretch py-sectionY-m md:py-48 gap-8"
          id="hero-content"
        >
          <div className="select-none">
            <h1
              className="relative w-full uppercase text-left md:text-center leading-none whitespace-nowrap"
              style={{
                letterSpacing: "clamp(-0.05em, -0.15em, -0.25em)",
                fontSize: "clamp(2rem, 11.5vw, 12.5rem)",
              }}
            >
              Emre Gundogdu
            </h1>
            <h2 className="h3 leading-none text-left md:text-center mt-2 md:mt-0 font-semibold">
              Front End Developer
            </h2>
          </div>
          <div className="relative w-full flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between">
            <div id="left-div" className="relative">
              <p className="w-full text-left md:w-[50%] md:text-justify font-extralight">
                Hi, I create web projects with React and Next.js. I&apos;m
                passionate about user-friendly interfaces and immersive
                experiences.
              </p>
            </div>
            <div
              id="right-div"
              className="relative md:flex md:items-end md:justify-end"
            >
              <ShinyButton>Open to Work</ShinyButton>
            </div>
          </div>
          <div
            className="absolute bottom-4 left-1/2 -translate-y-1/2 text-5xl text-neutral-200"
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
              className="w-7 md:w-10 mb-2"
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
  )
}
