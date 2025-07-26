import LocalTime, { TimeProvider } from "../ui/LocalTime"

const socials = [
  { name: "CV", href: "/assets/Emre_Gundogdu_CV.pdf" },
  { name: "Linkedin", href: "https://linkedin.com/in/emregnd/" },
  {
    name: "Github",
    href: "https://github.com/emreguendogdu/",
  },
  { name: "Dribbble", href: "https://dribbble.com/emregnd/" },
  { name: "hello@emregnd.com", href: "mailto:hello@emregnd.com" },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="flex items-end bg-[#1c1d20] text-white text-sm"
    >
      <div className="w-full flex justify-between items-start md:items-end border-t border-t-neutral-800 py-4 px-sectionX-m md:px-sectionX">
        <ul className="flex flex-col md:flex-row md:gap-4">
          {socials.map((social, index) => (
            <li key={`fs_${index}`}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link uppercase px-1 py-2"
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="md:flex md:gap-4 nav-link pointer-events-none">
          <TimeProvider>
            <LocalTime />
          </TimeProvider>
          <p className="select-none">© 2025</p>
        </div>
      </div>
    </footer>
  )
}
