/* eslint-disable react/prop-types */
import { motion } from "motion/react"
// import PropTypes from "prop-types"

export default function Triangle(props) {
  return (
    <div className={props.className}>
      <motion.div
        className="border-solid border-transparent"
        style={{
          ...props.style,
          borderWidth: `0 var(--width) calc(var(--width) * 1.732) var(--width)`,
          borderColor: `transparent transparent currentColor transparent`,
          background: "linear-gradient(black, transparent)",
          maskImage: "linear-gradient(black, transparent)",
        }}
      />
    </div>
  )
}
