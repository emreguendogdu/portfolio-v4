import { animate, motion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef } from "react"
import ShinyButton from "../ui/ShinyButton"
import StarryHeroBackground from "./StarryBackground"
import { PRELOADER_DURATION } from "../ui/Preloader"

const animation = {
  opacity: [0, 1],
  y: ["100%", "0%"],
}

const reverseAnimation = {
  opacity: [0, 1],
  y: ["-100%", "0%"],
}

const transition = (duration = 1, delay) => {
  return {
    duration,
    delay: PRELOADER_DURATION - 0.32 + delay,
    ease: [0.76, 0, 0.24, 1],
  }
}

const handleAnimate = () => {
  animate("#hero h1 span:first-child", animation, transition(1, 0))
  animate("#hero h1 span:last-child", reverseAnimation, transition(1, 0.06225))
  animate("#hero h2 span", animation, transition(1, 0.125))
  animate("header", reverseAnimation, transition(1, 0.675))
  animate("#right-div", { opacity: [0, 1] }, transition(1, 0.375))
  animate("#left-div", { opacity: [0, 1] }, transition(1, 0.5))
  animate(
    "#scroll-down-icon-wrapper svg path",
    { pathLength: [0, 1], opacity: [0, 1] },
    transition(1, 0.375)
  )
}

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    handleAnimate()
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const starryBgScale = useTransform(scrollYProgress, [0, 1], [1, 0.5])

  return (
    <>
      <StarryHeroBackground scale={starryBgScale} />
      <section
        id="hero"
        className="relative bg-transparent text-[#f7f7f7] px-sectionX-m md:px-sectionX z-[999]"
        ref={heroRef}
      >
        <motion.div
          className="relative min-h-[100dvh] flex flex-col items-stretch justify-end md:items-stretch py-sectionY-m gap-xs md:gap-sm lg:gap-lg"
          id="hero-content"
        >
          <div className="select-none flex flex-col gap-4 xl:gap-4">
            <h1
              className="relative w-full uppercase text-left leading-none whitespace-nowrap overflow-hidden"
              style={{
                letterSpacing: "clamp(-0.05em, -0.15em, -0.25em)",
                fontSize: "clamp(2.5rem, 7.5vw, 8rem)",
              }}
            >
              <motion.span className="inline-block">Emre</motion.span>{" "}
              <motion.span className="inline-block">Gundogdu</motion.span>
            </h1>

            <h2 className="h3 font-thin leading-none text-left uppercase tracking-tight overflow-hidden">
              <motion.span className="inline-block">
                Front End Developer
              </motion.span>
            </h2>
          </div>
          <div className="relative w-full flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between">
            <div id="left-div" className="relative">
              <p
                className="w-4/5 text-left md:w-1/2 xl:w-[33%] md:text-justify font-extralight"
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
            className="absolute hidden bottom-0 translate-y-1/2 left-1/2 text-5xl text-neutral-200 mb-sectionY-m overflow-hidden"
            id="scroll-down-icon-wrapper"
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
              className="w-7 md:w-10"
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
