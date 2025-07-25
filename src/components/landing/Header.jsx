import LocalTime, { TimeProvider } from "../ui/LocalTime";

export default function Header() {
  return (
    <header
      className="absolute top-0 left-0 right-0 px-8 md:px-12 py-4 md:py-4 z-20"
      id="landing-header"
    >
      <div className="relative flex justify-between">
        <div className="md:flex md:gap-8">
          <a href="/" className="nav-link">
            emregnd<sup>®</sup>
          </a>
          <p className="nav-link select-none hover:text-neutral-400">
            <TimeProvider>
              <LocalTime />
            </TimeProvider>
          </p>
          <a
            href="mailto:hello@emregnd.com"
            target="_blank"
            rel="noreferrer noopenner"
            className="nav-link"
          >
            hello@emregnd.com
          </a>
        </div>
        <nav>
          <ul className="relative flex flex-col md:flex-row">
            <li>
              <a href="/" className="nav-link">
                Home,&nbsp;
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link">
                Projects,&nbsp;
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
