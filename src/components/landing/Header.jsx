import { useState } from "react"
import useMatchMedia from "../../hooks/useMatchMedia"
import { motion } from "motion/react"
import { useEffect } from "react"

const navigations = {
  webpage: [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ],
  contact: [
    {
      name: "Linkedin",
      link: "https://linkedin.com/in/emregnd/",
    },
    {
      name: "Github",
      link: "https://github.com/emregnd/",
    },
    {
      name: "hello@emregnd.com",
      link: "mailto:hello@emregnd.com",
    },
  ],
}

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

export default function Header() {
  const isMobile = useMatchMedia("(max-width: 768px)")
  const [isOpen, setIsOpen] = useState(false)
  const [isInvisible, setIsInvisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    let prevScrollPos = window.scrollY

    const scrollHandler = () => {
      const currentScrollPos = window.scrollY
      setIsInvisible(prevScrollPos < currentScrollPos)
      prevScrollPos = currentScrollPos

      if (currentScrollPos > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", scrollHandler)
    return () => window.removeEventListener("scroll", scrollHandler)
  }

  useEffect(() => {
    handleScroll()
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 flex justify-between z-20 px-sectionX-m md:px-sectionX py-4 backdrop-blur-sm transition-opacity duration-300`}
      style={{ opacity: isInvisible ? 0 : 1 }}
    >
      <a href="/" className="uppercase text-sm text-neutral-500">
        emregnd.
      </a>
      <div className="relative">
        {(isMobile || scrolled) && (
          <Bars
            className="relative cursor-pointer text-2xl text-neutral-400"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          />
        )}
        {isOpen && (
          <motion.button
            className="absolute inset-0 z-40 w-fit h-fit text-neutral-400 text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
          >
            x
          </motion.button>
        )}
      </div>

      <motion.div
        id="overlay"
        className="hidden md:block absolute inset-0 bg-black opacity-50 h-screen"
        style={{ display: isOpen ? "block" : "none" }}
        initial={{ right: "-100%" }}
        animate={{ right: 0, transition: { duration: 1 } }}
        onClick={() => {
          setIsOpen(false)
        }}
      />
      <motion.nav
        initial={{ right: "-100%" }}
        animate={{
          right: (isMobile || scrolled) && (isOpen ? "0" : "-100%"),
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`bg-black fixed top-0 right-[100%] w-screen md:w-[50vw] h-screen flex flex-col text-center justify-center items-center text-lg md:text-3xl gap-8 md:gap-16 uppercase text-neutral-500 z-30 ${
          !scrolled &&
          "md:text-sm md:static md:flex-row md:w-fit md:h-fit md:bg-transparent"
        }`}
      >
        <motion.ul
          className={`flex gap-4 flex-col md:flex-row ${
            !scrolled &&
            "md:text-sm md:static md:flex-row md:w-fit md:h-fit md:bg-transparent"
          }`}
        >
          {navigations.webpage.map((nav, index) => (
            <motion.li key={index} onClick={() => setIsOpen(false)}>
              <a href={nav.link}>{nav.name}</a>
            </motion.li>
          ))}
        </motion.ul>
        <motion.ul
          className="flex gap-4"
          initial={{ display: "none" }}
          animate={{
            display: isOpen ? "flex" : "none",
            transition: { duration: 1 },
          }}
        >
          {navigations.contact.map((nav, index) => (
            <motion.li key={index} onClick={() => setIsOpen(false)}>
              <a
                href={nav.link}
                target="_blank"
                rel="noreferrer noopenner"
                className="text-lg"
              >
                {nav.name}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    </motion.header>
  )
}
