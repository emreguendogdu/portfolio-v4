/* eslint-disable react/prop-types */
import { motion } from "motion/react"
import { useEffect } from "react"
import { anim } from "../../utils/utils"
import { useScrollContext } from "../../contexts/ScrollContext"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { useState } from "react"

const SVG = ({ width, height, setCompleted }) => {
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
        onAnimationComplete={() => setCompleted(true)}
      />
    </motion.svg>
  )
}

export default function Preloader() {
  const dimensions = useWindowDimensions()
  const [completed, setCompleted] = useState(false)

  // Scroll to top on load
  useEffect(() => {
    if (!window) return
    setTimeout(function () {
      window.scrollTo(0, 0)
    }, 100)
  }, [])

  // Block scrolling, reactivate when animation ends
  const { setAllowScroll } = useScrollContext()

  useEffect(() => {
    setAllowScroll(false)
    if (completed) {
      setAllowScroll(true)
    }
  }, [setAllowScroll, completed])

  return (
    <motion.div
      id="preloader"
      className="absolute inset-0 h-screen w-full"
      initial={{ display: "block" }}
      animate={{
        display: completed ? "none" : "block",
        transition: { duration: 1, delay: 0.35 },
      }}
    >
      <div
        className="bg-secondary opacity-0"
        style={{ opacity: dimensions.width > 0 && 1 }}
      ></div>
      {dimensions.width > 0 && (
        <SVG {...dimensions} setCompleted={setCompleted} />
      )}
    </motion.div>
  )
}
