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
      <div className="flex flex-col lg:items-center justify-center flex-1">
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
      className="relative bg-linear-to-b to-[#1c1d20] from-[#000] px-sectionX-m lg:px-sectionX py-sectionY-m lg:pt-sectionY lg:pb-xs text-white min-h-screen z-10 -mt-[100dvh] pt-[100dvh]"
    >
      <div className="flex flex-col-reverse lg:flex-row justify-start items-start gap-sm lg:justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-xs gap-y-sm xl:gap-x-sm xl:gap-y-md w-full sm:w-3/4 sm:self-center lg:w-3/4 xl:flex-1">
          {projects.map((project, idx) => (
            <Project key={project.name} project={project} index={idx} />
          ))}
        </div>
        <p className="subheading xl:flex-1">(Featured Projects)</p>
      </div>
      <div className="flex items-center w-full lg:w-1/2 relative mt-xs">
        <ShinyButton
          href="mailto:hello@emregnd.com"
          className="text-center w-full"
        >
          Hire Me
        </ShinyButton>
      </div>
    </section>
  )
}
