/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "motion/react"
import { projects } from "../../data"
import { useCallback, useMemo, useState } from "react"
import { useEffect } from "react"

// Animation variants - centralized for consistency
const animationVariants = {
  projectTitle: {
    initial: { fontWeight: 300, x: 0 },
    selected: { fontWeight: 500 },
    hover: (index) => ({
      x: (index + 1) * 5,
      transition: { duration: 0.6, ease: "easeInOut" },
    }),
    hoverRight: (index) => ({
      x: -1 * (index + 1) * 5,
      transition: { duration: 0.6, ease: "easeInOut" },
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
      opacity: 0.8,
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (direction) => ({
      y: direction === 1 ? "-100%" : "100%",
      opacity: 0.8,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  },
}

// Image hover display component
const ProjectImageDisplay = ({ hoveredIndex, direction }) => {
  // Early return if nothing is hovered
  if (hoveredIndex === null) return null

  useEffect(() => {
    console.log("Hovered Index: ", hoveredIndex)
  }, [hoveredIndex])

  const currentProject = projects[hoveredIndex]

  return (
    <motion.div
      className="absolute w-1/3 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[300px] overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="popLayout">
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

// Project item component
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
      className="relative w-full border-b border-b-current/50 py-4 flex flex-col gap-4 cursor-pointer z-10"
      onClick={handleClick}
      onMouseEnter={handleHover}
      data-index={index}
    >
      {/* Project Header - Always Visible */}
      <div className="flex justify-between pointer-events-none">
        {/* Name */}
        <motion.h3
          custom={index}
          variants={animationVariants.projectTitle}
          initial="initial"
          animate={isSelected ? "selected" : "initial"}
          whileHover={isSelected ? "selected" : "hover"}
          className="pointer-events-none"
        >
          {project.name}
        </motion.h3>

        {/* Year */}
        <motion.h3
          custom={index}
          variants={animationVariants.projectTitle}
          initial="initial"
          animate={isSelected ? "selected" : "initial"}
          whileHover={isSelected ? "selected" : "hoverRight"}
          className="pointer-events-none"
        >
          {project.year}
        </motion.h3>
      </div>

      {/* Expanded Content - Visible When Selected */}
      <AnimatePresence mode="wait">
        {isSelected && (
          <motion.div
            className="flex flex-col gap-4 overflow-hidden"
            variants={animationVariants.expandedContent}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              variants={animationVariants.contentItems}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Top Content */}
              <div className="relative flex [&>div]:flex-1 py-4">
                {/* Description */}
                <motion.div
                  className="text-justify pr-4"
                  initial={{ y: "-200%" }}
                  animate={{
                    y: 0,
                    transition: { duration: 0.75, ease: "easeOut" },
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                  numquam optio animi temporibus adipisci mollitia quam, aliquam
                  ab ea, excepturi sapiente. Nam laborum autem odio doloribus
                  iste ratione possimus tenetur magni.
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  className="flex flex-wrap justify-end gap-2"
                  initial={{ y: "-200%" }}
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
                initial={{ y: "-200%" }}
                animate={{
                  y: 0,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
              >
                <a
                  className="rounded-3xl px-8 py-2 uppercase font-semibold bg-black text-white transition-transform hover:scale-105"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See Live
                </a>
                <button className="rounded-3xl px-8 py-2 uppercase font-light border border-current/50 transition-transform hover:scale-105">
                  Source Code
                </button>
              </motion.div>

              {/* Project Images */}
              <motion.div
                className="relative flex w-full gap-3 [&>div]:flex-1 h-[300px] mt-4"
                initial={{ y: "-50%" }}
                animate={{
                  y: 0,
                  transition: { duration: 0.75, ease: "easeInOut" },
                }}
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={`gallery-${index}-${i}`}
                    className="bg-black w-full h-full rounded-sm"
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

// Main Projects component
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [prevHoveredIndex, setPrevHoveredIndex] = useState(null)
  const [direction, setDirection] = useState(1)

  // Optimized hover handler using useCallback
  const handleProjectHover = useCallback(
    (index) => {
      if (hoveredIndex !== null) {
        setPrevHoveredIndex(hoveredIndex)
        setDirection(index > hoveredIndex ? 1 : -1)
      } else if (prevHoveredIndex !== null) {
        setDirection(index > prevHoveredIndex ? 1 : -1)
      }
      setHoveredIndex(index)
    },
    [hoveredIndex, prevHoveredIndex]
  )

  // Reset hover state when mouse leaves the projects section
  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null)
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
        className="relative w-full max-w-7xl mx-auto"
        onMouseLeave={handleMouseLeave}
      >
        {/* Centralized image display */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <ProjectImageDisplay
              hoveredIndex={hoveredIndex}
              direction={direction}
            />
          )}
        </AnimatePresence>

        {/* Projects list */}
        <ul className="relative w-full flex flex-col">{projectsList}</ul>
      </div>
    </section>
  )
}
