import { motion } from "motion/react"
import LocalTime from "../ui/LocalTime"

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
  const handleScrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "end", // Ensures footer is fully in view
      })
    }
  }

  // TODO: FIX - Scrolling to Contact not working

  return (
    <header
      className="absolute top-0 left-0 right-0 flex justify-between px-8 md:px-12 py-4 md:py-4 z-20"
      id="landing-header"
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
            <a
              href="#contact"
              className="nav-link"
              onClick={handleScrollToContact}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
