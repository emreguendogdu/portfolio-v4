import LocalTime from "../ui/LocalTime"

export default function Footer() {
  return (
    <footer
      className="flex items-end bg-black text-white text-sm"
      id="contact"
    >
      <div className="w-full flex justify-between items-start md:items-end border-t border-t-neutral-800 py-4 px-sectionX-m md:px-sectionX">
        <div className="[&>a]:uppercase flex flex-col md:flex-row md:gap-4">
          <a
            href="https://linkedin.com/in/emregnd/"
            rel="noreferrer noopenner"
            target="_blank"
          >
            Linkedin
          </a>
          <a
            href="https://github.com/emregnd/"
            rel="noreferrer noopenner"
            target="_blank"
          >
            Github
          </a>
          <a
            href="mailto:hello@emregnd.com"
            rel="noreferrer noopenner"
            target="_blank"
          >
            hello@emregnd.com
          </a>
        </div>
        <div className="md:flex md:gap-4">
          <LocalTime />
          <p className="select-none">© 2025</p>
        </div>
      </div>
    </footer>
  )
}
