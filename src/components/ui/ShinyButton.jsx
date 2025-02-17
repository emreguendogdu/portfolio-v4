import { motion } from "motion/react"

export default function ShinyButton({
  href = "https://linkedin.com/in/emregnd/",
  className,
  children,
}) {
  return (
    <motion.a
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
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
      className={`block px-6 py-2 rounded-md relative radial-gradient ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer noopenner"
    >
      <span className="text-neutral-100 tracking-wide font-extralight text-xl uppercase h-full w-full block relative linear-mask">
        {children}
      </span>
      <span className="block absolute inset-0 rounded-3xl p-px linear-overlay" />
    </motion.a>
  )
}
