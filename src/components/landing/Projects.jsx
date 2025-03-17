/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "motion/react"
import { projects } from "../../data"
import { Fragment, useRef, useState } from "react"

function Project({
  project,
  index,
  selectedProject,
  setSelectedProject,
  prevIndexRef,
}) {
  let isSelectedProject = selectedProject === index
  const contentRef = useRef(null)

  const handleClick = () => {
    if (index === selectedProject) {
      return setSelectedProject(null)
    }

    setSelectedProject(index)
  }

  return (
    <motion.li
      className="relative w-full border-b border-b-current/50 py-4 flex flex-col gap-4 cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => {
        prevIndexRef.current = index
      }}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      data-index={index}
    >
      {/* (Always Visible) Small Project Information */}
      <div className="flex justify-between pointer-events-none">
        {/* Image on Hover */}
        <div className="absolute w-1/3 h-[250%] max-h-[400px] left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.img
            className="w-full h-full object-cover z-10"
            src={project.images[0]}
            alt={project.name}
            loading="lazy"
            decoding="async"
            variants={{
              initial: {
                opacity: 0,
                y: prevIndexRef.current < index ? "-100%" : "100%",
              },
              whileHover: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: 0.75,
              ease: "easeOut",
              when: "afterChildren",
            }}
          />
        </div>
        {/* Project Name */}
        <motion.h3
          variants={{
            initial: { fontWeight: 300, x: 0 },
            animate: { fontWeight: isSelectedProject ? 500 : 300 },
            whileHover: { x: isSelectedProject ? 0 : (index + 1) * 5 },
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="pointer-events-none"
        >
          {project.name}
        </motion.h3>
        {/* Project Year */}
        <motion.h3
          variants={{
            initial: { fontWeight: 300, x: 0 },
            animate: { fontWeight: isSelectedProject ? 500 : 300 },
            whileHover: { x: isSelectedProject ? 0 : -1 * ((index + 1) * 5) },
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="pointer-events-none"
        >
          {project.year}
        </motion.h3>
      </div>
      <AnimatePresence mode="wait">
        {/* Content Opens on Click */}
        <motion.div
          ref={contentRef}
          className="flex flex-col gap-4 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isSelectedProject ? "auto" : 0,
            opacity: 1,
            transition: {
              height: {
                duration: 0.75,
                ease: "easeInOut",
              },
              opacity: { duration: 0.4, delay: 0.2 },
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, delay: 0.2 },
            }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
          >
            <div id="top-content" className="relative flex [&>div]:flex-1 py-4">
              <motion.div
                className="text-justify"
                initial={{ y: "-200%" }}
                animate={{
                  y: isSelectedProject ? 0 : "-200%",
                  transition: { duration: 0.75, ease: "easeOut" },
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                numquam optio animi temporibus adipisci mollitia quam, aliquam
                ab ea, excepturi sapiente. Nam laborum autem odio doloribus iste
                ratione possimus tenetur magni. Vel illum quas atque quidem
                veritatis, doloribus aspernatur ex, suscipit autem optio saepe
                labore facere praesentium tenetur natus eum!
              </motion.div>
              <motion.div
                className="flex flex-wrap justify-end gap-2"
                initial={{ y: "-200%" }}
                animate={{
                  y: isSelectedProject ? 0 : "-200%",
                  transition: {
                    duration: 0.75,
                    ease: "easeOut",
                  },
                }}
              >
                {project.techStack.map((data, i) => (
                  <div
                    className="px-4 py-1 font-light border border-current/40 rounded-3xl w-fit h-fit whitespace-nowrap"
                    key={`tsd_${i}`}
                  >
                    {data}
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              id="mid-content"
              className="flex gap-3 mt-4"
              initial={{ y: "-200%" }}
              animate={{
                y: isSelectedProject ? 0 : "-200%",
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              <a
                className="rounded-3xl px-8 py-2 uppercase font-semibold bg-black text-white"
                href={project.href}
              >
                See Live
              </a>
              <button className="rounded-3xl px-8 py-2 uppercase font-light border border-current/50">
                Source Code
              </button>
            </motion.div>
            <motion.div
              id="bottom-content"
              className="relative flex w-full gap-3 [&>div]:flex-1 h-[300px] mt-4"
              initial={{ y: "-50%" }}
              animate={{
                y: isSelectedProject ? 0 : "-50%",
                transition: { duration: 0.75, ease: "easeInOut" },
              }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`pimg_${i}`} className="bg-black w-full h-full"></div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.li>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const prevIndexRef = useRef(null)

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen flex justify-center items-center px-sectionX-m md:px-sectionX py-sectionY-m md:py-sectionY bg-[#E6E8EA] text-black"
    >
      <ul id="projects-ul" className="relative w-full flex flex-col">
        {projects.map((project, i) => {
          return (
            <Fragment key={`p__${i}`}>
              <Project
                project={project}
                index={i}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                prevIndexRef={prevIndexRef}
              />
            </Fragment>
          )
        })}
      </ul>
    </section>
  )
}
