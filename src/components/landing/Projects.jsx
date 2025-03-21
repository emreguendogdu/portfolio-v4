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
import { useEffect } from "react"
import ImageComponent from "../ui/ImageComponent"

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
  const videoRef = useRef(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const videoPlayObserver = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting ? videoElement.play() : videoElement.load()
      },
      {
        threshold: 0.25, // Play when 25% is visible
      }
    )

    videoPlayObserver.observe(videoElement)
    return () => videoPlayObserver.disconnect()
  }, [])

  function Video() {
    return (
      <div className="relative w-full h-full pointer-events-none">
        <video
          poster={`/assets/ethera-supplements-thumbnail.webp`}
          loop
          muted
          aria-hidden
          playsInline
          className="relative w-full h-full object-scale-down object-center bg-[#111111] pointer-events-none"
          preload="none"
          ref={videoRef}
        >
          <source src={`/assets/ethera-supplements.mp4`} type="video/mp4" />
          <source src={`/assets/ethera-supplements.webm`} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }

  function Image() {
    const ext = project.name === "Design Challenges" ? ".gif" : ".webp"
    return (
      <ImageComponent
        src={`/assets/${kebabCase(project.name)}${ext}`}
        hash={project.imgHash}
        alt={project.name}
        className="relative w-full h-full object-scale-down object-center bg-[#111111] pointer-events-none"
      />
    )
  }

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full h-full overflow-hidden pointer-events-auto"
      data-hover="project"
      data-color={project.imgHash}
      {...anim(imageVariants)}
      aria-label={`View ${project.name}`}
    >
      {project.name === "Ethera Supplements" ? <Video /> : <Image />}
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
        <div className="relative w-full h-full flex flex-col gap-8 items-center py-16 md:py-12 select-none box-border pointer-events-none">
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
                <p className="text-sm md:text-base uppercase font-light overflow-y-hidden">
                  {textToLetter("Design & Development", textVariants)}
                </p>
                {/* Line around */}
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
                <p className="text-sm md:text-base uppercase font-light overflow-y-hidden">
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
  })
  const [PROJECT_ON_VIEW, SET_PROJECT_ON_VIEW] = useState(0)
  const eachProjectsScrollYProgressSize = 1 / projects.length

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
      className={`relative bg-black px-sectionX-m md:px-sectionX py-sectionY-m md:py-sectionY text-white min-h-[900vh] md:min-h-[900vh] snap-mandatory snap-y -mt-[100vh] z-10 mb-4`}
      ref={targetRef}
    >
      <p className="subheading">(Projects)</p>
      <AnimatePresence>
        <Project
          projectIndex={PROJECT_ON_VIEW}
          globalYProgress={scrollYProgress}
        />
      </AnimatePresence>

      <ShinyButton
        href="https://github.com/emreguendogdu/"
        className="!absolute bottom-2 left-1/2 -translate-x-1/2 w-fit"
      >
        Find More
      </ShinyButton>
    </section>
  )
}
