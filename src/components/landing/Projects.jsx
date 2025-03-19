/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "motion/react"
import { projects } from "../../data"
import { useCallback, useMemo, useState, useRef } from "react"
import useMousePosition from "../../hooks/useMousePosition"
import useMatchMedia from "../../hooks/useMatchMedia"
import ImageComponent from "../ui/ImageComponent"

// Fix: ProjectImageDisplay not aligned correctly when switched from alt+tab (Search on StackOverflow)

const animationVariants = {
  projectTitle: {
    initial: { fontWeight: 300, x: 0 },
    selected: { fontWeight: 500, x: 0 },
    hover: (index) => ({
      x: 10 + (index + 1) * 5,
      transition: { duration: 0.45, ease: "easeOut" },
    }),
  },
  projectYear: {
    initial: { fontWeight: 300, x: 0 },
    selected: { fontWeight: 500, x: 0 },
    hover: (index) => ({
      x: -10 + -1 * (index + 1) * 5,
      transition: { duration: 0.45, ease: "easeOut" },
    }),
  },
  expandedContent: {
    initial: { height: 0, opacity: 0 },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.75, ease: "easeInOut" },
        opacity: { duration: 0.4, delay: 0.2 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  },
  contentItems: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2 },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 },
    },
  },
  imageTransition: {
    initial: (direction) => ({
      y: direction === 1 ? "100%" : "-100%",
    }),
    animate: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (direction) => ({
      y: direction === 1 ? "-100%" : "100%",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  },
}

const ProjectImageDisplay = ({ hoveredIndex, direction, selectedProject }) => {
  if (hoveredIndex === null || selectedProject !== null) return null
  const currentProject = projects[hoveredIndex]
  let { x, y } = useMousePosition()

  x = Math.max(Math.min(x, window.innerWidth / 1.5), window.innerWidth / 2)
  return (
    <motion.div
      className="absolute w-[40vw] max-w-[500px] left-0 -translate-x-2/3 top-0 -translate-y-full h-[300px] overflow-hidden pointer-events-none z-10"
      // Top based on index
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x, y }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.3 },
        top: { type: "tween", ease: "backOut", duration: 1 },
        x: { type: "tween", ease: "backOut", duration: 1 },
        y: { type: "tween", ease: "backOut", duration: 1 },
      }}
    >
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={`project-image-${hoveredIndex}`}
          className="w-full h-full"
          custom={direction}
          variants={animationVariants.imageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <img
            src={currentProject.images[0]}
            alt={currentProject.name}
            className="w-full h-full object-cover shadow-lg rounded-sm"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

const ExpandedContent = ({ project, index }) => {
  return (
    <>
      <motion.div
        variants={animationVariants.expandedContent}
        initial="initial"
        animate="animate"
        exit="exit"
        className="overflow-hidden"
      >
        <motion.div variants={animationVariants.contentItems}>
          {/* Top Content */}
          <div className="relative flex flex-col md:flex-row gap-4 md:[&>div]:flex-1 py-4">
            {/* Description */}
            <motion.div
              className="text-justify pr-4"
              initial={{ y: "-100%" }}
              animate={{
                y: 0,
                transition: { duration: 0.75, ease: "easeOut" },
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              numquam optio animi temporibus adipisci mollitia quam, aliquam ab
              ea, excepturi sapiente. Nam laborum autem odio doloribus iste
              ratione possimus tenetur magni.
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="flex flex-wrap md:justify-end gap-2"
              initial={{ y: "100%" }}
              animate={{
                y: 0,
                transition: { duration: 0.75, ease: "easeOut" },
              }}
            >
              {project.techStack.map((tech, i) => (
                <span
                  className="px-4 py-1 font-light border border-current/40 rounded-3xl w-fit h-fit whitespace-nowrap"
                  key={`tech-${index}-${i}`}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-3 mt-4"
            initial={{ y: "100%" }}
            animate={{
              y: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            {project?.hrefs?.live && (
              <a
                className="rounded-3xl px-8 py-2 uppercase font-semibold bg-black text-white transition-transform hover:scale-105"
                href={project.hrefs.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                See Live
              </a>
            )}
            {project?.hrefs?.source && (
              <a
                className="rounded-3xl px-8 py-2 uppercase font-light border border-current/50 transition-transform hover:scale-105"
                href={project.hrefs.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </a>
            )}
          </motion.div>

          {/* Project Images */}
          <motion.div
            className="relative flex flex-col md:flex-row w-full gap-3 md:[&>div]:flex-1 md:h-[300px] mt-12"
            initial={{ y: "50%" }}
            animate={{
              y: 0,
              transition: { duration: 0.75, ease: "easeInOut" },
            }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`gallery-${index}-${i}`}
                className="relative bg-black w-full h-full rounded-3xl"
              >
                <ImageComponent
                  src={project.images[0]}
                  alt={`${project.name} display ${i + 1}`}
                  className="w-full h-full object-scale-down"
                  lazy
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

const ProjectItem = ({
  project,
  index,
  selectedProject,
  setSelectedProject,
  onHover,
}) => {
  const isSelected = selectedProject === index

  // Memoize handlers for better performance
  const handleClick = useCallback(() => {
    setSelectedProject(isSelected ? null : index)
  }, [index, isSelected, setSelectedProject])

  const handleHover = useCallback(() => {
    onHover(index)
  }, [index, onHover])

  return (
    <motion.li
      className="relative w-full border-b border-b-current/50 py-4 flex flex-col gap-4"
      onMouseEnter={handleHover}
      data-index={index}
    >
      {/* Project Header - Always Visible */}
      <motion.div
        className="flex justify-between cursor-pointer z-10"
        onClick={handleClick}
        initial="initial"
        animate={isSelected ? "selected" : "initial"}
        whileHover={isSelected ? "selected" : "hover"}
      >
        {/* Name */}
        <motion.h3 custom={index} variants={animationVariants.projectTitle}>
          {project.name}
        </motion.h3>

        {/* Year */}
        <motion.h3 custom={index} variants={animationVariants.projectYear}>
          {project.year}
        </motion.h3>
      </motion.div>

      {/* Expanded Content - Visible When Selected */}
      <AnimatePresence mode="wait">
        {isSelected && (
          <>
            <div className="relative">
              <ExpandedContent project={project} index={index} />
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

// Main Projects component
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [direction, setDirection] = useState(1)
  const hoverHistoryRef = useRef([])
  const isMobile = useMatchMedia("(max-width: 768px)")

  // Optimized hover handler using useCallback and direction calculation
  const handleProjectHover = useCallback((index) => {
    // Add the new index to history
    hoverHistoryRef.current.push(index)

    // Keep only the last 2 items in history
    if (hoverHistoryRef.current.length > 2) {
      hoverHistoryRef.current.shift()
    }

    // Calculate direction based on current and previous indices
    if (hoverHistoryRef.current.length > 1) {
      const prev = hoverHistoryRef.current[0]
      const current = hoverHistoryRef.current[1]

      // Simple direction calculation based on index comparison
      // If moving to a higher index, direction is 1 (right), otherwise -1 (left)
      setDirection(current > prev ? 1 : -1)
    }

    setHoveredIndex(index)
  }, [])

  // Reset hover state when mouse leaves the projects section
  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null)
    // Clear history when mouse leaves
    hoverHistoryRef.current = []
  }, [])

  // Memoize the list to prevent unnecessary re-renders
  const projectsList = useMemo(
    () =>
      projects.map((project, index) => (
        <ProjectItem
          key={`project-${index}`}
          project={project}
          index={index}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          onHover={handleProjectHover}
        />
      )),
    [selectedProject, handleProjectHover]
  )

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen flex justify-center items-center px-sectionX-m md:px-sectionX py-sectionY-m md:py-sectionY bg-[#E6E8EA] text-black"
    >
      <div
        className="relative w-full max-w-7xl mx-auto origin-center"
        onMouseLeave={handleMouseLeave}
      >
        {/* Centralized image display */}
        <AnimatePresence>
          {hoveredIndex !== null && selectedProject === null && !isMobile && (
            <ProjectImageDisplay
              hoveredIndex={hoveredIndex}
              direction={direction}
              selectedProject={selectedProject}
            />
          )}
        </AnimatePresence>

        {/* Projects list */}
        <ul className="relative w-full flex flex-col">{projectsList}</ul>
      </div>
    </section>
  )
}
