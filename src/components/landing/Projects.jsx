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
    <article className="w-full flex flex-col gap-2 items-center py-16 md:py-12 select-none box-border border-b border-neutral-800 last:border-b-0">
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
      className="relative bg-black px-sectionX-m md:px-sectionX py-sectionY-m md:py-sectionY text-white min-h-screen z-10 mb-4 -mt-[100dvh]"
    >
      <p className="subheading mb-8">(Featured Projects)</p>
      <div className="grid grid-cols-2 gap-8 w-1/2">
        {projects.map((project, idx) => (
          <Project key={project.name} project={project} index={idx} />
        ))}
      </div>
      <div className="flex gap-4 items-center relative mt-sm">
        <ShinyButton
          href="mailto:hello@emregnd.com"
          className="!absolute bottom-2 left-1/4 -translate-x-1/2 w-fit"
        >
          Hire Me
        </ShinyButton>
      </div>
    </section>
  )
}
