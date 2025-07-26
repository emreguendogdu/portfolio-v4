/* eslint-disable react/prop-types */
import { projects } from "../../data"
import ShinyButton from "../ui/ShinyButton"
import ImageComponent from "../ui/ImageComponent"

const ProjectImage = ({ project }) => {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full h-full overflow-hidden"
      aria-label={`View ${project.name}`}
    >
      {project.name === "Ethera Supplements" ? (
        <div className="relative w-full h-full">
          <video
            poster={"/assets/ethera-supplements-thumbnail.webp"}
            loop
            muted
            aria-hidden
            playsInline
            className="relative w-full h-[250px] object-cover object-center bg-[#111111] pointer-events-none"
            preload="none"
          >
            <source src={"/assets/ethera-supplements.mp4"} type="video/mp4" />
            <source src={"/assets/ethera-supplements.webm"} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <ImageComponent
          src={project.imgSrc}
          hash={project.imgHash}
          alt={project.name}
          className="relative w-full h-[250px] object-cover object-center bg-[#111111] pointer-events-none"
        />
      )}
    </a>
  )
}

const Project = ({ project }) => {
  return (
    <article className="w-full flex flex-col gap-2 items-center select-none box-border">
      <div className="w-full max-w-3xl aspect-video mx-auto">
        <ProjectImage project={project} />
      </div>
      <div className="flex flex-col md:items-center justify-center flex-1">
        <p> {project.name}</p>
        <p className="text-sm font-light uppercase text-neutral-400">
          Design & Development
        </p>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-linear-to-b to-[#1c1d20] from-[#000] px-sectionX-m md:px-sectionX py-sectionY-m md:pt-sectionY md:pb-xs text-white min-h-screen z-10 -mt-[100dvh] pt-[100dvh]"
    >
      <div className="flex justify-between">
        <div className="grid grid-cols-2 gap-x-sm gap-y-md w-1/2">
          {projects.map((project, idx) => (
            <Project key={project.name} project={project} index={idx} />
          ))}
        </div>
        <p className="subheading">(Featured Projects)</p>
      </div>
      <div className="flex justify-center items-center w-1/2 relative mt-sm">
        <ShinyButton href="mailto:hello@emregnd.com" className="text-center">
          Hire Me
        </ShinyButton>
      </div>
    </section>
  )
}
