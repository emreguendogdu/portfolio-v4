import { socials } from "../../data"
import LocalTime from "../ui/LocalTime"

export default function Footer() {
  return (
    <footer id="contact" className="flex items-end bg-black text-white text-sm">
      <div className="w-full flex justify-between items-start md:items-end border-t border-t-neutral-800 py-4 px-sectionX-m md:px-sectionX">
        <ul className="flex flex-col md:flex-row md:gap-4">
          {socials.map((social, index) => (
            <li key={`fs_${index}`}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link uppercase"
              >
                {social.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="md:flex md:gap-4 nav-link pointer-events-none">
          <LocalTime />
          <p className="select-none">© 2025</p>
        </div>
      </div>
    </footer>
  )
}
