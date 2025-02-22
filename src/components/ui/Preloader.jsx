/* eslint-disable react/prop-types */
import { motion } from "motion/react"
import { useEffect } from "react"
import { anim } from "../../utils/utils"
import { useScrollContext } from "../../contexts/ScrollContext"
import useWindowDimensions from "../../hooks/useWindowDimensions"

const SVG = ({ width, height }) => {
  const initialPath = `
    M 0 0
    Q -300 ${height / 2} 0 ${height}
    L ${width} ${height}
    Q ${width + 300} ${height / 2} ${width} 0
    Z
  `
  const targetPath = `
    M 0 0
    Q 0 ${height / 2} 0 ${height}
    L ${width} ${height}
    Q ${width} ${height / 2} ${width} 0
    Z
  `

  const slide = {
    initial: {
      left: "0",
    },
    animate: {
      left: "-100vw",
      transition: { duration: 1.5, delay: 0, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const curve = {
    initial: { d: initialPath },
    animate: {
      d: targetPath,
      transition: { duration: 0.5, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    },
  }

  return (
    <motion.svg
      className="pointer-events-none fixed left-0 h-screen z-[200]"
      style={{ width: "calc(100vw + 600px)" }}
      {...anim(slide)}
    >
      <motion.path
        {...anim(curve)}
        fill="var(--color-secondary)"
        // Test style
        // style={{
        //   transform: "scale(0.25) translateX(600px) translateY(600px)",
        // }}
      />
    </motion.svg>
  )
}

export default function Preloader() {
  const dimensions = useWindowDimensions()

  // Scroll to top on load
  useEffect(() => {
    if (!window) return
    setTimeout(function () {
      window.scrollTo(0, 0)
    }, 200)
  }, [])

  // Block scrolling, reactivate when animation ends
  const { setAllowScroll } = useScrollContext()

  useEffect(() => {
    setAllowScroll(false)
    // setTimeout(() => setAllowScroll(true), 2000)
  }, [setAllowScroll])

  return (
    <div id="preloader" className="absolute inset-0 h-screen w-full">
      <div
        className="bg-secondary opacity-0"
        style={{ opacity: dimensions.width > 0 && 1 }}
      ></div>
      {dimensions.width > 0 && <SVG {...dimensions} />}
    </div>
  )
}
