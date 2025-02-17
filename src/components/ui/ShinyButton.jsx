import { motion } from "motion/react"

export default function ShinyButton() {
  return (
    <motion.a
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0.5,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      className="block px-6 py-2 rounded-md relative radial-gradient"
      href="https://linkedin.com/in/emregnd/"
      target="_blank"
      rel="noreferrer noopenner"
    >
      <a className="text-neutral-100 tracking-wide font-extralight text-xl uppercase h-full w-full block relative linear-mask">
        Open to Work
      </a>
      <span className="block absolute inset-0 rounded-3xl  p-px linear-overlay" />
    </motion.a>
  )
}
