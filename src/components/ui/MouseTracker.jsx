import { motion } from "motion/react"
import useMousePosition from "../../hooks/useMousePosition"
export default function MouseTracker() {
  const { x, y } = useMousePosition()
  return (
    <motion.div
      className="w-10 h-10 border-[0.5px] border-white rounded-full pointer-events-none fixed z-[999]"
      animate={{ x: x - 16, y: y - 16 }}
      transition={{ type: "tween", ease: "backOut" }}
    />
  )
}
