import { motion } from "motion/react"
import LocalTime from "../ui/LocalTime"
import { useState } from "react"
import { useEffect } from "react"

function Bars(props) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2"
      ></path>
    </motion.svg>
  )
}

export default function HeaderNeu() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  })

  return (
    <header
      className="fixed top-0 left-0 right-0 px-8 md:px-12 py-4 md:py-4 z-20"
      id="landing-header"
    >
      <motion.div
        className="relative flex justify-between"
        animate={{
          opacity: scrolled ? 0 : 1,
          y: scrolled ? "-100%" : 0,
          transition: { duration: 0.75, ease: "easeOut" },
        }}
      >
        <div className="md:flex md:gap-8">
          <a href="/" className="nav-link">
            emregnd<sup>®</sup>
          </a>
          <p className="nav-link select-none hover:text-neutral-400">
            <LocalTime />
          </p>
          <a
            href="mailto:hello@emregnd.com"
            target="_blank"
            rel="noreferrer noopenner"
            className="nav-link"
          >
            hello@emregnd.com
          </a>
        </div>
        <nav>
          <ul className="flex flex-col md:flex-row">
            <li>
              <a href="/" className="nav-link">
                Home,&nbsp;
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link">
                Projects,&nbsp;
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>
      <motion.div
        className="absolute w-10 h-10 bg-red-500 right-0 top-0 mx-8 md:mx-12 my-4 md:my-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
      ></motion.div>
    </header>
  )
}
