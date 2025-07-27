/* eslint-disable react/prop-types */
import { motion } from "motion/react"

/**
 * Defines the animation variants for the container of the hover lines.
 * This controls the staggering of the children animations.
 */

const staggerDuration = 0.03885
const lineContainerVariants = {
  initial: {
    "--x": "100%",
    transition: {
      staggerChildren: staggerDuration, // Stagger children when animating out
      delayChildren: staggerDuration, // Small delay before lines start animating out
      staggerDirection: -1, // Animate out in reverse order
    },
  },
  hover: {
    transition: {
      staggerChildren: staggerDuration, // Time delay between each child animating in
      delayChildren: staggerDuration, // A small delay before the first line starts animating
    },
  },
}

/**
 * Defines the animation variants for each individual line.
 * We use clip-path for a smoother "wipe" animation instead of opacity/scale.
 */
const lineVariants = {
  // Initial state: The line is clipped to a zero-width vertical line in the center.
  initial: {
    clipPath: "inset(0 50% 0 50%)",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1], // A custom cubic-bezier for a snappy exit
    },
  },
  // Hover state: The clip-path expands to reveal the entire line.
  hover: {
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1], // A custom cubic-bezier for a snappy entrance
    },
  },
}

export default function ShinyButton({
  href = "/assets/Emre_Gundogdu_CV.pdf",
  className,
  children,
}) {
  return (
    <motion.a
      // Define animation variants for the main button element
      variants={{
        initial: { "--x": "100%" }, // Initial state for --x
        animate: {
          // Continuous animation for --x
          "--x": "-100%",
          transition: {
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
            type: "spring",
            stiffness: 20,
            damping: 15,
            mass: 2,
            // These transition properties apply specifically to the --x animation
          },
        },
        hover: {
          // When hovered, the continuous --x animation should not continue its loop.
          // By not defining "--x" here, the 'animate' variant's continuous loop for --x
          // will be implicitly paused while the 'hover' state is active.
          // When the hover ends, it will revert to the 'animate' state and resume.
        },
      }}
      initial="initial" // Set the initial state
      animate="animate" // Tell motion to use the 'animate' variant for continuous animation
      whileHover="hover" // Tell motion to use the 'hover' variant when hovered
      transition={{
        // This transition block applies to properties not explicitly defined in specific variants,
        // or provides default transition values. The 'scale' animation is here.
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      // Explicitly set --x in inline style to ensure it's 100% from the very start
      style={{ "--x": "100%" }}
      className={`block px-6 py-2 rounded-3xl relative radial-gradient w-fit ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer noopenner"
    >
      {/* Container for the animated hover lines */}
      <motion.div className="absolute inset-0" variants={lineContainerVariants}>
        {/* The four lines that animate sequentially */}
        {insets.map((inset, i) => (
          <motion.div
            key={i}
            className={`absolute border border-neutral-500 rounded-3xl`}
            style={{ inset }}
            variants={lineVariants}
          />
        ))}
      </motion.div>

      <span
        className="text-neutral-100 tracking-wide font-extralight text-sm md:text-xl uppercase h-full w-full block relative linear-mask"
        style={{
          fontSize: "clamp(1rem, 1vw, 1.25rem)",
        }}
      >
        {children}
      </span>
      <span className="block absolute inset-0 rounded-3xl p-px linear-overlay" />
    </motion.a>
  )
}

const insets = [1, 2, 3, 4, 5, 6, 7].map((val) => `${val}px`)
