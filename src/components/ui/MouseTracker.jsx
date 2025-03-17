import { motion } from "motion/react"
import useMousePosition from "../../hooks/useMousePosition"
import { useRef } from "react"
import { useEffect } from "react"

export default function MouseTracker() {
  const { x, y } = useMousePosition()
  const hoveredElementHasIndexData = useRef(null)

  useEffect(() => {
    const handleHover = (e) => {
      const hoveredElement = e.target
      hoveredElementHasIndexData.current =
        hoveredElement.hasAttribute("data-index")
    }

    window.addEventListener("mouseover", handleHover)
    return () => {
      window.removeEventListener("mouseover", handleHover)
    }
  }, [])

  return (
    <motion.div
      className="w-10 h-10 border-[0.5px] border-black rounded-full pointer-events-none fixed z-[999]"
      animate={{ x: x - 16, y: y - 16 }}
      transition={{ type: "tween", ease: "backOut" }}
      style={{
        width: hoveredElementHasIndexData.current ? "1.6rem" : "2.5rem",
        height: hoveredElementHasIndexData.current ? "1.6rem" : "2.5rem",
        transition: "width 0.2s, height 0.2s",
      }}
    />
  )
}
