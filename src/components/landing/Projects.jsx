/* eslint-disable react/prop-types */
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react"
import { useState, useRef } from "react"
import { projects } from "../../data"
import { anim, kebabCase, textToLetter } from "../../utils/utils"
import ShinyButton from "../ui/ShinyButton"

// import { ArrowRight } from "../../icons/ArrowRight"
// import useMousePosition from "../../hooks/useMousePosition"

const easeInQuint = [0.64, 0, 0.78, 0]
const easeOutQuint = [0.22, 1, 0.36, 1]

const projectNumberVariants = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeOutQuint,
    },
  },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.45,
      ease: easeInQuint,
    },
  },
}

const textVariants = {
  initial: {
    y: "100%",
  },
  animate: (custom) => ({
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutQuint,
      delay: 0.1 + custom * 0.025,
    },
  }),
  exit: {
    y: "-100%",
    transition: (custom) => ({
      duration: 0.5,
      ease: easeInQuint,
      delay: 0.1 + custom * 0.025,
    }),
  },
}

const imageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: easeOutQuint,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: easeInQuint,
    },
  },
}

const ProjectImage = ({ project }) => {
  // const [isHovered, setIsHovered] = useState(false)
  // const { x, y } = useMousePosition()

  function Video() {
    return (
      <video
        poster={`/assets/ethera-supplements-thumbnail.webp`}
        autoPlay
        loop
        muted
        playsInline
        className="relative w-full h-full object-scale-down object-center bg-[#111111] cursor-pointer"
        preload="none"
      >
        <source src={`/assets/ethera-supplements.mp4`} type="video/mp4" />
        <source src={`/assets/ethera-supplements.webm`} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    )
  }

  function Image() {
    return (
      <img
        src={`/assets/${kebabCase(project.name)}${
          project.name === "Design Challenges" ? ".gif" : ".webp"
        }`}
        alt={project.name}
        className="relative w-full h-full object-scale-down object-center bg-[#111111] cursor-pointer"
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full h-full overflow-hidden"
      {...anim(imageVariants)}
    >
      {project.name === "Ethera Supplements" ? <Video /> : <Image />}
      {/* Mouse Tracker */}
      {/* <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              className="absolute flex items-center justify-center bg-neutral-100 text-black px-4 py-2 rounded-lg pointer-events-none select-none cursor-pointer -translate-y-1/2 -translate-x-full"
              style={{ left: x, top: y }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.25, type: "tween", ease: "backOut" }}
            >
              View
              <ArrowRight className="ml-1" />
            </motion.div>
          )}
        </AnimatePresence> */}
    </motion.a>
  )
}

const Project = ({ projectIndex }) => {
  const project = projects[projectIndex]

  const targetRef = useRef()
  return (
    <AnimatePresence mode="wait">
      <article
        className="sticky top-0 h-screen snap-start"
        ref={targetRef}
        key={projectIndex}
      >
        <div className="relative w-full h-full flex flex-col gap-8 items-center py-16 md:py-12 select-none box-border">
          <div
            id="content-top"
            className="relative text-center flex w-full justify-between"
          >
            <p
              id="project-number"
              className="relative inline-block h0 leading-[0.8] overflow-hidden order-2 [&>span]:relative [&>span]:inline-block"
            >
              <span className="w-[0.85ch]">0</span>
              <motion.span {...anim(projectNumberVariants)} className="w-[1ch]">
                {projectIndex + 1}
              </motion.span>
            </p>
            <div className="flex flex-col md:items-center justify-center">
              <h2
                id="project-name"
                className="h2 leading-[1.125] text-left md:text-center"
              >
                {textToLetter(project.name, textVariants)}
              </h2>
              <div className="w-full flex gap-2">
                <p className="text-sm md:text-lg uppercase font-medium overflow-y-hidden">
                  {textToLetter("Design & Development", textVariants)}
                </p>
                <div className="relative flex-1">
                  <motion.div
                    className="absolute w-full h-[1px] bg-neutral-700 right-0 top-1/2 -translate-y-[100%] origin-right"
                    initial={{ width: 0 }}
                    animate={{
                      width: "100%",
                      transition: {
                        duration: 0.25,
                        ease: "easeInOut",
                        delay: 0,
                      },
                    }}
                    exit={{ width: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                      delay: 0.1,
                    }}
                  />
                </div>
                <p className="text-sm md:text-lg uppercase font-medium overflow-y-hidden">
                  {textToLetter(String(project.year), textVariants)}
                </p>
              </div>
            </div>
            {/* Border below content */}
            <motion.div
              className="absolute -bottom-2 w-[100%] h-[0.5px] bg-neutral-700 left-0 right-0 origin-center"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: 0,
                },
              }}
              exit={{ scaleX: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </div>
          {/* <div className="w-full h-full bg-red-500"></div> */}
          <ProjectImage project={project} />
        </div>
      </article>
    </AnimatePresence>
  )
}

export default function Projects() {
  const targetRef = useRef()
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // offset: ["start end", "start start"],
  })
  const [PROJECT_ON_VIEW, SET_PROJECT_ON_VIEW] = useState(0)
  const eachProjectsScrollYProgressSize = 1 / projects.length
  // 1 / projects.length = When the index (or all items) changes
  // 0.33 for each project

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1) return
    const currentProjectIndex = Math.floor(
      latest / eachProjectsScrollYProgressSize
    )

    if (PROJECT_ON_VIEW !== currentProjectIndex) {
      SET_PROJECT_ON_VIEW(currentProjectIndex)
    }
  })

  return (
    <section
      id="projects"
      className={`relative bg-black px-sectionX-m md:px-sectionX py-sectionY-m md:py-sectionY text-white min-h-[750vh] md:min-h-[1200vh] snap-mandatory snap-y -mt-[100vh] z-10 mb-4`}
      ref={targetRef}
    >
      <p className="subheading">(Projects)</p>
      <AnimatePresence>
        <Project
          projectIndex={PROJECT_ON_VIEW}
          globalYProgress={scrollYProgress}
        />
        {/* Mouse event listener test (to fix onMouseLeave position [0, 0] issue on element changing)  */}
        {/* <div className="fixed left-0 right-0 bottom-0 h-[63%]">
          <div className="relative bg-blue-500 w-full h-full px-4 py-2 md:px-12 md:py-4"></div>
        </div> */}
      </AnimatePresence>

      <ShinyButton
        href="https://github.com/emreguendogdu/"
        className="!absolute -bottom-1 left-1/2 -translate-x-1/2 w-fit"
      >
        Find More
      </ShinyButton>
    </section>
  )
}
