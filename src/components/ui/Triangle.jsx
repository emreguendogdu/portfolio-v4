/* eslint-disable react/prop-types */
import { motion } from "motion/react"
// import PropTypes from "prop-types"

export default function Triangle(props) {
  const className =
    props.section === "about"
      ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      : "relative"

  const linearGradient = "linear-gradient(black, transparent)"

  return (
    <div className={`${className}`}>
      <motion.div
        className="border-solid border-transparent"
        style={{
          ...props.style,
          borderWidth: `0 var(--width) calc(var(--width) * 1.732) var(--width)`,
          borderColor: `transparent transparent #e4e4e6 transparent`,
          background: linearGradient,
          maskImage: linearGradient,
        }}
      />
    </div>
  )
}

// Triangle.propTypes = {
//   className: PropTypes.string,
//   styles: PropTypes.string,
// }
