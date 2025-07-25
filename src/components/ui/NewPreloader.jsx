/* eslint-disable react/prop-types */
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const PRELOADER_DELAY = 0.0625;
export const PRELOADER_DURATION = 1.5;

export default function Preloader() {
  const { width, height } = useWindowDimensions();
  const [isVisible, setIsVisible] = useState(true);

  // Scroll to top on load
  useEffect(() => {
    if (!window) return;
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 300);
  }, []);

  return (
    <motion.div
      id="preloader"
      className={`absolute inset-0 h-[100dvh] w-full text-[#000] bg-[#1c1d20] flex items-center justify-center z-50 ${
        isVisible ? "block" : "hidden"
      }`}
      initial={{ opacity: 1, backgroundColor: "#1c1d20" }}
      animate={{ opacity: 0, backgroundColor: "black" }}
      transition={{
        delay: PRELOADER_DURATION - 0.25,
        duration: 0.25,
        ease: "easeIn",
      }}
      onAnimationComplete={() => setIsVisible(false)}
    >
      {/* Circle, which will expand to window width and height */}
      <motion.div
        className="bg-current rounded-full origin-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ width: 32, height: 32 }}
        animate={{
          scale: width / 16,
          transition: {
            duration: PRELOADER_DURATION,
            delay: PRELOADER_DELAY,
            ease: "easeIn",
          },
        }}
      />
    </motion.div>
  );
}
