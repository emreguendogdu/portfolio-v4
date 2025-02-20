import { animate, motion } from "motion/react"
import { useEffect } from "react"
import ShinyButton from "../ui/ShinyButton"
import { MouseScrollDownIcon } from "../ui/Icons"
import StarryHeroBackground from "./StarryBackground"

const animation = {
  opacity: [0, 1],
  translateX: ["50%", "0%"],
}
const transition = (duration = 1.5, delay = 0.5) => {
  return {
    duration,
    delay,
    ease: [0.76, 0, 0.24, 1],
  }
}

export default function HeroFlex() {
  useEffect(() => {
    animate("#hero h1", animation, transition())
    animate("#hero h2", animation, transition())
    animate("header", animation, transition())
    animate("#right-div", animation, transition(1, 0.65))
    animate("#left-div", animation, transition(1, 0.85))
    animate("#scroll-down-icon", animation, transition(1, 0.95))
    animate("#starry-bg", { opacity: [0, 1] }, transition(3, 0.5))
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
              className="relative w-full  uppercase text-left md:text-center leading-none"
              style={{
                letterSpacing: "clamp(-0.05em, -0.15em, -0.25em)",
                fontSize: "clamp(3rem, 16vw, 10.25rem)",
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
          >
            <MouseScrollDownIcon />
          </div>
        </motion.div>
      </section>
    </>
  )
}
