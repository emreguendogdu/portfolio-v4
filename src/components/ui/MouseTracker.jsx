import { motion } from "motion/react"
import useMousePosition from "../../hooks/useMousePosition"
import { useEffect } from "react"
import { useState } from "react"

const size = 48

export default function MouseTracker() {
  const { x, y } = useMousePosition()
  const [projectHovered, setProjectHovered] = useState(false)

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.dataset) {
        setProjectHovered(e.target.dataset.hover === "project" ? true : false)
      } else {
        return null
      }
    }

    window.addEventListener("mouseover", handleMouseOver)
    return () => window.removeEventListener("mouseover", handleMouseOver)
  }, [])

  return (
    <motion.div
      className="bg-neutral-800  text-white rounded-2xl pointer-events-none fixed z-[999] translate-x-1/2 translate-y-1/2 flex items-center justify-center"
      style={{ width: size, aspectRatio: 1 }}
      animate={{ x: x - size, y: y - size, scale: projectHovered ? 1 : 0 }}
      transition={{ type: "tween", duration: 0.25, ease: "backOut" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z" />
      </svg>
    </motion.div>
  )
}
