import { animate, AnimatePresence, motion } from "motion/react"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { useEffect, useState } from "react"

export const PRELOADER_DELAY = 0.25
export const PRELOADER_DURATION = 1.54

export default function Preloader() {
  const { width } = useWindowDimensions()
  const [isVisible, setIsVisible] = useState(true)

  // Scroll to top on load
  useEffect(() => {
    if (!window) return
    setTimeout(function () {
      window.scrollTo(0, 0)
    }, 300)
  }, [])

  const handleAnimate = async () => {
    await animate(
      "#preloader-ball",
      {
        scale: [0, 3],
      },
      {
        duration: 0.5,
        delay: PRELOADER_DELAY,
        ease: [0.77, 0, 0.175, 1],
      }
    )

    await animate(
      "#preloader-ball",
      {
        scale: [3, width ? width / 16 : 30],
      },
      {
        duration: PRELOADER_DURATION - 0.6,
        delay: 0.1,
        ease: [0.36, 0, 0.66, -0.1618],
      }
    )
  }

  useEffect(() => {
    handleAnimate()
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          id="preloader"
          className={`absolute inset-0 h-[100dvh] w-full text-[#000] bg-[#1c1d20] flex items-center justify-center z-50 overflow-hidden`}
          initial={{ opacity: 1, backgroundColor: "#1c1d20" }}
          animate={{ opacity: 0, backgroundColor: "transparent" }}
          transition={{
            delay: PRELOADER_DURATION + PRELOADER_DELAY,
            duration: PRELOADER_DELAY,
            ease: "easeIn",
          }}
          onAnimationComplete={() => setIsVisible(false)}
        >
          <motion.div
            className="bg-black rounded-full origin-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"
            style={{ scale: 0 }}
            id="preloader-ball"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
