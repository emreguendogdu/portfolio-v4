import { useRef } from "react"
import { useScroll, motion, useTransform, easeOut } from "motion/react"
import Triangle from "../ui/Triangle"
import useMatchMedia from "../../hooks/useMatchMedia"

const TIMELINE = {
  ENTRY: {
    START: 0,
    END: 0.35,
  },
  TRIANGLE: {
    START: 0,
    END: 0.55,
  },
  BODY: {
    Y_START: 0.25,
    OPACITY_START: 0.5,
    OPACITY_END: 1,
    SCALE_START: 0.65,
    SCALE_END: 0.85,
  },
}

export default function About() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "75% start"],
  })

  const isMobile = useMatchMedia("(max-width: 768px)")

  const entryOpacity = useTransform(
    scrollYProgress,
    [TIMELINE.TRIANGLE.START, TIMELINE.BODY.OPACITY_START],
    [1, 0]
  )

  const entryScale = useTransform(
    scrollYProgress,
    [TIMELINE.TRIANGLE.START, TIMELINE.TRIANGLE.END],
    [0.75, 1.25]
  )

  const triangleWidth = useTransform(
    scrollYProgress,
    [TIMELINE.TRIANGLE.START, TIMELINE.TRIANGLE.END],
    ["100vw", isMobile ? "1000px" : "2500px"]
  )

  const bodyY = useTransform(
    scrollYProgress,
    [TIMELINE.BODY.Y_START, TIMELINE.TRIANGLE.END],
    ["100%", "0%"],
    { ease: easeOut }
  )

  const bodyScale = useTransform(
    scrollYProgress,
    [TIMELINE.BODY.SCALE_START, TIMELINE.BODY.SCALE_END],
    [1, 0.5]
  )

  const bodyOpacity = useTransform(
    scrollYProgress,
    [
      TIMELINE.ENTRY.END,
      TIMELINE.BODY.OPACITY_START,
      TIMELINE.BODY.OPACITY_END,
    ],
    [0, 1, 0.5]
  )

  return (
    <section
      id="about"
      ref={targetRef}
      className="min-h-[375vh] bg-black border-t border-white/30 rounded-t-[40px] text-white relative z-10 select-none"
    >
      <p className="subheading px-sectionX-m md:px-sectionX py-sectionY-m md:py-sectionY absolute right-0 top-0">
        (About)
      </p>
      <div className="sticky top-0 h-screen flex justify-center items-center overflow-hidden">
        <motion.div
          style={{
            opacity: entryOpacity,
            scale: entryScale,
          }}
          className="text-center"
        >
          <h1 className="h2 font-medium">
            I develop engaging digital experiences.
          </h1>
        </motion.div>

        <Triangle
          style={{ "--width": triangleWidth, opacity: 0.2 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-[#e4e4e6]"
        />

        <motion.div
          style={{
            opacity: bodyOpacity,
            translateY: bodyY,
            scale: bodyScale,
          }}
          className="absolute max-w-[1200px] leading-[1.5] text-center"
        >
          <p>
            <span className="block h0 mb-6">🌍</span>
            <span className="block text-base md:text-2xl font-light mb-3">
              Redefining how people experience the web —
            </span>
            <span className="block h2 font-normal">
              creative, fast, and intuitive.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
