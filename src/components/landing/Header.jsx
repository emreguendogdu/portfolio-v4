import LocalTime, { TimeProvider } from "../ui/LocalTime";

const nav = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  { name: "CV", href: "/assets/Emre_Gundogdu_CV.pdf" },
];

export default function Header() {
  return (
    <header
      className="absolute top-0 left-0 right-0 px-sectionX-m md:px-sectionX py-4 z-[999999] opacity-0"
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
            {nav.map((item, index) => (
              <li key={`nav_${index}`}>
                <a href={item.href} className="nav-link">
                  {item.name}
                  {index < nav.length - 1 && ","}&nbsp;
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
