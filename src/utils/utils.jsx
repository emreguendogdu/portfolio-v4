import { motion } from "motion/react"

export const kebabCase = (title) => title.toLowerCase().split(" ").join("-")
export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  }
}

export const textToLetter = (text, variants) => {
  return text.split(" ").map((word, i) => {
    return (
      <span key={i} className="inline-block overflow-hidden">
        {word.split("").map((char, j) => {
          return (
            <motion.span
              key={`sp__${j}`}
              {...anim(variants)}
              custom={j}
              className="letter inline-block tracking-tight"
            >
              {char}
            </motion.span>
          )
        })}
        &nbsp;
      </span>
    )
  })
}
