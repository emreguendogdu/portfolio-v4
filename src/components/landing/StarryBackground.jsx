import { useState, useEffect } from "react"
import { motion } from "motion/react"

const starCount = 600

export default function StarryBackground() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    // Generate stars only once when the component mounts
    setStars(
      Array.from({ length: starCount }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 5,
        width: `${Math.random() * 2.5}px`,
        height: `${Math.random() * 2.5}px`,
      }))
    )
  }, [])

  return (
    <section
      className="absolute overflow-hidden w-full h-screen bg-black -z-10"
      id="starry-bg"
    >
      {/* Moving Space Background */}
      <div className="flex w-[200vw]">
        {[0, 1].map((_, index) => (
          <motion.div
            key={index}
            className="h-screen w-[100vw] bg-black relative"
            initial={{ x: "0vw" }}
            animate={{ x: "-100vw" }}
            transition={{
              duration: 120,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* Stars inside the moving background */}
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute w-[1px] h-[1px] bg-neutral-400 rounded-full"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.width,
                  height: star.height,
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0.5 }}
                transition={{
                  duration: star.duration,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: star.delay,
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
